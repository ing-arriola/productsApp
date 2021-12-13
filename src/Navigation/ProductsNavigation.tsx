import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProducsListScreen from '../Screens/Product/ProducsListScreen';
import SingleProductScreen from '../Screens/Product/SingleProductScreen';

export type ProductsStackParams = {
    ProducsListScreen: undefined,
    SingleProductScreen: {id?:string, name?:string}
}

const Stack = createStackNavigator<ProductsStackParams>()

const ProductsNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyle:{
                    backgroundColor:'white'
                },
                headerStyle:{
                    elevation:0,
                    shadowColor:'transparent'
                }
            }}
        >
            <Stack.Screen
                name='ProducsListScreen'
                component={ProducsListScreen}
                options={{title:'ProducsListScreen'}}
            />
            <Stack.Screen
                name='SingleProductScreen'
                component={SingleProductScreen}
            />
        </Stack.Navigator>
    )
}

export default ProductsNavigation
