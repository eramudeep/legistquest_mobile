import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import CustomLabel from '../CustomLabel/CustomLabel'
import HTML from "react-native-render-html";
import SvgUri from 'react-native-svg-uri';
export default function StatusBadge({url,  text,labelStyle}) {
    return (
        <View style={styles.badge}>
        <SvgUri
          width="80"
          // height="30"
          source={{uri:url}}
        />
      </View>
    )
}

const styles = StyleSheet.create({
    badge:{
        backgroundColor:appColors.white,
        paddingHorizontal:scale(0),
        paddingVertical:scale(0),
        overflow:"hidden"
    },
})
