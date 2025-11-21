//appstack
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/Home/HomeScreen';
import WorkoutsScreen from '../../screens/Workouts/WorkoutsScreen';
import WorkoutDetail from '../../screens/Workouts/WorkoutDetail';
import SessionTracker from '../../screens/Session/SessionTracker';
import HistoryScreen from '../../screens/History/HistoryScreen';
import MetricsScreen from '../../screens/Metrics/MetricsScreen';
import ProfileScreen from '../../screens/Profile/ProfileScreen';

const Stack=createNativeStackNavigator();
export default function AppStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Workouts" component={WorkoutsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} options={{ headerShown: false }}/>
      <Stack.Screen name="SessionTracker" component={SessionTracker} options={{ headerShown: false }}/>
      <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Metrics" component={MetricsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
