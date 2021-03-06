import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button, Image, ActivityIndicator } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack';
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { ProductsStackParams } from '../../Navigation/ProductsNavigation';
import { TextInput } from 'react-native-gesture-handler';
import { useCategories } from '../../Hooks/useCategories';
import { useForm } from '../../Hooks/UseForm';
import { ProductContext } from '../../context/ProductsContext';

interface Props extends StackScreenProps< ProductsStackParams,'SingleProductScreen' >{}

const SingleProductScreen = ({navigation,route}:Props) => {
    const { name,id }=route.params

    const {categories,isLoading} = useCategories()
    const [tempImage, settempImage] = useState<string>('')
    const { loadProductById, addProduct, updateProduct, updaloadImage } = useContext(ProductContext)
    
    const {_id, categoryId, itemName, img, onChange, setFormValue} = useForm({
        _id:id,
        categoryId:'',
        itemName:id ? name : '',
        img:''
    })

    const takePhoto = () => {
        launchCamera({
            mediaType:'photo',
            quality:0.6
        },(res)=>{
            if (res.didCancel) return
            if(res.assets){
                res.assets[0].uri && settempImage(res.assets[0].uri)
                res.assets[0] && _id && updaloadImage(res,_id) 
                
            }
            
        })
    }

    const getImageFromGallery = () => {
        launchImageLibrary({
            mediaType:'photo',
            quality:0.6
        },(res)=>{
            if (res.didCancel) return
            if(res.assets){
                res.assets[0].uri && settempImage(res.assets[0].uri)
                res.assets[0] && _id && updaloadImage(res,_id) 
                
            }
            
        })
    }

    const loadProduct = async() => {
        if(id){
            const res = await loadProductById(id)
            setFormValue({
                _id:id,
                categoryId:res.categoria._id,
                img:res.img || '',
                itemName:res.nombre || ''
            })
        }
        
    }

    const ImageButtons = () => {
        if(_id){
            return(
                <View style={{flexDirection:'row',justifyContent:'space-around'}} >
                <Button
                    title='Open camera'
                    color='#5856D6'
                    onPress={takePhoto}
                />
                <Button
                    title='Go to gallery'
                    color='#5856D6'
                    onPress={getImageFromGallery}
                />
            </View>
            )
        }
    }

    useEffect(() => {
        navigation.setOptions({
            title: itemName ? itemName : 'Please set a name'
        })
        
    }, [itemName])


    useEffect(() => {
        loadProduct()
    }, [])

    const saveOrUpdate = async () => {
        if(itemName)
            if(id ){
                updateProduct(categoryId,itemName,id)
            }else{
                const res = await addProduct(categoryId,itemName)
                res?._id && onChange(res._id, '_id')
            }
    }

    
    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={{justifyContent:'space-around',flex:1}}  >
                <View>
                    <Text>Product name:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder='enter product name'
                        value={itemName }
                        onChangeText={(value)=> onChange(value,'itemName')}
                    />
                </View>
                <View>
                    <Text style={{color:'black'}} >Select category:</Text>
                    
                    <Picker
                        style={{color:'black'}}
                        selectedValue={categoryId}
                        onValueChange={(itemValue) =>
                            onChange(itemValue,'categoryId')
                        }>
                        {!categoryId && itemName !== ''
                        ? <View style={{ 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center'
                                }}
                            >
                                <ActivityIndicator
                                    size={40}
                                    color={'black'}
                                />
                            </View>
                        :
                        categories.map(item => (
                            <Picker.Item label={item.nombre} value={item._id} key={item._id} />
                        ))
                        }
                    </Picker>
                </View>
                {
                    img.length>0 && (
                        <Image
                            source={{uri:img}}
                            style={{height:300,width:'100%'}}
                        />
                    )
                }
                {
                    tempImage.length>0 && (
                        <Image
                            source={{uri:tempImage}}
                            style={{height:300,width:'100%'}}
                        />
                    )
                }
                <Button
                    title='Save'
                    color='#5856D6'
                    onPress={saveOrUpdate}
                />
                {ImageButtons()}
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
        marginTop:3, 
        color:'black'
    }
});

export default SingleProductScreen
