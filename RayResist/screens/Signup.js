import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import Btn from '../modules/Btn';
import Field from '../modules/Field';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Store additional user information in Firestore
        firebase.firestore().collection('users').doc(email).set({
          name,
          email,
          contactNumber,
        })
        .then(() => {
          alert('Account created');
          navigation.navigate('Login');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful
        alert('Login successful');
        // Navigate to the desired screen
        navigation.navigate('Home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <View style={{ alignItems: 'center', width: 460, backgroundColor: 'darkorange' }}>
      <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginTop: 20 }}>Register</Text>
      <Text style={{ color: 'white', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>Create a new account</Text>
      <View style={{ backgroundColor: 'white', height: 500, width: 460, borderTopLeftRadius: 130, paddingTop: 50, alignItems: 'center' }}>
        <Field placeholder="Name" onChangeText={(text) => setName(text)} />
        <Field placeholder="Email" keyboardType={'email-address'} onChangeText={(text) => setEmail(text)} />
        <Field placeholder="Contact Number" keyboardType={'number'} onChangeText={(text) => setContactNumber(text)} />
        <Field placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
        <Btn textColor="white" bgColor={'darkorange'} btnLabel="Signup" Press={handleSignup} />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Already have an account ? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={{ color: 'darkorange', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
