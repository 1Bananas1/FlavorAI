import { AuthError } from "expo-auth-session";
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
    user: null,
    signIn: () => {},
    signOut: () => {},
    fetchWithAuth: async (URL: string, options?: RequestInit) => Promise.resolve(new Response()),
    isLoading: false,
    error: null as AuthError | null,
});

export const AuthProvider = ({children}): { children: React.ReactNode } => {
    const [user, setUser] = React.useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<AuthError | null>(null);

    const signIn = async () => {};

    const signOut = async () => {};

    const fetchWithAuth = async (URL: string, options?: RequestInit) => {};

    return (
        <AuthContext.Provider
            value={{
                user,
                signIn,
                signOut,
                fetchWithAuth,
                isLoading:false,
                error:null,
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