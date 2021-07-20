import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
import CustomInput from '../CustomInput';
import Filters from '../Filters';
export default function SlideModal({visible, onClose}) {
  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isVisible={visible}
      onSwipeStart={() => console.log('swipe start')}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      swipeDirection={['up', 'left', 'right', 'down']}
      style={{margin: 0, marginRight: scale(40)}}>
      <View style={{flex: 1, backgroundColor: appColors.white}}>
         
          <Text onPress={onClose}>I am the modal content!</Text>
          <CustomInput
            containerStyle={{marginTop: 0}}
            placeholder={'Search Free Text...'}
            rightIcon={'search'}
            iconSize={scale(20)}
          />
          <Filters />
        
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
