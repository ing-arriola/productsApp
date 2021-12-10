import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProtectedScreen from '../Screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';


const Stack = createStackNavigator();



const MainNavigator = () => {

    const {status} = useContext(AuthContext)

        console.log(status)


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
                cardStyle:{
                    backgroundColor:'white'
                }
            }}
        >
            {status === 'authenticated' ? (
                <Stack.Screen name="ProtectedScreen" component={ProtectedScreen} />
            ) :
            (
                <>
                    <Stack.Screen name="LoginScreen" component={LoginScreen} />
                    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                </>
            )
            }
      </Stack.Navigator>
    )
}

export default MainNavigator
