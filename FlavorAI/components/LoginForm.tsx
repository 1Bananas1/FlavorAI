import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "@/context/auth";

export default function LoginForm() {
    const { signIn } = useAuth();
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to FlavorAI</Text>
            <View style={styles.buttonContainer}>
                <Button 
                    title="Sign in with Google" 
                    onPress={signIn} 
                    color="#4285F4"
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'white',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    }
});