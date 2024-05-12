import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../config';

const Data = ({ navigation }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setEmail(user.email);
      }
    };

    fetchEmail();
  }, []);

  return (
    <><View style={{ marginHorizontal: 40, marginVertical: 100 }}>
          <Text style={{ color: 'magenta', fontSize: 30 }}>Hello {'\n'}{email}!</Text>
      </View><View>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <Text>{'\n'}{'\n'}</Text>
              <View style={styles.iconContainer}>
                  <TouchableOpacity onPress={() => { navigation.navigate("Home"); } }
                      style={styles.iconButton}>
                      <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { navigation.navigate("Learn"); } }
                      style={styles.iconButton}>
                      <Foundation name="lightbulb" size={24} color="black" />
                      <Text>Learn</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { navigation.navigate("Data"); } }
                      style={styles.iconButton}>
                      <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
                  </TouchableOpacity>
              </View>
          </View></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
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
