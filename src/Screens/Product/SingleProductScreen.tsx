import React, { useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../Navigation/ProductsNavigation';
import { TextInput } from 'react-native-gesture-handler';

interface Props extends StackScreenProps< ProductsStackParams,'SingleProductScreen' >{}

const SingleProductScreen = ({navigation,route}:Props) => {
    const { name,id }=route.params

    useEffect(() => {
        navigation.setOptions({
            title:name
        })
    }, [])

    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={{justifyContent:'space-around',flex:1}}  >
                <View>
                    <Text>Product name:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='enter product name'
                    />
                </View>
                <Text>Select category:</Text>
                <Button
                    title='Save'
                    color='#5856D6'
                />
            <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                <Button
                    title='Open camera'
                    color='#5856D6'
                />
                <Button
                    title='Go to gallery'
                    color='#5856D6'
                />
            </View>
            
            </ScrollView>


            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:10,
        marginHorizontal:20,
    },
    textInput:{
        borderWidth:1,
        borderRadius:5,
        borderColor:'rgba(0,0,0,0.2)',
        marginTop:3
    }
});

export default SingleProductScreen
