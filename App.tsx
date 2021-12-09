import React from 'react'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import { createStore } from 'redux';
import reducers from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthProvider } from './src/context/AuthContext';

const AppState =  ({ children } : {children : JSX.Element | JSX.Element[] })  => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )

}

const App = () => {
  const store=createStore(reducers,composeWithDevTools())
  return (
      <NavigationContainer>
        <AppState>
          <MainNavigator/> 
        </AppState>
      </NavigationContainer>
}

export default App
