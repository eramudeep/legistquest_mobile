import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import Icon from '../CustomIcon/Icon'
import CustomLabel from '../CustomLabel/CustomLabel'

export default function SearchResult({searchData,onPress,data,onJudges,onSearchCase}) {
    const {LinkText,HighlightedText,CourtName,DateOfJudgment,Judges,PartyName} =searchData
     
    return (
        <View style={{borderBottomWidth:scale(1),borderBottomColor:appColors.gray,paddingVertical:scale(10)}}>
            <CustomLabel onPress={()=>onPress && onPress(LinkText,HighlightedText?.replace(/<[^>]*>?/gm, ''))}  text={LinkText} labelStyle={styles.title}/>
            <CustomLabel text={`${CourtName} | ${DateOfJudgment}`} labelStyle={styles.subTitle}/>
            <CustomLabel text={HighlightedText?.replace(/<[^>]*>?/gm, '')} labelStyle={styles.bodyText}/>
            <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                <TouchableOpacity style={styles.footerBtn} onPress={  onSearchCase }>
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
