import React from 'react'
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal';
import { appColors } from '../../utils/appColors';

export default function LoadingModal({visible}) {
    return (
        <View >
      <Modal isVisible={visible} style={{margin:0}}>
          <View style={{backgroundColor:appColors.white,flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large" color={appColors.secondary} />
          </View>
     
      </Modal>
    </View>
    )
}

const styles = StyleSheet.create({})
