import React from 'react'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import { AuthProvider } from './src/context/AuthContext';
import ProductsProvider from './src/context/ProductsContext';

const AppState =  ({ children } : {children : JSX.Element | JSX.Element[] })  => {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
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
