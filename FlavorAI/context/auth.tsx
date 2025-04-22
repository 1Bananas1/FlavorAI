import { GOOGLE_CLIENT_ID } from "@/constants";
import { AuthRequestConfig, DiscoveryDocument, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export type AuthUser = {
    id: string;
    email: string;
    name: string;
    picture?: string;
    given_name?: string;
    family_name?: string;
    email_verified?: boolean;
    provider?: string;
    exp?: number;
    cookieExpiration?: number;
}

const AuthContext = React.createContext({
    user: null as AuthUser | null,
    signIn: async () => {},
    signOut: async () => {},
    fetchWithAuth: async (url: string, options?: RequestInit) => 
        Promise.resolve(new Response()),
    isLoading: false,
    error: null as Error | null,
    // Development functions
    setUser: (user: AuthUser | null) => {},
    exchangeCodeForToken: async (code: string) => {},
});

// Use GitHub Pages as the redirect URI
const redirectUri = 'https://1bananas1.github.io';

const config: AuthRequestConfig = {
    clientId: GOOGLE_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
    redirectUri,
    responseType: "code",
};

const discovery: DiscoveryDocument = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const [_, __, promptAsync] = useAuthRequest(config, discovery);

    // Check for token on app launch
    React.useEffect(() => {
        loadUserFromStorage();
    }, []);

    const loadUserFromStorage = async () => {
        try {
            setIsLoading(true);
            const userJson = await AsyncStorage.getItem('user');
            const token = await SecureStore.getItemAsync('auth_token');
            
            if (userJson && token) {
                const userData = JSON.parse(userJson);
                setUser(userData);
            }
        } catch (e) {
            console.error('Error loading user data:', e);
            setError(e instanceof Error ? e : new Error('Failed to load user data'));
        } finally {
            setIsLoading(false);
        }
    };

    const exchangeCodeForToken = async (code: string) => {
        try {
            setIsLoading(true);
            setError(null);
            console.log('Exchanging code for token directly with Google');
            
            // Exchange the code for tokens directly with Google
            const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    code,
                    client_id: GOOGLE_CLIENT_ID,
                    redirect_uri: redirectUri,
                    grant_type: 'authorization_code',
                }),
            });
            
            if (!tokenResponse.ok) {
                let errorMessage = 'Failed to exchange code for token';
                try {
                    const errorData = await tokenResponse.json();
                    console.error('Token exchange error:', errorData);
                    errorMessage = errorData.error_description || errorData.error || errorMessage;
                } catch (e) {
                    console.error('Failed to parse error response', e);
                }
                throw new Error(errorMessage);
            }
            
            const tokenData = await tokenResponse.json();
            console.log('Token exchange successful');
            
            // Now fetch user info with the access token
            const userInfoResponse = await fetch(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                {
                    headers: {
                        Authorization: `Bearer ${tokenData.access_token}`,
                    },
                }
            );
            
            if (!userInfoResponse.ok) {
                throw new Error('Failed to fetch user info');
            }
            
            const userInfo = await userInfoResponse.json();
            
            // Create user object
            const userData: AuthUser = {
                id: userInfo.sub,
                email: userInfo.email,
                name: userInfo.name,
                picture: userInfo.picture,
                given_name: userInfo.given_name,
                family_name: userInfo.family_name,
                email_verified: userInfo.email_verified,
                provider: 'google',
            };
            
            // Save tokens and user info
            await SecureStore.setItemAsync('auth_token', tokenData.access_token);
            if (tokenData.refresh_token) {
                await SecureStore.setItemAsync('refresh_token', tokenData.refresh_token);
            }
            await AsyncStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            console.log('User authenticated successfully:', userData.name);
        } catch (e) {
            console.error('Token exchange error:', e);
            setError(e instanceof Error ? e : new Error('Failed to authenticate'));
        } finally {
            setIsLoading(false);
        }
    };

    const signIn = async () => {
        try {
            setError(null);
            
            console.log('Starting sign in process');
            console.log('Redirect URI:', redirectUri);
            
            // Open the Google authorization page in a browser
            await promptAsync();
            
            // User will need to manually copy the code from GitHub Pages
            // and paste it in the app using the Bypass component
        } catch (e) {
            console.error('Sign in error:', e);
            setError(e instanceof Error ? e : new Error('Failed to start authentication'));
        }
    };

    const signOut = async () => {
        try {
            setIsLoading(true);
            await SecureStore.deleteItemAsync('auth_token');
            await SecureStore.deleteItemAsync('refresh_token');
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (e) {
            console.error('Sign out error:', e);
            setError(e instanceof Error ? e : new Error('Failed to sign out'));
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
        try {
            const token = await SecureStore.getItemAsync('auth_token');
            
            if (!token) {
                throw new Error('No authentication token found');
            }
            
            // Create headers with token
            const headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };
            
            return fetch(url, {
                ...options,
                headers,
            });
        } catch (e) {
            console.error('Fetch with auth error:', e);
            throw e;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                fetchWithAuth,
                isLoading,
                error,
                setUser,
                exchangeCodeForToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};