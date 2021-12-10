import { StackScreenProps } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard, Alert } from 'react-native'
import Background from '../Components/Background';
import Button from '../Components/Button'
import InputText from '../Components/InputText'
import WhiteLogo from '../Components/WhiteLogo'
import { useForm } from '../Hooks/UseForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any,any> {}

const LoginScreen = ({navigation}:Props) => {

    const {signIn,errorMessage,removeError} = useContext(AuthContext)

    const {email,password,onChange} = useForm({
        email:'',
        password:''
    })

    const onLogin = () => {
        signIn({correo:email,password})
        Keyboard.dismiss()
    }

    useEffect(() => {
        if(errorMessage.length === 0 ) return
        Alert.alert('Error on login',errorMessage,[
            {
                text:'OK',
                onPress:removeError
            }
        ])
    }, [errorMessage])

    return (              
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                    enabled={Platform.OS === "ios" ? true : false}
                style={{flex:1}} >
                    <Background/>
                    <View style={{paddingHorizontal:'8%',flex:1}} >
                        <WhiteLogo/>
                        <View style={{flex:2,justifyContent:'center'}} >
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}} >Login</Text>
                            <InputText 
                                onchange={(value:string) => onChange(value,'email')} 
                                value={email} 
                                label='Email' 
                                placeholderText='Enter your email' />
                            <InputText 
                                onchange={(value:string) => onChange(value,'password')} 
                                value={password} 
                                label='Password' 
                                placeholderText="Enter your password"
                                secure={true}
                                />
                            <View style={{alignItems:'center',width:'100%'}} >
                                <Button onPress={onLogin} label='Login' />
                            </View>
                            <View style={{alignItems:'center',width:'100%'}} >
                                <Button onPress={() => navigation.replace('RegisterScreen')} label='Register' />
                            </View>
                        </View>
                        <View style={{flex:1}} />

                    </View>
                </KeyboardAvoidingView>
    )
}

export default LoginScreen
