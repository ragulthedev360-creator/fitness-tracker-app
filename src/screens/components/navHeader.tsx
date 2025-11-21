import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface NavHeaderProps {
    title?: string;
    showBack?: boolean;
}

export default function NavHeader({ title, showBack = true }: NavHeaderProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {showBack && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backText}>←</Text>
                </TouchableOpacity>
            )}
            <View style={[styles.titleContainer]}>
                <Text style={styles.title}>{title}</Text>

                {/* {title == "Home" && (
                    <Image
                        source={require('../../../assets/images/profile.svg')}
                        style={styles.profileIcon}
                    />
                )} */}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: '#000',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.35,
        shadowRadius: 4,
        elevation: 8,
        zIndex: 1,
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    backText: {
        color: '#fff',
        fontSize: 44,
        fontWeight: '700',
        marginTop: -16,
        left: -20
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#ffffffff",
    },

    profileIcon: {
        width: 30,
        height: 30,
        resizeMode: "contain",
    },

});
