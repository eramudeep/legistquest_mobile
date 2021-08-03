import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import {  } from 'react-native-gesture-handler'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import Badge from '../Badge'
import StatusBadge from '../Badge/StatusBadge'

export default function CustomLabel({ text, labelStyle, color, onPress, otherStatus }) {
    const renderSvg = `https://www.legitquest.com${otherStatus}`
//    console.log(otherStatus,"<<<<renderSBG>>>>",otherStatus && renderSvg); 
    if (onPress) {

        return (
            <TouchableOpacity onPress={onPress}>
                <View style={{ flexDirection: "row",flexWrap:"wrap" }}>
                    <Text style={[styles.label, labelStyle, color && { color: color }]}>{`${text}`}</Text>
                    {otherStatus && 
                    <StatusBadge url={renderSvg}/>} 
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <Text style={[styles.label, labelStyle, color && { color: color }]}>{text}</Text>
    )
}

const styles = StyleSheet.create({
    label: {
        fontSize: scale(14),
        color: appColors.black,
        padding: scale(5),
        fontWeight: "500",
        letterSpacing: 0.8,
        // fontFamily:"Roboto-Regular"

    }
})
