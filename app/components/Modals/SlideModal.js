import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
import Icon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import Filters from '../Filters';

export default function SlideModal({filterCourt,visible, onClose}) {
  console.log({filterCourt});
  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isVisible={visible}
      onSwipeStart={() => console.log('swipe start')}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      swipeDirection={[ 'left']}
      style={{margin: 0, marginRight: scale(40)}}>
      <View style={{flex: 1, backgroundColor: appColors.white}}>
         
          <View style={{margin:scale(10), marginTop:scale(50)}}> 
          <View style={styles.row}>
             <View style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="filter"  size={scale(18)}/>
                <CustomLabel text={"SEARCH FILTER"} />
             </View>
             <Pressable style={{flexDirection:'row', alignItems:'center'}}>
                <Icon name="undo"  size={scale(12) } color={appColors.blue}/>
                <CustomLabel text={"Clear"} labelStyle={{color:appColors.blue}}/>
             </Pressable>
          </View>
          <CustomInput
            containerStyle={{marginTop: 0, backgroundColor:appColors.lighterGray}}
            placeholder={'Filter within result...'}
            rightIcon={'times-circle'}
            iconSize={scale(17)}
            iconColor={appColors.blue}
            leftIcon="search"
          /> 
          <Filters  Court={filterCourt} />
          </View>
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row:{borderBottomWidth:scale(0.5), marginBottom: scale(10), height:scale(40), flexDirection:'row', justifyContent:'space-between'}
});
