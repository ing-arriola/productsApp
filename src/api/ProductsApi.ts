import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL= 'http://192.168.0.7:8080/api'

const productsApi = axios.create({baseURL})

productsApi.interceptors.request.use(
    async(config:any) => {
        const token = await AsyncStorage.getItem('token')
        if(token){
            config.headers['x-token'] = token
        }
        return config
    }
)

export default productsApi