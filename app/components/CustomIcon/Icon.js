import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import TouchableRipple from 'react-native-touch-ripple'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { appColors } from '../../utils/appColors'

export default function Icon({name,size,color,onPress}) {
    if(onPress){
        return(
            <TouchableRipple onPress={onPress}>
                <FontAwesome5 name={name} size={size||40} color={color||appColors.black}/>
            </TouchableRipple>
        )
    }
    return (
        <FontAwesome5 name={name} size={size||40} color={color||appColors.black}/>
    )
}

const styles = StyleSheet.create({})
