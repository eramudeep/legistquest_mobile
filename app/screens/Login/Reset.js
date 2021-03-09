import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import CustomLabel from '../../components/CustomLabel/CustomLabel'
import { appColors } from '../../utils/appColors'

export default function Reset({navigation}) {
    return (
        <Container showFooter showHome showMenu>
            <CustomLabel text={"Reset Password"} labelStyle={styles.headerText} />
            <View>
                <CustomLabel text={"Email Address"} labelStyle={styles.label}/>
                <CustomInput placeholder={"Email"} keyboardType={"email-address"} containerStyle={styles.input}/>
               <CustomButton label={"Send Password Reset Link"}/>
               <View style={{flexDirection:"row",justifyContent:"center",}}>
               <CustomLabel text={"Login"} labelStyle={styles.labelLogin} onPress={()=>navigation.navigate("Login")}/>
               <CustomLabel text={"|"} labelStyle={styles.labelLogin}/>
               <CustomLabel text={"Register Now"} labelStyle={styles.labelLogin} onPress/>
               </View>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
input:{
    marginTop:0
},
label:{
    fontSize:scale(12)
},
headerText:{
    fontSize:scale(18),
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:scale(20)
},
labelLogin:{
    color:appColors.blue,
    fontWeight:"600",

}
})
