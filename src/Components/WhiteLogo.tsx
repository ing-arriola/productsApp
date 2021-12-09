import React from 'react'
import { View, Text, Image } from 'react-native'

const WhiteLogo = () => {
    return (
        <View style={{flex:1,justifyContent:'center'}} >
            <Image
                source={require('../Assets/loginLogo.png')}
                style={{alignSelf:'center',height:100,width:120}}
                
            />
        </View>
    )
}

export default WhiteLogo
