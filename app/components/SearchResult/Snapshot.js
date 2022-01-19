import { View, Text } from 'react-native';
import React from 'react';
import CustomLabel from '../CustomLabel/CustomLabel';
import CustomIcon from '../CustomIcon/Icon';
import { appColors } from '../../utils/appColors';
import { scale } from 'react-native-size-matters';

export default function Snapshot({text}) {
  return (
    <View>
         
         <View style={{flexDirection:'row',   alignItems:'center'}}>
            <CustomIcon name={'camera'} size={scale(20)}  color={appColors.black}  />
            <CustomLabel text={"Snapshot"} />
        </View>
         
       <CustomLabel text={text} />
    </View>
  );
}
