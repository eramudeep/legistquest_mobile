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
import { SafeAreaView, StatusBar, View } from 'react-native'
import  Reduxstore  from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './app/utils/AlertHelper';
import { PersistGate } from 'redux-persist/integration/react'
import ScrollableTabView,{ScrollableTabBar } from './app/components/ScrollableTabView'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Details from './app/screens/Details';
import ChartWebview from './app/components/Highcharts/index';
const {store,persistor}=Reduxstore()
const App: () => React$Node = () => { 
   
// return<ChartWebview/>
  return (
    <SafeAreaView style={{flex:1,}}>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <MainStack/>
      <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row',zIndex:100 }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </PersistGate>
</Provider>
     
    </SafeAreaView>
  )

};


export default App;
