import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import getIcon from '../../utils/getIcon'

export default function ClickableIcon({icon,iconStyle,resizeMode,onPress}) {
    return (
        <TouchableRipple onPress={onPress}>
            <Image source={icon||getIcon()} resizeMode={resizeMode||"contain"} style={[{height:scale(40),width:scale(40),},iconStyle]}/>
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({})