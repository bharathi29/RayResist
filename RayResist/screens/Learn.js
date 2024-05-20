import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';

const LearnScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>{'\n'}</Text>
            <Text style={styles.title}>Sunscreen Education</Text>
            <Text style={styles.subtitle}>Why Sunscreen is Important:</Text>
            <Text style={styles.textd}>- Protects your skin from harmful UV rays</Text>
            <Text style={styles.textd}>- Reduces the risk of skin cancer and premature aging</Text>
            <Text style={styles.subtitle}>How to Use Sunscreen Effectively:</Text>
            <Text style={styles.textd}>- Apply sunscreen generously to all exposed skin</Text>
            <Text style={styles.textd}>- Reapply every 2 hours, or immediately after swimming or sweating</Text>
            <Text style={styles.textd}>- Use sunscreen with at least SPF 30 and broad-spectrum protection</Text>
            <Text style={styles.textd}>- Pay attention to expiration dates and storage instructions</Text>
            <Text style={styles.subtitle}>Additional Tips:</Text>
            <Text style={styles.textd}>- Seek shade, especially during peak sun hours (10am-4pm)</Text>
            <Text style={styles.textd}>- Wear protective clothing, sunglasses, and a wide-brimmed hat</Text>
            <Text style={styles.textd}>- Avoid tanning beds and sunlamps</Text>
 
            <Text>{'\n'}{'\n'}{'\n'}</Text>
            <Text>{'\n'}</Text>
            <Text>{'\n'}</Text><Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }}
                    style={styles.iconButton}>
                    <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Learn") }}
                    style={styles.iconButton}>
                    <Foundation name="lightbulb" size={24} color="black" />
                    <Text>Learn</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { navigation.navigate("Data") }}
                    style={styles.iconButton}>
                    <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default LearnScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        width: '100%',
    },
    iconButton: {
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 24,
        color: 'darkorange',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    textd: {
        fontSize: 16,
        marginBottom: 5,
    },
});
