import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { firebase } from '../config';
import Btn from '../modules/Btn';
import Field from '../modules/Field';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (email,password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async () => {
        // Login successful
        await AsyncStorage.setItem("email",email)
        await AsyncStorage.setItem("password",password)
        alert('Login successful')

        // Navigate to the desired screen
        navigation.navigate('Home',{email:email});
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const alreadyLogin=async()=>{
    const em=await AsyncStorage.getItem('email')
    const pwd=await AsyncStorage.getItem('password')
    if(em && pwd)
      {
        setEmail(em)
        setPassword(pwd)
        console.log(em)
        console.log(pwd)
        
        handleLogin(em,pwd)
    
      }
      else
      {
        alert('User not found')
      }
    
  }

  useEffect(()=>{
    alreadyLogin();
  },[])

  return (
    <View style={{ alignItems: 'center', width: 460, backgroundColor: 'darkorange' }}>
      <Text style={{ color: 'white', fontSize: 64, fontWeight: 'bold', marginVertical: 20 }}>Login</Text>
      <View style={{ backgroundColor: 'white', height: 700, width: 460, borderTopLeftRadius: 130, paddingTop: 100, alignItems: 'center' }}>
        <Text style={{ fontSize: 40, color: 'darkorange', fontWeight: 'bold' }}>Welcome Back</Text>
        <Text style={{ color: 'grey', fontSize: 19, fontWeight: 'bold', marginBottom: 20 }}>Login to your account</Text>
        <Field placeholder="Email" keyboardType={'email-address'} onChangeText={(text) => setEmail(text)} />
        <Field placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
        <Btn textColor='white' bgColor='darkorange' btnLabel="Login" Press={()=>{handleLogin(email,password)}} />
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Don't have an account ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: 'darkorange', fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
