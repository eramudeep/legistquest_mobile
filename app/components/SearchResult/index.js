import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import Icon from '../CustomIcon/Icon'
import CustomLabel from '../CustomLabel/CustomLabel'

export default function SearchResult({onPress,data,onJudges,onSearchCase}) {
    return (
        <View style={{borderBottomWidth:scale(1),borderBottomColor:appColors.gray,paddingVertical:scale(10)}}>
            <CustomLabel onPress={onPress}  text={"Supreme Court Bar Association V. Union Of India"} labelStyle={styles.title}/>
            <CustomLabel text={"Supreme Court Of India | 17-04-1998"} labelStyle={styles.subTitle}/>
            <CustomLabel text={`Judgment : declare that the Supreme Court of India or any High Court in exercise of its inherent jurisdiction. Supreme Court of India can while dealing with Contempt Proceedings exercise power under Article 129. counsel appearing for the Supreme Court Bar Association, and Dr. Rajiv Dhawan, senior advocate appearing. Constitution, it reads: " 129. Supreme Court to be a court of record.- The Supreme Court shall be a court of record and shall have all the power of such a court including.`} labelStyle={styles.bodyText}/>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <TouchableOpacity style={styles.footerBtn} onPress={onSearchCase}>
                    <Icon name={"search"} size={scale(14)} color={appColors.blue}/>
                    <CustomLabel text={"Search Within Case"} color={appColors.blue} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerBtn} onPress={onJudges}>
                    <Icon name={"user-tie"} size={scale(14)} color={appColors.blue}/>
                    <CustomLabel text={"Judges"} color={appColors.blue} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontWeight:"700",
        color:appColors.blue,
        paddingBottom:0
    },
    subTitle:{
        fontWeight:"600",
        color:appColors.green,paddingTop:0
    },
    bodyText:{

    },
    footerBtn:{
        flexDirection:"row",
        alignItems:"center"
    },
})
