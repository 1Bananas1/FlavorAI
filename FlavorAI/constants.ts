import { 
  GOOGLE_CLIENT_ID as ENV_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET as ENV_GOOGLE_CLIENT_SECRET,
  EXPO_PUBLIC_BASE_URL as ENV_BASE_URL,
  EXPO_PUBLIC_APP_SCHEME as ENV_APP_SCHEME,
  JWT_SECRET as ENV_JWT_SECRET
} from "@env";

export const COOKIE_NAME = "auth_token";
export const REFRESH_COOKIE_NAME = "refresh_token";
export const COOKIE_MAX_AGE = 20;
export const JWT_EXPIRATION_TIME = "20s";
export const REFRESH_TOKEN_EXPIRY = "30d";
export const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export const REFRESH_BEFORE_EXPIRY_SEC = 60;

export const GOOGLE_CLIENT_ID = ENV_GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = ENV_GOOGLE_CLIENT_SECRET;
export const GOOGLE_REDIRECT_URI = `${ENV_BASE_URL}/api/auth/callback`;
export const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export const BASE_URL = ENV_BASE_URL;
export const APP_SCHEME = ENV_APP_SCHEME;
export const JWT_SECRET = ENV_JWT_SECRET;

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "Lax" as const,
    path: "/",
    maxAge: COOKIE_MAX_AGE,
};

export const REFRESH_COOKIE_OPTIONS ={
    httpOnly: true,
    secure: true,
    sameSite: "Lax" as const,
    path: "/api/auth/refresh",
    maxAge: REFRESH_TOKEN_MAX_AGE,
};