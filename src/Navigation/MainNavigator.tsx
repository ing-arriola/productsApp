import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProtectedScreen from '../Screens/ProtectedScreen';


const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
      </Stack.Navigator>
    )
}

export default MainNavigator
