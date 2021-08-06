import React from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import {getRandomColor} from '../../utils/common';

export default function index() {
  let collapse = new Animated.Value(1);
   
  const _renderColumn = (label, value, color, onPress) => {
     
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{value} </Text>
        <Animated.View
          style={{
            height: value * 2,/* collapse.interpolate({
              inputRange: [0, 1],
              outputRange: [0, value * 2],
            }), */
            width: scale(40),
            backgroundColor: color ? color : getRandomColor(),
          }}>
          <Pressable onPress={() => onPress && onPress(label, value)} />
        </Animated.View>

        <Text>{label}</Text>
      </View>
    );
  };
  return (
    <View>
      {/*  <ImageBackground
        style={{width: '100%', height: 200, alignItems: 'center', justifyContent:'flex-end' }}
        source={{
          uri: 'https://i.stack.imgur.com/0JD7P.png',
        }}> */}
      <View
        style={{
          //backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}>
        {_renderColumn('Cited Total', 32, getRandomColor())}
        {_renderColumn('Cited Total', 42)}
        {_renderColumn('Cited Total', 34, getRandomColor())}
        {_renderColumn('Cited Total', 13)}
      </View>
      {/* </ImageBackground> */}
    </View>
  );
}
