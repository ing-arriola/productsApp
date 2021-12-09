import React, { createContext } from "react";
import { Usuario } from '../interfaces/authInterface';

type AuthContextProps = {
    errorMessage:string
    token:string | null
    user:Usuario | null
    status : 'cheking' | 'authenticated' | 'not-authenticated'
    signUp: () => void 
    signIn: () => void
    logOut: () => void
    removeError : () => void
}

export const AuthContext = createContext({} as AuthContextProps )

export const AuthProvider = ({ children }:any) => {
    return (
        <AuthContext.Provider value={{
            
        }} >
            {children}
        </AuthContext.Provider>
    )
}