import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      
      {/* Add your favorites screen content here */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Favorites Screen Content</Text>
        <Text style={styles.contentText}>Your saved coffee preferences</Text>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  contentText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  }
});

export default FavoritesScreen;