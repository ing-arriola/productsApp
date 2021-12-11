import React, { useContext } from 'react'
import { View, Text, StyleSheet ,Button} from 'react-native'
import { AuthContext } from '../context/AuthContext'


const ProtectedScreen = () => {

    const {user,token,logOut} = useContext(AuthContext)

    return (
        <View style={styles.container} >
            <Text style={styles.title} >ProtectedScreen</Text>
            <Button
                title='Logout'
                color='#5856D6'
                onPress={logOut}
            />
            <Text>
                {JSON.stringify(user)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        justifyContent:'center'
    },
    title:{
        fontSize:20,
        marginBottom:20
    }
});

export default ProtectedScreen
