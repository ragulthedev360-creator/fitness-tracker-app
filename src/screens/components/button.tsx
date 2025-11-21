import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { addSession, updateUserProfile, userLogin, userRegister } from '../../service/api';
import { CustomErrorToast } from './toastMsg';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
export default function Buttons({ navigation, apiFunction, name, reqBody, login }: any) {


    const handlePress = async () => {

        if (apiFunction === "login") {
            if (reqBody.email === "") {
                CustomErrorToast("Please enter your email");
                return;
            }
            if (reqBody.password === "") {
                CustomErrorToast("Please enter your password");
                return;
            }
            const param = {
                email: reqBody.email,
                password: reqBody.password,
            };

            try {
                const res = await userLogin(param);

                if (res.status == 200) {
                    await AsyncStorage.setItem("token", res.data.access_token);
                    const userObj = {
                        id: res.data.id,
                        name: res.data.name,
                    };
                    await login(userObj, res.data.access_token);

                }

            } catch (err: any) {
                if (err.response) {
                    if (err.response.status === 400) {
                        CustomErrorToast("Incorrect email or password");
                    }
                    if (err.response.status === 401) {
                        CustomErrorToast("Invalid credentials");
                    }
                } else {
                    // console.error("Network Error:", err.message);
                }
            }
        }

        else if (apiFunction === "signup") {
            if (reqBody.name === "") {
                CustomErrorToast("Please enter your name");
                return;
            }
            if (reqBody.email === "") {
                CustomErrorToast("Please enter your email");
                return;
            }
            if (reqBody.password === "") {
                CustomErrorToast("Please enter your password");
                return;
            }
            if (reqBody.confirm_password === "") {
                CustomErrorToast("Please enter your confirm password");
                return;
            }
            if (reqBody.gender === "") {
                CustomErrorToast("Please enter your gender");
                return;
            }
            if (reqBody.password !== reqBody.confirm_password) {
                CustomErrorToast("Passwords do not match");
                return;
            }

            const param = {
                name: reqBody.name,
                email: reqBody.email.toLowerCase(),
                password: reqBody.password,
                gender: reqBody.gender,
            };


            try {
                const res = await userRegister(param);

                const token = res.data.access_token;
                if (token) {
                    await AsyncStorage.setItem('token', token);
                    navigation.navigate('Login')
                }
            } catch (err: any) {
                 navigation.navigate('Login')
                if (err.response) {

                    if (err.response.status === 400) {
                        // CustomErrorToast("Email already registered!");
                        return
                    }
                } else {
                    // console.error('Network Error:', err.message);
                }
            } finally{
                 navigation.navigate('Login')
            }
        }
        else if (apiFunction === "updateProfile") {
            if (reqBody.name === "") {
                CustomErrorToast("Please enter your name");
                return;
            }
            if (reqBody.height === "") {
                CustomErrorToast("Please enter your email");
                return;
            }
            if (reqBody.weight === "") {
                CustomErrorToast("Please enter your password");
                return;
            }

            const param = {
                name: reqBody.name,
                weight: reqBody.weight,
                height: reqBody.height
            };

            try {
                const res = await updateUserProfile(param);
                if (res.status == 200) {

                    navigation.goBack();
                }
            } catch (err: any) {
                if (err.response) {
                    // console.error('API Error:', err.response.data);
                    // console.error('Status:', err.response.status);
                } else {
                    // console.error('Network Error:', err.message);
                }
            }
        }
        else if (apiFunction === "addSession") {
            if (reqBody?.results === "") {
                CustomErrorToast("Please fill the details ");
                return;
            }
            const param = {
                workout_id: reqBody?.workout_id,
                duration: reqBody?.duration,
                results: reqBody?.results,
            };

            try {
                const res = await addSession(param);
                if (res.status == 200) {
                    navigation.navigate('Home')
                }
            } catch (err: any) {
                if (err.response) {
                    // console.error('API Error:', err.response.data);
                    // console.error('Status:', err.response.status);
                } else {
                    // console.error('Network Error:', err.message);
                }
            }
        }

    };


    return (
        <View >
            <Pressable style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}> {name}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(246,124,35)',
        paddingVertical: 12,
        width: screenWidth - 40,
        borderRadius: 8,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center'
    },
});