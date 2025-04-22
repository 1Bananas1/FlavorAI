import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useAuth } from '@/context/auth';

const ProfileScreen = () => {
  const { user, signOut } = useAuth();

  const handleTasteProfilePress = () => {
    console.log('Navigate to Taste Profile');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
      <View style={styles.profileCard}>
        {user?.picture ? (
          <Image 
            source={{ uri: user.picture }} 
            style={styles.profileImage} 
          />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.profileImagePlaceholderText}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
        )}
        
        <Text style={styles.name}>{user?.name || 'User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Account Details</Text>
        <View style={styles.buttonContainer}>
          <Button 
            title="Taste Profile"
            onPress={handleTasteProfilePress}
            color="#4A8C35"
          />
        </View>
        <Text style={styles.detail}>Provider: {user?.provider || 'Google'}</Text>
        <Text style={styles.detail}>Account ID: {user?.id?.substring(0, 8) || 'Unknown'}</Text>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Sign Out" 
            onPress={signOut} 
            color="#4A8C35"
          />
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 30,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A8C35',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImagePlaceholderText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 25,
    width: '100%',
  }
});

export default ProfileScreen;