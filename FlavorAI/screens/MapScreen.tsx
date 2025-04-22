import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Food Map</Text>
      
      {/* Add your map screen content here */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Map Screen Content</Text>
        <Text style={styles.contentText}>Find food near you</Text>
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

export default MapScreen;