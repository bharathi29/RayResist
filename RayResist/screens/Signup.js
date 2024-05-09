import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Btn from './Btn';
import Field from './Field';

const Signup = props => {
  return (
    <View style={{alignItems: 'center', width: 460, backgroundColor: 'darkorange'}}>
      <Text
        style={{
          color: 'white',
          fontSize: 64,
          fontWeight: 'bold',
          marginTop: 20,
        }}>
        Register
      </Text>
      <Text
        style={{
          color: 'white',
          fontSize: 19,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
        Create a new account
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          height: 500, // Adjusted height
          width: 460,
          borderTopLeftRadius: 130,
          paddingTop: 50,
          alignItems: 'center',
        }}>
        <Field placeholder="Name" />
        <Field
          placeholder="Email"
          keyboardType={'email-address'}
        />
        <Field placeholder="Contact Number" keyboardType={'number'} />
        <Field placeholder="Password" secureTextEntry={true} />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '78%',
            paddingRight: 16,
          }}>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: '78%',
            paddingRight: 16,
            marginBottom: 10,
          }}>

        </View>
        <Btn
          textColor="white"
          bgColor={'darkorange'}
          btnLabel="Signup"
          Press={() => {
            alert('Account created');
            props.navigation.navigate('Login');
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            Already have an account ?{' '}
          </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('Login')}>
            <Text style={{color: 'darkorange', fontWeight: 'bold', fontSize: 16}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
