import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Button, TextInput, Alert, ScrollView } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../config';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Data = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password,setPassword]=useState('');
  const [datedateData, setDatedateData] = useState(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setEmail(user.email);
        const userRef = firebase.firestore().collection('users').doc(user.email);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setDatedateData(userData.datedate);
        }
      }
    };

    fetchEmail();
  }, []);

  // Sort the datedateData object by keys (dates) in ascending order
  const sortedData = datedateData
    ? Object.keys(datedateData).sort((a, b) => new Date(a) - new Date(b)).reduce((obj, key) => {
        if (!obj[key]) {
          obj[key] = datedateData[key];
        }
        return obj;
      }, {})
    : null;

  const handlePostSubmit = () => {
    if (!text) {
      Alert.alert('Please enter text.');
      return;
    }

    firebase.firestore().collection('posts').add({
      text,
      userEmail: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Include a timestamp
    })
    .then(() => {
      Alert.alert('Post submitted successfully!');
      // Clear input field after submission
      setText('');
    })
    .catch(error => {
      console.error('Error submitting post:', error);
      Alert.alert('Failed to submit post. Please try again later.');
    });
  };


  const logOut=async()=>{
    const e=await AsyncStorage.removeItem('email')
    const p=await AsyncStorage.removeItem('password')
    navigation.navigate("Login")
    /*if(!e && !p){
      //alert("Logged out successfully")
      navigation.navigate("Login")
    }*/
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text style={{ color: 'magenta', fontSize: 30 }}>Hello {'\n'}{email}!</Text>
      </View>
      <Text>
        WELCOME TO BLOG
      </Text>
      <TextInput
        placeholder="Enter post text"
        value={text}
        onChangeText={setText}
        style={styles.textInput}
        multiline={true}
      />
      <Button title="Submit Post" onPress={handlePostSubmit} /><Text>{'\n'}</Text>
      <Button title="Logout" onPress={()=>{logOut()}}/>
      <Text>{'\n'}{'\n'}</Text>
      <Text>{'\n'}{'\n'}</Text>
      {sortedData && (
        <BarChart
          data={{
            labels: Object.keys(sortedData),
            datasets: [{
              data: Object.values(sortedData),
            }],
          }}
          width={Dimensions.get('window').width - 16} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
            yAxisInset: true,
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
        
      )}

      
      
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home"); } } style={styles.iconButton}>
          <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Learn"); } } style={styles.iconButton}>
          <Foundation name="lightbulb" size={24} color="black" /><Text>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Data"); } } style={styles.iconButton}>
          <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    margin: 10,
    width: '80%',
    maxHeight: 200,
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
});

export default Data;
