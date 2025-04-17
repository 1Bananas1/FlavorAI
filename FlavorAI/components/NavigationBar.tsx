import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NavButtonProps = {
  iconName: string;
  isActive: boolean;
  onPress: () => void;
};

const NavButton = ({ iconName, isActive, onPress }: NavButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.navButton, 
        isActive && { transform: [{ scale: 1.05 }] }
      ]} 
      onPress={onPress}
    >
      <MaterialCommunityIcons 
        name={iconName} 
        size={24} 
        color={isActive ? "#4A8C35" : "black"} 
      />
    </TouchableOpacity>
  );
};

type NavigationBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const NavigationBar = ({ activeTab, setActiveTab }: NavigationBarProps) => {
  const tabs = [
    { name: 'coffee', icon: 'coffee' },
    { name: 'map', icon: 'map' },
    { name: 'home', icon: 'home' },
    { name: 'favorites', icon: 'heart' },
    { name: 'account', icon: 'account' },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <NavButton
          key={tab.name}
          iconName={tab.icon}
          isActive={activeTab === tab.name}
          onPress={() => setActiveTab(tab.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF5E6',
    paddingVertical: 12,
  },
  navButton: {
    backgroundColor: '#B3D9A3', // Light green as in the wireframe
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NavigationBar;