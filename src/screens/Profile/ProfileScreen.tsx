import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { CustomSuccessToast, CustomErrorToast } from '../../screens/components/toastMsg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../service/axios';
import { useAuth } from "../../store/auth";
import Buttons from '../components/button';
import MyStatusBar from '../components/MyStatusBar';
import NavHeader from '../components/navHeader';

export default function ProfileScreen({ navigation }: any) {
  const [profile, setProfile] = useState({
    name: '',
    weight: '',
    height: '',
  });
  const { logout } = useAuth();



  useEffect(() => {
    const loadProfile = async () => {
      try {

        const res = await axiosInstance.post("profile/userProfile");

        setProfile(res?.data?.data)
      } catch (err: any) {

        if (err.response) {
          // console.error("API Error:", err.response.data);
          // console.error("Status:", err.response.status);
        } else {
          // console.error("Network Error:", err.message);
        }
      }
    };

    loadProfile();
  }, []);


  const handleremove = async () => {
    await AsyncStorage.removeItem("token");
    console.log("Token removed!");
     navigation.replace("Auth");
  };

  return (
     <>
       <MyStatusBar
        backgroundColor={'rgb(246,124,35)'}
        barStyle="light-content"
      />
      <NavHeader title="Profile" />
    <View style={styles.container}>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
        placeholder="Enter your name"
          maxLength={60}
        style={styles.input}
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        value={profile.weight ? String(profile.weight) : ""}
        onChangeText={(text) => setProfile({ ...profile, weight: text })}
        placeholder="Enter your weight"
        keyboardType="numeric"
          maxLength={2}
        style={styles.input}
      />


      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        value={profile.height ? String(profile.height) : ""}
        onChangeText={(text) => setProfile({ ...profile, height: text })}
        placeholder="Enter your height"
        keyboardType="numeric"
        style={styles.input}
      />


      <View style={styles.buttonStyle}>


        <Buttons
          navigation={navigation}
          apiFunction="updateProfile"
          name="Update"
          reqBody={profile}
        />
      </View>


    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000', // optional dark background
  },
  heading: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2f2f2f',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1e90ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonStyle: {
    marginTop: 55
  },
});

