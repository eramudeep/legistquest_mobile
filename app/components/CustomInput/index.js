import React from 'react'
import { StyleSheet, Text, TextInput, View ,TouchableOpacity} from 'react-native'
import { scale } from 'react-native-size-matters'
import TouchableRipple from 'react-native-touch-ripple'
import { appColors } from '../../utils/appColors'
import ClickableIcon from '../CustomIcon/ClickableIcon'
import Icon from '../CustomIcon/Icon'

export default function CustomInput({
     placeholder,
      onChangeText,
       keyboardType,
        rightIcon,
         onRightIcon,
        secureText,
        containerStyle,
    value,
    iconSize,
    iconColor,
    leftIcon,
    leftIconColor,
    defaultValue,
    onFocus,onBlur,autoFocus
 }) {
    return (
        <View style={[styles.container,containerStyle]}>
           
           {
                leftIcon &&
                <TouchableOpacity style={{ marginLeft: scale(5),justifyContent:"center",width:scale(30),alignItems:"center"  }} onPress={onRightIcon}>
                    <Icon name={leftIcon} size={iconSize} color={leftIconColor}  />
                </TouchableOpacity>
            }

            <TextInput
                placeholder={placeholder || "placeholder"}
                onChangeText={onChangeText}
                keyboardType={keyboardType || "default"}
                style={styles.input}
                secureTextEntry={secureText}
                value={value}
                defaultValue={defaultValue}
                onBlur={onBlur}
                onFocus={onFocus}
                autoFocus={autoFocus}

            />
            {
                rightIcon &&
                <TouchableOpacity style={{ marginLeft: scale(5),justifyContent:"center",width:scale(30),alignItems:"center"  }} onPress={onRightIcon}>
                    <Icon name={rightIcon} size={iconSize} color={iconColor}  />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: appColors.white,
        paddingHorizontal: scale(10),
        borderRadius: scale(5),
        borderColor: appColors.gray,
        borderWidth: scale(0.6),
        marginVertical: scale(10),
        flexDirection: "row",
        height: scale(40)
    },
    input: {
        fontSize: scale(14),
        flex: 1
    }
})
