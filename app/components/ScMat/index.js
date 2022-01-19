import {View, Text, FlatList} from 'react-native';
import React from 'react';
import Badge from '../Badge';
import {secMaterialList} from '../../utils/appConstants';
import { scale } from 'react-native-size-matters';
import ReduxWrapper from '../../redux/ReduxWrapper';
import { appColors } from '../../utils/appColors';

function index({toggleScMat$,scMat:{scMatActive}}) {
    
   const onPress= (value)=> { 
       toggleScMat$(value) 
   } 
  const renderItem = ({item, index}) => { 
    const {label,value} = item;
    return <Badge onPress={()=> onPress(value)} labelStyle={{color: scMatActive==value ? appColors.white :  appColors.black }} text={label} key={index} badgeStyle={{backgroundColor:scMatActive==value ? appColors.blue :  appColors.white }}  />;
  };
  return (
    <View style={{ paddingVertical:scale(5) }}>
      <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal data={secMaterialList} renderItem={renderItem} />
    </View>
  );
}

export default  ReduxWrapper(index)