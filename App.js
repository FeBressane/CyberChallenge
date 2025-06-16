import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Moneychat from './screens/Moneychat';
import Trilhas from './screens/Trilhas';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Moneychat" component={Moneychat} />
        <Stack.Screen name="Trilhas" component={Trilhas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}