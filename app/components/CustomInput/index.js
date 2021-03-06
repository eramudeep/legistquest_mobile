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
    iconColor
 }) {
    return (
        <View style={[styles.container,containerStyle]}>
            <TextInput
                placeholder={placeholder || "placeholder"}
                onChangeText={onChangeText}
                keyboardType={keyboardType || "default"}
                style={styles.input}
                secureTextEntry={secureText}
                value={value}

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
        flexDirection: "row"
    },
    input: {
        fontSize: scale(14),
        flex: 1
    }
})
