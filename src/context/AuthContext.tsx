import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import productsApi from "../api/ProductsApi";
import { SinginResponse, Usuario, SignInData, RegisterData } from '../interfaces/authInterface';
import { authenticationReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage:string
    token:string | null
    user:Usuario | null
    status : 'cheking' | 'authenticated' | 'not-authenticated'
    signIn: (signInInfo: SignInData) => void
    signUp: (registerInfo: RegisterData) => void
    logOut: () => void
    removeError : () => void
}

const authInitialState : AuthState ={
    status:'cheking',
    token:null,
    user:null,
    errorMessage:''
}

export const AuthContext = createContext({} as AuthContextProps )

export const AuthProvider = ({ children }:any) => {
    const [state,dispatch] = useReducer(authenticationReducer,authInitialState)

    const getTokenFromStorage = async() =>{
        try {
            const res = await AsyncStorage.getItem('token')  
            if (!res) return dispatch({type:'notAuthenticated'})  
            const {data}= await productsApi.get('/auth')
            await AsyncStorage.setItem('token',data.token)
            dispatch({
                type:'signUp',
                payload:{
                    token:data.token,
                    user:data.usuario
                }
            })
        } catch (error) {
            dispatch({type:'notAuthenticated'})
        }
        
    }

    useEffect(() => {
        getTokenFromStorage()

        
    }, [])

    const signIn = async( {correo,password}:SignInData ) => {
        try {
            const {data} = await productsApi.post<SinginResponse>('/auth/login',{correo,password})
            dispatch({
                type:'signUp',
                payload:{
                    token:data.token,
                    user:data.usuario
                }
            })
            await AsyncStorage.setItem('token',data.token)
        } catch (error:any) {
            dispatch({
                type:'addError',
                payload:error.response.data.msg || 'Upps! We have a problem'
            })
        }
    } 
    const signUp = async( {nombre,correo,password}:RegisterData ) => {
        try {
            const {data} = await productsApi.post<SinginResponse>('/usuarios',{correo,password,nombre})
            dispatch({
                type:'signUp',
                payload:{
                    token:data.token,
                    user:data.usuario
                }
            })
            await AsyncStorage.setItem('token',data.token)
        } catch (error:any) {
            dispatch({
                type:'addError',
                payload:error.response.data.erros[0].msg || 'Upps! there was a problem'
            })
        }
    }
    const logOut = async() => {
        const res = await AsyncStorage.removeItem('token')
        dispatch({type:'logout'})
    }
    const removeError = () => { dispatch({type:'removeError'}) }
    return (
        <AuthContext.Provider value={{
            ...state,
            signIn,
            signUp,
            logOut,
            removeError
        }} >
            {children}
        </AuthContext.Provider>
    )
}