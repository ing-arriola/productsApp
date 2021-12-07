import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import Background from './Background';

interface Props{
    label:string
    placeholderText:string
}

const InputText = ({label,placeholderText}:Props) => {
    return (
        <View >
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholderText}
                placeholderTextColor='rgba(255,255,255,0.4)'
                keyboardType='email-address'
                underlineColorAndroid='white'
                style={[styles.inputAndroid,(Platform.OS === 'ios')&& styles.inputIos]}
                autoCapitalize='none'
                autoCorrect={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputAndroid:{
        color:'white',
    },
    inputIos:{
        borderBottomColor:'white',
        borderBottomWidth:2,
        paddingBottom:4
    }
});

export default InputText
