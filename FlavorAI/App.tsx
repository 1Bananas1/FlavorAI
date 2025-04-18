import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationBar from './components/NavigationBar';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (userInfo) => {
    console.log('User logged in:', userInfo);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userInfo');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return <SplashScreen onLogin={handleLogin} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF5E6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FlavorAI</Text>
        <MaterialCommunityIcons 
          name="dots-vertical" 
          size={24} 
          color="black" 
          style={styles.menuIcon} 
          onPress={handleLogout}
        />
      </View>
      
      {/* Main Content - will change based on active tab */}
      <View style={styles.content}>
        <Text style={styles.tabText}>Current Tab: {activeTab}</Text>
      </View>
      
      {/* Bottom Navigation */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  menuIcon: {
    paddingRight: 8,
  },
  content: {
    flex: 1,
    backgroundColor: '#F4A460',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  }
});