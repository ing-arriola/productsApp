import React from 'react'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import { AuthProvider } from './src/context/AuthContext';

const AppState =  ({ children } : {children : JSX.Element | JSX.Element[] })  => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )

}

const App = () => {
  return (
      <NavigationContainer>
        <AppState>
          <MainNavigator/> 
        </AppState>
      </NavigationContainer>
  )
}

export default App
