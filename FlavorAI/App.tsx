import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationBar from './components/NavigationBar';
import SplashScreen from './screens/SplashScreen';
import { AuthProvider, useAuth } from './context/auth';
import HomeScreen from './screens/HomeScreen'; // You'll need to create this
import MapScreen from './screens/MapScreen'; // You'll need to create this
import CoffeeScreen from './screens/CoffeeScreen'; // You'll need to create this
import FavoritesScreen from './screens/FavoritesScreen'; // You'll need to create this
import ProfileScreen from './screens/ProfileScreen'; // You'll need to create this

function MainApp() {
  const { user, isLoading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  // Render the appropriate screen based on the active tab
  const renderScreen = () => {
    switch(activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'map':
        return <MapScreen />;
      case 'coffee':
        return <CoffeeScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'account':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4A8C35" />
      </View>
    );
  }

  // If no user is authenticated, show the splash screen
  if (!user) {
    return <SplashScreen />;
  }

  // User is authenticated, show the main app
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
          onPress={signOut}
        />
      </View>
      
      {/* Main Content - will change based on active tab */}
      <View style={styles.content}>
        {renderScreen()}
      </View>
      
      {/* Bottom Navigation */}
      <NavigationBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
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
  }
});