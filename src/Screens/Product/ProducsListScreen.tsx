import React, { useContext } from 'react'
import { View, Text, FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProductContext } from '../../context/ProductsContext';
const ProducsListScreen = () => {

    const {loadProducts,products} = useContext(ProductContext)
    

    return (
        <View style={{flex:1, marginHorizontal:10}} >
            <FlatList
                data={products}
                keyExtractor={(p)=>p._id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.7}
                    >
                        <Text>{item.nombre}</Text>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={()=>
                    <View style={{borderBottomColor:'#5856D6',borderBottomWidth:1}}/>
                }
            />
        </View>
    )
}

export default ProducsListScreen
