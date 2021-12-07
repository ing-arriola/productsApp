import React from 'react'
import { View, Text } from 'react-native'
import Background from '../Components/Background'
import InputText from '../Components/InputText'
import WhiteLogo from '../Components/WhiteLogo'

const LoginScreen = () => {
    return (
        <>
            <Background/>
            <WhiteLogo/>
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}} >Login</Text>
            <InputText label='Email' placeholderText='Enter your email' />
            <InputText label='Password' placeholderText="Enter your password" />
        </>
    )
}

export default LoginScreen
