import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchRipple from 'react-native-touch-ripple'
import { appColors, shadow } from '../../utils/appColors'
import CustomLabel from '../CustomLabel/CustomLabel'

export default function CustomButton({label,onPress,buttonStyle,labelStyle,textColor,buttonColor}) {
    return (
        <TouchRipple onPress={onPress} rippleDuration={800} rippleColor={appColors.white} style={[styles.button,buttonStyle,buttonColor&&{backgroundColor:buttonColor}]}>
                <CustomLabel text={label} labelStyle={labelStyle} color={textColor||appColors.white}/>
        </TouchRipple>
    )
}

const styles = StyleSheet.create({
    button:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:appColors.secondary,
        borderRadius:scale(5),
        height:scale(45),
        marginVertical:scale(10),
        ...shadow
    }
})
