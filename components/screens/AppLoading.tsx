import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AppLoadingScreenProps {
    message?: string;
}

const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({ message = "Loading..." }) => {
    return (
        <View style={styles.container}>
            <LinearGradient
            colors={['#000000B8', '#000000E5']}
            style={styles.background}
            >
                <View>
                    <ActivityIndicator size="large" color="#FDC70F" />
                    <Text style={styles.message}>{message}</Text>
                </View>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: '700',
        color: '#FDC70F',
    },
});

export default AppLoadingScreen;
