import { View, Text, Button, StyleSheet } from "react-native";
import { useAuth } from "@/context/auth";

export default function Bypass() {
    
    return (
        <View style={styles.container}>
            
            <View style={styles.buttonContainer}>
                <Button 
                    title="Dev Bypass" 
                    onPress={() => console.log("Bypassed")} 
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