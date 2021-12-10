import { Usuario } from '../interfaces/authInterface'

export interface AuthState {
    status : 'cheking' | 'authenticated' | 'not-authenticated';
    token:string | null;
    errorMessage : string;
    user:Usuario | null;
}

type AuthAction = 
    | { type:'signUp',payload: {token : string, user: Usuario}}
    | { type:'addError',payload:string}
    | { type: 'removeError' }
    | { type: 'notAuthenticated'}
    | { type: 'logout'}

export const authenticationReducer = (state: AuthState, action:AuthAction) : AuthState =>{
    switch (action.type) {
        case 'addError':
            return {
                ...state,
                errorMessage:action.payload,
                user:null,
                status:'not-authenticated',
                token:null

            }
        case 'removeError':
            return {
                ...state,
                errorMessage:''
            }
        case 'signUp':
            return{
                ...state,
                errorMessage:'',
                status:'authenticated',
                token:action.payload.token,
                user:action.payload.user
            }
        case 'logout':
        case 'notAuthenticated':
            return{
                ...state,
                user:null,
                token:null,
                status:'not-authenticated'
            }
        default:
            return state;
    }

}