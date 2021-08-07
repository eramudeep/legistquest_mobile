import React,{useMemo} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors, shadow } from '../../utils/appColors'
import CustomIcon from '../CustomIcon'
import ClickableIcon from '../CustomIcon/ClickableIcon'
import Icon from '../CustomIcon/Icon'
import CustomLabel from '../CustomLabel/CustomLabel'

function CustomHeader({ showHome,signInLabel, showMenu, showBack, onHome, onMenu ,hideLogo,showSignin,onSignin}) {
   //console.log("digning",signInLabel);
    return (
        <View style={styles.header}>
            <View style={styles.icon}>
                {showHome && <Icon name={"home"} onPress={onHome} size={scale(20)}/>}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                {!hideLogo &&
                <CustomIcon iconStyle={{ width: scale(130), }} />}
            </View>
            {showSignin&&<View style={{marginRight:scale(10)}}>
                <CustomLabel onPress={onSignin} text={signInLabel} labelStyle={{color:appColors.blue,fontWeight:"600"}}/>
            </View>}
            {/* <View style={styles.icon}>
                {showMenu && <TouchableRipple onPress={onMenu} style={styles.iconS}>
                    <Icon name={"ellipsis-v"}  size={scale(20)}/>
                    </TouchableRipple>}
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        height: scale(60),
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(10),
        ...shadow,
        backgroundColor: appColors.white
    },
    icon: {
        // backgroundColor: "red",
        height: scale(40),
        width: scale(40),
        alignItems:"center",
        justifyContent:"center"
    },
    iconS: {
        // backgroundColor: "red",
        height: scale(40),
        width: scale(40),
        alignItems:"center",
        justifyContent:"center",
        ...shadow,
        backgroundColor:appColors.white,
        borderRadius:scale(20),overflow:"hidden"
    },
})
export default React.memo(CustomHeader)
