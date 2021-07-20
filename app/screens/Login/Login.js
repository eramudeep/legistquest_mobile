import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import CustomIcon from '../../components/CustomIcon'
import CustomInput from '../../components/CustomInput'
import CustomLabel from '../../components/CustomLabel/CustomLabel'
import { appColors, shadow } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'

export default function Login({ navigation }) {
    return (
        <Container showFooter showHome showMenu onHome={()=>navigation.navigate("Home")} >
            <CustomLabel text={"Login to your account"} labelStyle={styles.headerText} />
            <View style={{flex:1}}>
                <CustomLabel text={"Email Address"} labelStyle={styles.label} />
                <CustomInput placeholder={"Email"} keyboardType={"email-address"} containerStyle={styles.input} />
                <CustomLabel text={"Password"} labelStyle={styles.label} />
                <CustomInput placeholder={"Password"} secureText containerStyle={styles.input} />
               <View style={[styles.rowedView,{justifyContent:"space-between",}]}>
               <View style={styles.rowedView}>
                   <CustomIcon/>
               <CustomLabel text={"Keep me signed in"}  labelStyle={styles.label}/>
               </View>
               <CustomLabel text={"Forgot Password?"}  labelStyle={[styles.label,{color:appColors.blue}]} onPress={()=>navigation.navigate("Reset")}/>
               </View>
                <CustomButton label={"Take me in!"} />
                <CustomLabel text={"Or Login with:"} labelStyle={styles.labelOr} />
                <TouchableRipple rippleDuration={800} rippleColor={appColors.secondary} style={[styles.button,]}>
                    <CustomIcon icon={getIcon("google")} iconStyle={{height:scale(20),width:scale(20)}}/>
                    <CustomLabel text={"Google"}/>
                </TouchableRipple>
            </View>
            <View style={[styles.rowedView,{justifyContent:"center"}]}>
            <CustomLabel text="Need a Legitquest account?" labelStyle={styles.label}/>
            <CustomLabel text="Create an account" labelStyle={[styles.label,{color:appColors.blue}]} onPress/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 0
    },
    label: {
        fontSize: scale(12)
    },
    labelOr: {
        fontSize: scale(10),
        textAlign: "center",
        marginTop: scale(20)
    },
    rowedView:{
        flexDirection:"row",
        alignItems:"center",
        flexWrap:"wrap"
},
    headerText:{
        fontSize:scale(18),
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:scale(20)
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appColors.white,
        borderRadius: scale(5),
        borderWidth: scale(1),
        borderColor: appColors.gray,
        height: scale(45),
        marginVertical: scale(10),
        flexDirection:"row",
        // ...shadow
    }
})
