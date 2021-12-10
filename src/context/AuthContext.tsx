import React, { createContext, useReducer } from "react";
import productsApi from "../api/ProductsApi";
import { SinginResponse, Usuario, SignInData } from '../interfaces/authInterface';
import { authenticationReducer, AuthState } from './authReducer';

type AuthContextProps = {
    errorMessage:string
    token:string | null
    user:Usuario | null
    status : 'cheking' | 'authenticated' | 'not-authenticated'
    signIn: (signInInfo: SignInData) => void
    signUp: () => void
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
        } catch (error) {
            console.log(error)
        }
    } 
    const signUp = () => {}
    const logOut = () => {}
    const removeError = () => {}

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