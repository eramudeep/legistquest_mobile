import React from 'react'
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
// import {  } from 'react-native-gesture-handler'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'

export default function CustomLabel({text,labelStyle,color,onPress}) {
    if(onPress){
        return(
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.label,labelStyle,color&&{color:color}]}>{text}</Text>
            </TouchableOpacity>
        )
    }
    return(
        <Text style={[styles.label,labelStyle,color&&{color:color}]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    label:{
        fontSize:scale(14),
        color:appColors.black,
        padding:scale(5),
        fontWeight:"500",
        letterSpacing:0.8,
        // fontFamily:"Roboto-Regular"

    }
})
