import React from 'react'
import { View, Text } from 'react-native'

const Background = () => {
    return (
        <View
            style={{
                position:'absolute',
                backgroundColor:'#5856D6',
                top:-100,
                height:'100%',
                width:'100%',
                borderBottomEndRadius:50,
                borderBottomStartRadius:50
            }}
        />
    )
}

export default Background
