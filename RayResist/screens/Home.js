import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { firebase } from '../config';

const openWeatherKey = 'a540b4e2abe5bef38f4997518ab068e3';

const HomeScreen = ({ navigation }) => {
    const [uvIndex, setUVIndex] = useState(null);
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [remainingSecs, setRemainingSecs] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        fetchWeatherAndUVIndexForCurrentLocation();
        const fetchEmail = async () => {
            const user = firebase.auth().currentUser;
            if (user) {
                setEmail(user.email);
            }
        };

        fetchEmail();
    }, []);

    const fetchWeatherAndUVIndexForCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}&units=metric`
            );
            const weatherData = await weatherResponse.json();

            console.log('Weather Data:', weatherData);

            setTemperature(weatherData.main.temp);
            setHumidity(weatherData.main.humidity);

            const uvResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/uvi?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
            );
            const uvData = await uvResponse.json();

            console.log('UV Index Data:', uvData);

            setUVIndex(uvData.value);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatNumber = number => `0${number}`.slice(-2);

    const getRemaining = (time) => {
        const mins = Math.floor(time / 60);
        const secs = time - mins * 60;
        return { mins: formatNumber(mins), secs: formatNumber(secs) };
    }

    const resetTimer = () => {
        setRemainingSecs(0);
        setIsActive(false);
        setShowTimer(false);
    }

    const applyTimer = () => {
        setShowTimer(true);
        setIsActive(true);
        incrementDuration();
    }

    const incrementDuration = async () => {
        const now = new Date();
        const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`; // Format: DD-MM-YYYY
        const userRef = firebase.firestore().collection('users').doc(email);

        await userRef.update({
            [`datedate.${date}`]: firebase.firestore.FieldValue.increment(1)
        });
    }

    const handleTimer = async () => {
        if (!showTimer) {
            setShowTimer(true);
            setIsActive(true);
            const now = new Date();
            const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`; // Format: DD-MM-YYYY

            const userRef = firebase.firestore().collection('users').doc(email);
            const userDoc = await userRef.get();

            if (userDoc.exists) {
                const userData = userDoc.data();
                if (userData.datedate && userData.datedate[date]) {
                    await userRef.update({
                        [`datedate.${date}`]: firebase.firestore.FieldValue.increment(1),
                        startTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        isActive: true,
                    });
                } else {
                    // Append the date to the datedate object
                    await userRef.update({
                        [`datedate.${date}`]: 1 // Initialize duration to 0
                    });
                }
            } else {
                // Create a new document for the user
                await userRef.set({
                    datedate: {
                        [date]: 0 // Initialize duration to 0
                    },
                    startTimestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    startDate: now.getDate(),
                    startMonth: now.getMonth() + 1,
                    startHour: now.getHours(),
                    isActive: true,
                });
            }
        } else if (isActive) {
            setIsActive(false);
            setShowTimer(false);
            setRemainingSecs(0);
        }
    };

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setRemainingSecs(prevSecs => {
                    if (prevSecs >= 7200) { // 2 hours * 3600 seconds/hour
                        clearInterval(interval);
                        return 7200; // Stop the timer at 2 hours
                    }
                    return prevSecs + 1;
                });
            }, 1000);
        } else if (!isActive && remainingSecs !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, remainingSecs]);

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{'\n'}{'\n'}RAYRESIST</Text>
                <Text>{'\n'}{'\n'}NOW{'\t'}{'\t'}{'\t'}{'\t'}TODAY{'\n'}</Text>
                {uvIndex && (
                    <Text style={styles.uvIndexText}>
                        UV Index:  {'\t'}{'\t'}{'\t'}{uvIndex}
                    </Text>
                )}
                {temperature && (
                    <Text style={styles.weatherText}>
                        Temperature: {'\t'}{temperature}°C
                    </Text>
                )}
                {humidity && (
                    <Text style={styles.weatherText}>
                        Humidity: {'\t'}{humidity}%
                    </Text>
                )}
            </View>

            <TouchableOpacity onPress={handleTimer} style={styles.roundButton}>
                <Text style={styles.buttonTextStyle}>{showTimer && !isActive ? 'Reset' : 'Apply'}</Text>
            </TouchableOpacity>

            {showTimer && (
                <>
                    <Text style={styles.timerText}>{`${getRemaining(remainingSecs).mins}:${getRemaining(remainingSecs).secs}`}</Text>
                    <TouchableOpacity onPress={handleTimer} style={[styles.button, { backgroundColor: isActive ? '#FF5733' : '#61210F' }]}>
                        <Text style={styles.buttonTextStyle}>{isActive ? 'Pause' : 'Start'}</Text>
                    </TouchableOpacity>
                </>
            )}

            <Text>{'\n'}{'\n'}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity style={styles.iconButton}>
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
        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 1,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        letterSpacing: 2,
        textAlign: 'center',
        color: 'darkorange',
    },
    uvIndexText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    weatherText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 5,
    },
    roundButton: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        backgroundColor: '#E56917',
        borderRadius: 50, // Make it perfectly round
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        marginTop: 10,
        color: 'white',
        fontSize: 24,
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
    timerText: {
        color: '#ff0000',
        fontSize: 30,
        marginBottom: 20
    },
    button: {
        borderWidth: 5,
        borderColor: '#B9AAFF',
        width: 125,
        height: 75,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 20,
        color: '#B9AAFF'
    },
    buttonReset: {
        marginTop: 20,
        borderColor: "#FF851B"
    },
    buttonTextReset: {
        color: "#FF851B"
    }
});