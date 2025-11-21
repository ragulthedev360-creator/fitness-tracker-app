import { StyleSheet, Text, View } from 'react-native';
import Toast, { SuccessToast } from 'react-native-toast-message';
import React from 'react';

export const TostConfig = {
    success: ({ text1 }: any) => {
        return (
            <View style={styles.successToastView}>
                <Text style={styles.successToastText}>{text1}</Text>
            </View>
        );
    },
    error: ({ text1 }: any) => {
        return (
            <View style={styles.errorToastView}   >
                <Text  style={styles.successToastText}  >
                    {text1}
                </Text>
            </View>
        );
    },
};

export const CustomToast = Toast;

export const CustomErrorToast = (message: string) => {
    return CustomToast.show({
        type: 'error',
        text1: message,
        position: 'bottom',
        bottomOffset: 0,
    });
};

export const CustomSuccessToast = (message: string) => {
    return CustomToast.show({
        type: 'success',
        text1: message,
        position: 'bottom',
        bottomOffset: 0,
    });
};

const styles = StyleSheet.create({
    successToastView: {
        width: '95%',
        backgroundColor: 'green',
        borderRadius: 8,
        marginHorizontal: 10,
        padding: 10,
        minHeight: 40,
    },
    successToastText: {
        color: 'white',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    errorToastView: {
        width: '95%',
        backgroundColor: 'red',
        borderRadius: 8,
        marginHorizontal: 10,
        padding: 10,
        minHeight: 40,
    },
    errorToastText: {
        color: 'white',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
});
