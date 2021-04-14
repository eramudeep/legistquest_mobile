import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
 import { appColors } from '../utils/appColors';
import Autocomplete from './AutoComplete';
//import useSelectedLang from '../../hooks/useSelectedLang';
//import { translateIt } from '../../utils/TranslationHelper';

export default function CustomAutoComplete({
    icon,
    InputStyle,
    placeholder,
    onChangeText,
    data,
    defaultValue,
    itemOnPress
}) {
    //console.log("data",data);
//const lang=useSelectedLang()
    return (
        <View style={[styles.container, styles.shadow, InputStyle, Platform.OS=="ios" && { zIndex:1000}]}>
          
            <Autocomplete
                autoCapitalize="none"  
                autoCorrect={false} 
                data={data}
                defaultValue={defaultValue}
                inputContainerStyle={styles.input}

                 //listContainerStyle={{paddingHorizontal:0,zIndex:100,}}
                 keyExtractor={item =>  Math.random().toString(36).substring(7)}
                listStyle={{borderWidth:0,paddingHorizontal:0, marginTop:scale(25)}}
                placeholder={ placeholder ? placeholder: "NONE"  }
                onChangeText={onChangeText}
                renderItem={({ item, i }) => { 
                    const {Value}=item
                   return (
                    <TouchableOpacity key={i} style={{padding: scale(7)}} onPress={()=>itemOnPress(item)}>
                        <Text>{Value}</Text> 
                    </TouchableOpacity>
                )}} />
                  { icon && <View style={styles.iconView}>
              
              <FontAwesome5Icon name={icon} color={appColors.secondary} size={scale(18)} />
          </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // height: scale(42),
        backgroundColor: appColors.white,
        borderRadius: scale(20),
        margin:scale(10), 
        paddingHorizontal: scale(20),
       

    },
    iconView: {
        height: scale(42),
        width: scale(42),
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
       // fontFamily: 'Roboto-Regular',
        //fontSize: scale(14),
        borderWidth:0,
        minWidth: '80%', 
         
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    rightButtonCont: {
        backgroundColor: appColors.primary,
        height: scale(42),
        minWidth: '30%',
        paddingHorizontal: scale(10),
        borderTopRightRadius: scale(20),
        borderBottomRightRadius: scale(20),
        right: -23,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
