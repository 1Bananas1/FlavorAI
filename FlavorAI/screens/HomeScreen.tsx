import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '@/context/auth';

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.name || 'User'}!</Text>
      <Text style={styles.subtitle}>Start your food adventure.</Text>
      
      {/* Add your home screen content here */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Home Screen Content</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 8,
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentText: {
    fontSize: 18,
    color: 'white',
  }
});

export default HomeScreen;