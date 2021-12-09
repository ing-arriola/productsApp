import React from 'react'
import {Provider} from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/Navigation/MainNavigator';
import { createStore } from 'redux';
import reducers from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const App = () => {
  const store=createStore(reducers,composeWithDevTools())
  return (
    <Provider store={store} >
      <NavigationContainer>
        <MainNavigator/>
      </NavigationContainer>
    </Provider>
  )
}

export default App
