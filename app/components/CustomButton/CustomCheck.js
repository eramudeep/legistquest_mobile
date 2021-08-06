import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { appColors } from '../../utils/appColors'
export default function CustomCheck({checked}) {
    if(checked)
    return(
        <FontAwesome name={"check-square"} color={appColors.secondary} size={scale(20)}/>
    )
    return (
        <FontAwesome5 name={"square-full"} color={appColors.gray} size={scale(18)}/>
    )
}

const styles = StyleSheet.create({})
