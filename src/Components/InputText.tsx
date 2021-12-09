import React from 'react'
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import Background from './Background';

interface Props{
    label:string
    placeholderText:string
    onchange:(value:string) => void
    value:string
    secure?:boolean
}

const InputText = ({label,placeholderText,onchange,value,secure}:Props) => {
    return (
        <View >
            <Text>{label}</Text>
            <TextInput
                placeholder={placeholderText}
                placeholderTextColor='rgba(255,255,255,0.4)'
                underlineColorAndroid='white'
                style={[styles.inputAndroid,(Platform.OS === 'ios')&& styles.inputIos]}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={onchange}
                value={value}
                secureTextEntry={secure}
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
