import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Splash from '../screens/Splash';
import Login from '../screens/Login/Login';
import Reset from '../screens/Login/Reset';
import Topic from '../screens/Topic';
import TopicDetail from '../screens/Topic/TopicDetail';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
      <NavigationContainer>
    <Stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown:false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Reset" component={Reset} />
      <Stack.Screen name="Topic" component={Topic} />
      <Stack.Screen name="TopicDetail" component={TopicDetail} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}