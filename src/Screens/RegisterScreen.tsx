import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { View, Text, KeyboardAvoidingView, Platform, Keyboard,TouchableOpacity } from 'react-native'
import Button from '../Components/Button'
import InputText from '../Components/InputText'
import WhiteLogo from '../Components/WhiteLogo'
import { useForm } from '../Hooks/UseForm'

interface Props extends StackScreenProps<any,any> {}

const RegisterScreen = ({navigation}:Props) => {
    const {email,password,name,onChange} = useForm({
        email:'',
        password:'',
        name:''
    })

    const onRegister = () => {
        console.log({email,password})
        Keyboard.dismiss()
    }
    return (
        <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
                    enabled={Platform.OS === "ios" ? true : false}
                    style={{flex:1,backgroundColor:'#5856D6'}} >
                    
                    <View style={{paddingHorizontal:'8%',flex:1}} >
                        <WhiteLogo/>
                        <View style={{flex:2,justifyContent:'center'}} >
                            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}} >Register</Text>
                            <InputText 
                                onchange={(value:string) => onChange(value,'name')} 
                                value={name} 
                                label='Name' 
                                placeholderText='Enter your name' />
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
                                <Button onPress={onRegister} label='Create account' />
                            </View>
                        </View>
                            <TouchableOpacity style={{position:'absolute',top:40,left:30,borderRadius:50,borderColor:'white',borderWidth:1,padding:5}} 
                            onPress={()=>navigation.replace('LoginScreen')}>
                                <Text style={{color:'white'}} >Go back</Text>
                            </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
    )
}

export default RegisterScreen
