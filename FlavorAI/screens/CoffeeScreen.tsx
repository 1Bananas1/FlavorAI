import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CoffeeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Explorer</Text>
      
      {/* Add your coffee screen content here */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Coffee Screen Content</Text>
        <Text style={styles.contentText}>Discover new coffee flavors</Text>
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

export default CoffeeScreen;