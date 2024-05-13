import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../config';
import { BarChart } from 'react-native-chart-kit';

const Data = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [datedateData, setDatedateData] = useState(null);

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
        obj[key] = datedateData[key];
        return obj;
      }, {})
    : null;

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 40, marginVertical: 100 }}>
        <Text style={{ color: 'magenta', fontSize: 30 }}>Hello {'\n'}{email}!</Text>
      </View>
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
      <Text>{'\n'}{'\n'}</Text>
      <Text>{'\n'}{'\n'}</Text><Text>{'\n'}{'\n'}</Text>
      <Text>{'\n'}{'\n'}</Text>
      <Text>{'\n'}{'\n'}</Text><Text>{'\n'}{'\n'}</Text>
      <Text>{'\n'}{'\n'}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => { navigation.navigate("Home"); }} style={styles.iconButton}>
          <FontAwesome name="home" size={24} color="black" /><Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Learn"); }} style={styles.iconButton}>
          <Foundation name="lightbulb" size={24} color="black" /><Text>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate("Data"); }} style={styles.iconButton}>
          <MaterialCommunityIcons name="face-man-profile" size={24} color="black" /><Text>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
