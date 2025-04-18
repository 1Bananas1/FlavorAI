import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useAuth } from '@/context/auth';
import LoginForm from '@/components/LoginForm';
import Bypass from '@/components/Bypass';

type SplashScreenProps = {
  onLogin: () => void;
};

const SplashScreen = ({ onLogin }: SplashScreenProps) => {
  // Keeping the onLogin prop to maintain compatibility with the current App.tsx
  const { user, isLoading, signOut } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <View style={styles.content}>
          {!user && <LoginForm />}
          {!user && <Bypass />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4A460', // Keeping the original background color
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SplashScreen;