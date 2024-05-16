import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Btn from '../modules/Btn';
const Profile = (props) => {
  return (
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
      <Text style={{ color: 'brown', fontSize: 50 }}>Welcome to</Text>
      <Text style={{ color: 'brown', fontSize: 50, marginBottom: 40 }}>RayResist!!</Text>
      <Btn bgColor='darkorange' textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Login")} />
      <Btn bgColor='white' textColor='darkorange' btnLabel="Signup" Press={() => props.navigation.navigate("Signup")} />
      </View>
  );
}
const styles = StyleSheet.create({})
export default Profile;