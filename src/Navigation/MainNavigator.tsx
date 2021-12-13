import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ProtectedScreen from '../Screens/ProtectedScreen';
import { AuthContext } from '../context/AuthContext';
import LoadingScreen from '../Screens/LoadingScreen';
import ProductsNavigation from './ProductsNavigation';


const Stack = createStackNavigator();



const MainNavigator = () => {

    const {status} = useContext(AuthContext)

    if(status === 'cheking') return <LoadingScreen/>


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
                <Stack.Screen name="ProductsNavigation" component={ProductsNavigation} />
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
