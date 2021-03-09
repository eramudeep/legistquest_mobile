import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters'
import { appColors } from '../../utils/appColors'
import CustomHeader from '../CustomHeader'
import CustomLabel from '../CustomLabel/CustomLabel'

export default function Container({ children,showFooter, isScrollable, bodyStyle,hideHeader ,showMenu,showBack,showHome,hideLogo,showSignin,onSignin}) {
    return (
        <View style={styles.container}>
                {!hideHeader &&
                <CustomHeader onSignin={onSignin} showMenu={showMenu} showHome={showHome} showBack={showBack} hideLogo={hideLogo} showSignin={showSignin}/>}
            {isScrollable ?
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"handled"}>
                    <View style={[styles.bodyStyle,bodyStyle]}>
                        {children}
                    </View>
                </ScrollView>
                : <View style={[styles.bodyStyle,bodyStyle]}>
                    {children}
                </View>}
                {showFooter && <CustomLabel text={"©2020 - LQ Global Services Private Limited. All rights reserved"} labelStyle={{fontSize:scale(8),textAlign:"center",marginBottom:scale(5)}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:appColors.white
    },
    bodyStyle:{
        padding:scale(20),
        flex:1
    }
})
