import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { connect } from 'react-redux'
import Container from '../../components/Container'
import CustomButton from '../../components/CustomButton'
import CustomIcon from '../../components/CustomIcon'
import CustomInput from '../../components/CustomInput'
import CustomLabel from '../../components/CustomLabel/CustomLabel'
import { getUserLogin } from '../../redux/actions'
import { AlertHelper } from '../../utils/AlertHelper'
import { appColors, shadow } from '../../utils/appColors'
import getIcon from '../../utils/getIcon'

const swtich = ["Individual", "Corporate"]
function Login({ navigation,userLogin$ }) { 
    const [selected, setSelected] = useState(0)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [customerCode, setcustomerCode] = useState()
    const onLogin=async()=>{
       if(!customerCode && selected==1)return AlertHelper.show("error","Error","Please enter Customer Code")
       if(!email)return AlertHelper.show("error","Error","Please enter Email")
       if(!password)return AlertHelper.show("error","Error","Please enter Password")
        const res=await userLogin$({email,password,customerCode,callback})

        console.log("===============",res);
    }
    const callback=(respo)=>{
        console.log("log",respo);
       if(respo.status==true){ 
           AlertHelper.show("success","Success","Login Successfull")
           navigation.navigate("Home")
        }
        else{
            AlertHelper.show("error","Error","Login failed. Please try againg later")
        }
    }
    const clearState=()=>{
        setEmail("")
        setPassword("")
        setcustomerCode("")
    }
    return (
        <Container isScrollable showFooter showHome showMenu onHome={() => navigation.navigate("Home")} >
            <CustomLabel text={"Login to your account"} labelStyle={styles.headerText} />
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row" }}>
                    {swtich.map((val, key) => {
                        return (
                            <Pressable key={key} onPress={() => {setSelected(key);clearState()}} style={[styles.btnSwitch, key != selected && { backgroundColor: appColors.white }]}>
                                <CustomLabel text={val} labelStyle={[styles.labelSwtich, key != selected && { color: appColors.black }]} />
                            </Pressable>
                        )
                    })}
                </View>
                {selected == 1 && <CustomLabel text={"Company Code"} labelStyle={styles.label} />}
                {selected == 1 && <CustomInput placeholder={"Company Code"} value={customerCode} onChangeText={val=>{setcustomerCode(val)}} containerStyle={styles.input} />}
                <CustomLabel text={"Email Address"}  labelStyle={styles.label} />
                <CustomInput placeholder={"Email"} value={email} onChangeText={val=>setEmail(val)} keyboardType={"email-address"} containerStyle={styles.input} />
                <CustomLabel text={"Password"} labelStyle={styles.label} />
                <CustomInput placeholder={"Password"} value={password} onChangeText={val=>setPassword(val)} secureText containerStyle={styles.input} />
                <View style={[styles.rowedView, { justifyContent: "flex-end", }]}>
                    {/* <View style={styles.rowedView}>
                        <CustomIcon />
                        <CustomLabel text={"Keep me signed in"} labelStyle={styles.label} />
                    </View> */}
                    <CustomLabel text={"Forgot Password?"} labelStyle={[styles.label, { color: appColors.blue }]} onPress={() => navigation.navigate("Reset")} />
                </View>
                <CustomButton onPress={onLogin} label={"Take me in!"} />
                {/* <CustomLabel text={"Or Login with:"} labelStyle={styles.labelOr} /> */}
                {/* <TouchableRipple rippleDuration={800} rippleColor={appColors.secondary} style={[styles.button,]}>
                    <CustomIcon icon={getIcon("google")} iconStyle={{ height: scale(20), width: scale(20) }} />
                    <CustomLabel text={"Google"} />
                </TouchableRipple> */}
            </View>
            {/* <View style={[styles.rowedView, { justifyContent: "center" }]}>
                <CustomLabel text="Need a Legitquest account?" labelStyle={styles.label} />
                <CustomLabel text="Create an account" labelStyle={[styles.label, { color: appColors.blue }]} onPress />
            </View> */}
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
    rowedView: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap"
    },
    headerText: {
        fontSize: scale(18),
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: scale(20)
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
        flexDirection: "row",
        // ...shadow
    },
    labelSwtich: {
        fontSize: scale(14),
        color: appColors.white,
        fontWeight: "bold"
    },
    btnSwitch: {
        height: scale(40),
        backgroundColor: appColors.secondary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(5),
        paddingHorizontal: scale(10),
        borderWidth: scale(1),
        borderColor: appColors.secondary
    }
})
const mapStateToProps = (state) => ({

  });
  const mapDispatchToProps = {
    userLogin$: getUserLogin,
  };
  export default connect(mapStateToProps, mapDispatchToProps)(Login);