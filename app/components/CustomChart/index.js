import React from 'react';
import {View, Text, Pressable, Animated} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors,IDRAF_HIGELIGHT_COLORS,shadowLight} from '../../utils/appColors';
import {cleanString, getRandomColor, multipleyDecider, removeAllSpaces} from '../../utils/common';

export default function index({onPress,dataSet}) {
  let collapse = new Animated.Value(1);
   
  const RenderColumn = ({label, value, color, onPress}) => {
     
    return (
      <View style={{alignItems: 'center'}}>
        <Text>{value} </Text>
        <Animated.View
          style={{
            height: value * multipleyDecider(value),/* collapse.interpolate({
              inputRange: [0, 1],
              outputRange: [0, value * 2],
            }), */
            width: scale(  30 ),
            backgroundColor: color ? color :  IDRAF_HIGELIGHT_COLORS?.[removeAllSpaces( label?.toLowerCase())],
          }}>
          <Pressable onPress={() => onPress && onPress(label, value)} />
        </Animated.View>

        <Text>{label}</Text>
      </View>
    );
  }; 
  const sentiseData = ()=>{
    const data = dataSet?.map((item)=> {
      return {
        label :item?.caseStatus,
        value : item?.ocrCount
      }
    })
    return data
  }
  return (
    <View> 
      <View
        style={{
           
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
          backgroundColor:appColors.white,
          ...shadowLight,
          //maxHeight:scale(500),
          //overflow:'hidden'
        }}>
         {sentiseData()?.map((item,key)=>{
           return  <RenderColumn onPress={onPress} key={key} {...item} /* label='Cited Total' value={32} color={getRandomColor()} */ />
         })} 
      </View> 
    </View>
  );
}
