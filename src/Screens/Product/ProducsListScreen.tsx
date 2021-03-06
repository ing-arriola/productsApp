import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList, RefreshControl } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductContext } from '../../context/ProductsContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../../Navigation/ProductsNavigation';

interface Props extends StackScreenProps<ProductsStackParams, 'ProducsListScreen'>{}

const ProducsListScreen = ({navigation}:Props) => {
    const [isRefreshing, setisRefreshing] = useState(false)
    const {loadProducts,products} = useContext(ProductContext)
    
    useEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={{marginRight:10}}
                    onPress={()=> navigation.navigate('SingleProductScreen',{name:'New Product'})}
                >
                    <Text style={{color:'black'}} >Add product</Text>
                </TouchableOpacity>
            )
        })
    }, [])

    const refreshData = async () => {
        setisRefreshing(true)
        await loadProducts()
        setisRefreshing(false)
    }

    return (
        <View style={{flex:1, marginHorizontal:10}} >
            <FlatList
                data={products}
                keyExtractor={(p)=>p._id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('SingleProductScreen',{id:item._id,name:item.nombre}) }
                    >
                        <Text style={{color:'black'}} >{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={()=>
                    <View style={{borderBottomColor:'#5856D6',borderBottomWidth:1}}/>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={refreshData}   
                    />
                }
            />
        </View>
    )
}

export default ProducsListScreen
