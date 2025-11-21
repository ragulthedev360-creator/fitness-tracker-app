
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import InputBox from '../components/InputBox';
import Buttons from '../components/button';
import { CustomErrorToast, TostConfig } from '../components/toastMsg';
import { Picker } from "@react-native-picker/picker";
export default function SignupScreen({ navigation }: any) {
  interface FormDataType {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    gender: string;
  }
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
  });
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(formData.gender);
  const [items, setItems] = useState([
    { label: 'Male', value: '1' },
    { label: 'Female', value: '2' },
    { label: 'Other', value: '3' },
  ]);

  const handleGenderChange = (val: any) => {
    handleChange("gender", val);
    setGender(val);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|co|in)$/;

  const handleChange = (name: any, value: any) => {
    let updatedValue = value;

    if (name === 'email') {
      updatedValue = updatedValue.toLowerCase();
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
      colors={['#000', '#000', '#000', '#000', 'rgb(246,124,35)']}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View >
        <Text style={styles.heading}>Create an account</Text>
        <Text style={styles.subheading}>Help us finish setting up your account</Text>
        <View>
          <Text style={styles.label}>Username</Text>

          <InputBox
            value={formData.name}
            fieldname="name"
            onChangeText={handleChange}
            placeholder="Name"
            secure={false}
          />
        </View>

        <View>
          <Text style={styles.label}>User gender</Text>

          <View
            style={{
              backgroundColor: "#3a3a3a",      // ← CHANGE COLOR HERE
              borderWidth: 1,
              borderColor: "#2f2f2f",
              borderRadius: 8,
              marginVertical: 12,
              paddingHorizontal: 5,
            }}
          >
            <Picker
              selectedValue={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
              dropdownIconColor="#fff"
              style={{
                color: "#fff",
                height: 50,
              }}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>


        <View>
          <Text style={styles.label}>E-mail</Text>
          <InputBox
            value={formData.email}
            fieldname="email"
            onChangeText={handleChange}
            placeholder="E-mail"
            secure={false}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <InputBox
            value={formData.password}
            fieldname="password"
            onChangeText={handleChange}
            placeholder="Password"
            secure={true}
          />


        </View>
        <View>
          <Text style={styles.label}>confirm Password</Text>

          <InputBox
            value={formData.confirm_password}
            fieldname="confirm_password"
            onChangeText={handleChange}
            placeholder="confirm password"
            secure={false}
          />
        </View>
        <View style={styles.buttonStyle}>
          <Buttons navigation={navigation} name="Continue" apiFunction={'signup'} reqBody={formData} />
        </View>
      </View>
    </LinearGradient >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    color: 'white',
    marginHorizontal: 4
  },
  heading: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 5,
    fontWeight: '700',
    letterSpacing: 2,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 100,
  },
  subheading: {
    fontSize: 9,
    color: '#fff',
    marginBottom: 20,
    fontWeight: '500',
    letterSpacing: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  bottomText: {
    color: '#fff',
    fontSize: 12
  },
  buttonStyle: {
    marginTop: 25
  },
})