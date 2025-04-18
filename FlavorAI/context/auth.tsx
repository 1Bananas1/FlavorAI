import { BASE_URL, GOOGLE_CLIENT_ID } from "@/constants";
import { AuthError, AuthRequestConfig, DiscoveryDocument, makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";


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
    signIn: () => {},
    signOut: () => {},
    fetchWithAuth: async (url: string, options?: RequestInit) => 
        Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
});

const config: AuthRequestConfig = {
    clientId: GOOGLE_CLIENT_ID,
    scopes: ["openid", "profile", "email"],
    redirectUri: BASE_URL,
};




// for expo go, use 
// authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
// tokenEndpoint: "https://oauth2.googleapis.com/token",
// for standalone app, use
// authorizationEndpoint: `${BASE_URL}/api/auth/authorize`,
// tokenEndpoint: `${BASE_URL}/api/auth/token`,
const discovery: DiscoveryDocument = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);

    const [request, response, promptAsync] = useAuthRequest(config, discovery);

    const signIn = async () => {
        try {
            if (!request) {
                console.log('no request');
                return;
            }

            console.log('clicked');
            console.log('Base URL:', BASE_URL);
            console.log('Config:', config);  // Add this to check your config
            console.log('Discovery:', discovery);
            await promptAsync();
        } catch (e) {
            console.log(e)
        }
    };

    const signOut = async () => {};

    const fetchWithAuth = async (URL: string, options?: RequestInit) => {};

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                fetchWithAuth,
                isLoading,
                error,
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
}