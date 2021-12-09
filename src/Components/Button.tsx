import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props{
    onPress:()=>void
    label:string
}

const Button = ({label,onPress}:Props) => {
    return (
         <TouchableOpacity style={styles.container} onPress={onPress} >
            <Text >{label}</Text>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        height:'40%',
        paddingHorizontal:'10%'
    }
});

export default Button
