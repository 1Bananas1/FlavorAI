import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/context/auth';

const TasteProfileScreen = () => {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Taste Profile</Text>
        <Text style={styles.subtitle}>Personalized food preferences for {user?.name || 'User'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorite Cuisines</Text>
        <View style={styles.preferencesContainer}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Italian</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Japanese</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Mexican</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dietary Preferences</Text>
        <View style={styles.preferencesContainer}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Vegetarian</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Low Carb</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flavor Preferences</Text>
        <View style={styles.preferencesContainer}>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Spicy</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Savory</Text>
          </View>
          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>Sweet</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A8C35',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  section: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  preferencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferenceItem: {
    backgroundColor: '#e8f5e9',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 5,
  },
  preferenceText: {
    color: '#2e7d32',
    fontWeight: '500',
  },
});

export default TasteProfileScreen;