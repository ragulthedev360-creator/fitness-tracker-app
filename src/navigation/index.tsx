import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./stacks/AuthStack";
import AppStack from "./stacks/AppStack";
import { useAuth } from "../store/auth";
import { Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
const { user, loading } = useAuth();
if (loading) return <Text>Loading...</Text>;
  // if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
