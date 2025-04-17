import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GOOGLE_CLIENT_ID } from '@env';

// Required for Google authentication in Expo
WebBrowser.maybeCompleteAuthSession();

type SplashScreenProps = {
  onLogin: () => void;
};

const SplashScreen = ({ onLogin }: SplashScreenProps) => {
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Set up Google authentication request
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID,
    iosClientId: GOOGLE_CLIENT_ID,
    androidClientId: GOOGLE_CLIENT_ID,
    // Add required scopes for Google OAuth 2.0 compliance
    scopes: ['profile', 'email'],
    // Use Expo's authentication proxy
    useProxy: true
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      setLoading(true);
      handleSuccess(response);
    } else if (response?.type === 'error') {
      console.error("Authentication error:", response.error);
      setAuthError(response.error?.message || "Authentication failed");
      setLoading(false);
    }
  }, [response]);

  const handleSuccess = async (response: AuthSession.AuthSessionResult) => {
    try {
      if (response.authentication) {
        // Store the token securely
        await AsyncStorage.setItem('userToken', response.authentication.accessToken);
        
        // For added security, verify token with Google's tokeninfo endpoint
        // In a production app, this should be done on your backend
        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.authentication.accessToken}`
        );
        
        if (userInfoResponse.ok) {
          const userData = await userInfoResponse.json();
          // Store minimal user info
          await AsyncStorage.setItem('userEmail', userData.email);
          
          setLoading(false);
          onLogin();
        } else {
          throw new Error("Failed to validate token");
        }
      } else {
        throw new Error("No authentication data received");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      setAuthError("Authentication verification failed");
      setLoading(false);
    }
  };

  // Development login option when not using real OAuth
  const handleDevLogin = async () => {
    setLoading(true);
    setAuthError(null);
    
    setTimeout(async () => {
      await AsyncStorage.setItem('userToken', 'dev-token-123');
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleLoginPress = () => {
    setLoading(true);
    setAuthError(null);
    if (GOOGLE_CLIENT_ID && request) {
      promptAsync().catch(error => {
        console.error("Error starting auth flow:", error);
        setAuthError("Failed to start authentication");
        setLoading(false);
      });
    } else {
      // Fall back to dev login if no client ID
      handleDevLogin();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>FlavorAI</Text>
        <Text style={styles.slogan}>Your Coffee Companion</Text>
        
        {authError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{authError}</Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLoginPress}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#333" />
          ) : (
            <View style={styles.buttonContent}>
              <Text style={styles.loginButtonText}>Continue with Google</Text>
            </View>
          )}
        </TouchableOpacity>
        
        {/* Add dev login button for testing */}
        <TouchableOpacity 
          style={styles.devButton}
          onPress={handleDevLogin}
        >
          <Text style={styles.devButtonText}>Dev Login (Skip OAuth)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4A460', // Orange/peach background
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 24,
    color: 'black',
    marginBottom: 120, // Push the button down
  },
  loginButton: {
    backgroundColor: '#FFF5E6', // Cream color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
  },
  errorText: {
    color: 'darkred',
    textAlign: 'center',
  },
  devButton: {
    marginTop: 20,
    padding: 10,
  },
  devButtonText: {
    color: '#333',
    fontSize: 14,
  }
});

export default SplashScreen;