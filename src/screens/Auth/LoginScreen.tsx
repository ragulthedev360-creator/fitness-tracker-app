import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Buttons from '../components/button';
import LinearGradient from 'react-native-linear-gradient';
import { useAuth } from '../../store/auth';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();

  interface FormDataType {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
    password: "",
  });
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co|in)$/;

  const handleChange = (name: any, value: any) => {
    let updatedValue = value;

    if (name === 'email') {
      // updatedValue = updatedValue.toLowerCase();
      if (!emailRegex.test(updatedValue)) {
        // console.log("Invalid email. Please enter a correct one ending with .com, .co, or .in");
      }
    }
    setFormData(prev => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  return (
    <LinearGradient
      colors={['#000', '#000', '#000', 'rgb(246,124,35)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.heading}>Login to your Account</Text>
      <View>
        <Text style={styles.label}>
          E-mail
        </Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
        />
      </View>

      <View>
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonStyle}>
        <Buttons
          navigation={navigation}
          apiFunction="login"
          name="Login"
          reqBody={formData}
          login={login}
        />
      </View>
      <View style={styles.bottomcontainer} >
        <Text style={styles.bottomText}>Don't have an account ?</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={[styles.bottomText, { color: 'rgb(246,124,35)' }]}  >Sign up</Text>

        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: 'white'
  },
  buttonStyle: {
    marginTop: 55
  },
  heading: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '700',
    letterSpacing: 2,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 190,
  },
  bottomcontainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 4,
    paddingVertical: 20
  },

  bottomText: {
    color: '#fff',
    fontSize: 12
  },
  input: {
    borderWidth: 1,
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
    borderColor: '#2f2f2f',
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    color: '#fff',
  },
});
