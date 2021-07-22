import React from 'react'
import { View, Pressable,StyleSheet ,Image} from 'react-native'
import CustomLabel from '../CustomLabel/CustomLabel'
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { appColors } from '../../utils/appColors';
import { scale } from 'react-native-size-matters';
const idraf ="https://www.legitquest.com/lq/idraf-icon.png"
export default function RButton({item,getName,_isSelected,toggleSelecttion,getCaseCount,IsHaveSegregation}) {
    return (
        <Pressable
          onPress={
            () => toggleSelecttion&&toggleSelecttion(item) /* setSelected(getName(item)) */
          }
          style={styles.row}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={
                _isSelected&& _isSelected(getName&&getName(item))
                  ? [styles.radioContChecked]
                  : [styles.radioContUnChecked]
              }
            />
            <CustomLabel text={getName&&getName(item)}  labelStyle={{fontSize:scale(13)}}/>
          </View>
          {/*can be used to show iDraf*/}
           
         { IsHaveSegregation&& <Image  style={{height:20, width:scale(40)}} source={{uri:idraf}} />}
          <CustomLabel text={getCaseCount&&getCaseCount(item)} />
        </Pressable>
    )
}



const styles = StyleSheet.create({
    radioContUnChecked: {
      borderWidth: scale(3),
      borderColor: appColors.blue,
      backgroundColor: appColors.white,
      height: scale(22),
      width: scale(22),
      borderRadius: scale(15),
      marginRight: scale(10),
      alignItems: 'center',
    },
    radioContChecked: {
      borderWidth: scale(8),
      borderColor: appColors.blue,
      backgroundColor: appColors.white,
      height: scale(22),
      width: scale(22),
      borderRadius: scale(15),
      marginRight: scale(10),
      alignItems: 'center',
    },
    row: {
      padding: scale(7),
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      //backgroundColor:'red'
    },
  });
  