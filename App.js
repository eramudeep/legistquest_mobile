/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import MainStack from './app/routing/MainStack';
import { Provider } from "react-redux"
import { SafeAreaView, StatusBar } from 'react-native'
import  Reduxstore  from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './app/utils/AlertHelper';
import { PersistGate } from 'redux-persist/integration/react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const {store,persistor}=Reduxstore()
const App: () => React$Node = () => { 
  return (
    <SafeAreaView style={{flex:1,}}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MainStack/>
      <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </PersistGate>
</Provider>
     {/*  <Provider store={store}>
      <MainStack/>
      <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
    </Provider> */}
    </SafeAreaView>
  )

};


export default App;
