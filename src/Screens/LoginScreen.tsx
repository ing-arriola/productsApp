import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import Background from '../Components/Background';
import Button from '../Components/Button'
import InputText from '../Components/InputText'
import WhiteLogo from '../Components/WhiteLogo'
import { useForm } from '../Hooks/UseForm';

const LoginScreen = () => {

    /* const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
 */
    const {email,password,onChange} = useForm({
        email:'',
        password:''
    })

    const onLogin = () => {
        console.log({email,password})
        Keyboard.dismiss()
    }

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
                        </View>
                        <View style={{flex:1}} />

                    </View>
                </KeyboardAvoidingView>
    )
}

export default LoginScreen
