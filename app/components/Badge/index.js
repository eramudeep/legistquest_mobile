import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import CustomLabel from '../CustomLabel/CustomLabel'
import HTML from "react-native-render-html";
export default function Badge({renderHtml,  text}) {
    return (
        <TouchableRipple style={styles.badge}>

            {renderHtml ?  <HTML  source={{ html:text }}   />  :<CustomLabel text={text ? text : ""} labelStyle={styles.label}/>}
        </TouchableRipple>
    )
}

const styles = StyleSheet.create({
    badge:{
        backgroundColor:appColors.white,
        borderRadius:scale(20),
        paddingHorizontal:scale(10),
        borderWidth:scale(0.5),
        borderColor:appColors.gray,
        paddingVertical:scale(2),
        minWidth:scale(80),
        marginRight:scale(10),
        overflow:"hidden"
    },
    label:{
        color:appColors.grayDark,
        fontSize:scale(12),
        padding:0,
        textAlign:"center"
    }
})
