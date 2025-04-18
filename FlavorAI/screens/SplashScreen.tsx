import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useAuth } from '@/context/auth';

type SplashScreenProps = {
  onLogin: () => void;
};

const SplashScreen = ({ onLogin }: SplashScreenProps) => {
  // Keeping the onLogin prop to maintain compatibility with the current App.tsx
  const { user, isLoading } = useAuth();
  
  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={styles.content}>
          {/* This is now an empty container with just the background color */}
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