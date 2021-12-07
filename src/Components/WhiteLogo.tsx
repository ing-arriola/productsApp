import React from 'react'
import { View, Text, Image } from 'react-native'

const WhiteLogo = () => {
    return (
        <>
            <Image
                source={require('../Assets/loginLogo.png')}
                style={{width:'20%',height:'10%',alignSelf:'center'}}
                
            />
        </>
    )
}

export default WhiteLogo
