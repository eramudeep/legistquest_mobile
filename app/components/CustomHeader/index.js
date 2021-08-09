import React,{useMemo} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { getUserLogout } from '../../redux/actions'
import { appColors, shadow } from '../../utils/appColors'
import CustomIcon from '../CustomIcon'
import ClickableIcon from '../CustomIcon/ClickableIcon'
import Icon from '../CustomIcon/Icon'
import CustomLabel from '../CustomLabel/CustomLabel'
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { AlertHelper } from '../../utils/AlertHelper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function CustomHeader({ showHome,signInLabel,showSearch, showMenu, showBack, onHome, onMenu ,hideLogo,showSignin,  userToken,userLogout$}) {
   
    const navigation = useNavigation();

    const onSignin =()=>{
        if(userToken) {
            userLogout$({usertoken:userToken,callback:()=>{
                AlertHelper.show("success", "Success", "You have been successfully logged out.")
            }})
           return navigation.navigate("Home")
        }else{
            return navigation.navigate("Login")
        }
        

    }
    return (
        <View style={styles.header}>
            <View style={styles.icon}>
                {showHome && <Icon name={"home"} onPress={onHome} color={appColors.blue} size={scale(20)}/>}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                {!hideLogo &&
                <CustomIcon iconStyle={{ width: scale(130), }} />}
            </View>
            <View style={styles.icon}>
                {showSearch && <TouchableRipple onPress={()=>navigation.navigate("SearchBox")} style={styles.iconS}>
                    <Icon name={"search"}  size={scale(20)} color={appColors.blue}/>
                    </TouchableRipple>}
            </View>
            {showSignin&&<View style={{marginRight:scale(10)}}>
                    <MaterialIcons name={userToken ?"logout" : "login"} size={scale(28)} color={appColors.blue}/>
                {/* <CustomLabel onPress={onSignin} text={userToken ?"Logout" : "Login" } labelStyle={{color:appColors.blue,fontWeight:"600"}}/> */}
            </View>}
            
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
        // ...shadow,
        // backgroundColor:appColors.white,
        // borderRadius:scale(20),overflow:"hidden"
    },
})
//export default React.memo(CustomHeader)



const mapStateToProps = (state) => ({ 
    userToken: state.auth.userData?.data?.userToken
  });
  const mapDispatchToProps = { 
    userLogout$: getUserLogout
  };
  export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
  