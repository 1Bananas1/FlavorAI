import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "@/context/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

export default function Bypass() {
    const { setUser, exchangeCodeForToken } = useAuth() as any; // Type assertion for dev-only functions
    const [authCode, setAuthCode] = useState('');
    
    const handleDevBypass = async () => {
        try {
            // Create mock user data
            const mockUser = {
                id: 'dev-user-123',
                email: 'dev@example.com',
                name: 'Dev User',
                picture: '',
                provider: 'dev-bypass',
            };
            
            // Store the mock user data
            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            await SecureStore.setItemAsync('auth_token', 'dev-token-123');
            
            // Update the auth context
            setUser(mockUser);
            
            console.log('Dev bypass successful');
        } catch (error) {
            console.error('Dev bypass error:', error);
        }
    };
    
    const handleCodeSubmit = () => {
        if (authCode.trim()) {
            console.log('Processing auth code:', authCode);
            exchangeCodeForToken(authCode.trim());
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.codeContainer}>
                <Text style={styles.label}>Auth Code:</Text>
                <TextInput
                    style={styles.input}
                    value={authCode}
                    onChangeText={setAuthCode}
                    placeholder="Paste authorization code here"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={handleCodeSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit Code</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Dev Bypass" 
                    onPress={handleDevBypass} 
                    color="#8d0000"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    codeContainer: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        color: 'black',
    },
    submitButton: {
        backgroundColor: '#4A8C35',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    }
});