import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import { scale } from 'react-native-size-matters'
import getIcon from '../../utils/getIcon'

export default function CustomIcon({icon,iconStyle,resizeMode}) {
    return (
        <Image source={icon||getIcon()} resizeMode={resizeMode||"contain"} style={[{height:scale(40),width:scale(40),},iconStyle]}/>
    )
}

const styles = StyleSheet.create({})