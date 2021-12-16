import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import { ProductsStackParams } from '../../Navigation/ProductsNavigation';
import { TextInput } from 'react-native-gesture-handler';
import { useCategories } from '../../Hooks/useCategories';
import { useForm } from '../../Hooks/UseForm';

interface Props extends StackScreenProps< ProductsStackParams,'SingleProductScreen' >{}

const SingleProductScreen = ({navigation,route}:Props) => {
    const { name,id }=route.params
    const [selectedCategory, setselectedCategory] = useState()

    const {categories,isLoading} = useCategories()

    const {_id, categoryId, itemName, img, form, onChange} = useForm({
        _id:id,
        categoryId:'',
        itemName:name,
        img:''
    })

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
                        value={name}
                        onChangeText={(value)=> onChange(value,'itemName')}
                    />
                </View>
                <View>
                    <Text>Select category:</Text>
                    <Picker
                        selectedValue={selectedCategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setselectedCategory(itemValue)
                        }>
                        {categories.map(item => (
                            <Picker.Item label={item.nombre} value={item._id} key={item._id} />
                        ))}
                    </Picker>
                </View>
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
            <Text>{JSON.stringify(form,null,2)}</Text>
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
