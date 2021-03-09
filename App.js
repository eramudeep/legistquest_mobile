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
import store from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import { AlertHelper } from './app/utils/AlertHelper';
import { appColors } from './app/utils/appColors';
const App: () => React$Node = () => {
  return (
    <SafeAreaView style={{flex:1,}}>
      <Provider store={store}>
      <MainStack/>
      <DropdownAlert
          defaultContainer={{ padding: 8, paddingTop: StatusBar.currentHeight, flexDirection: 'row' }}
          ref={ref => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
    </Provider>
    </SafeAreaView>
  )

};


export default App;
