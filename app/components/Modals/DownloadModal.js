import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
import CustomLabel from '../CustomLabel/CustomLabel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomCheck from '../CustomButton/CustomCheck';
import RNPickerSelect from 'react-native-picker-select';
import { fontSizes } from '../../utils/MockData';
export default function DownloadModal({
    visible,
    onClose,
    onChangePicker,
    pickerValue,
    onDownload

}) {
    return (
        <View >
            <Modal isVisible={visible}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={{ justifyContent: "center", backgroundColor: appColors.white }}>
                        <View style={styles.header}>
                            <CustomLabel text={"Download Judgment"} labelStyle={{ fontWeight: "bold", fontSize: scale(16) }} />
                            <Pressable onPress={onClose}>
                                <FontAwesome5 name={"times"} color={appColors.gray} size={scale(16)} />
                            </Pressable>
                        </View>
                        <View style={{ flexDirection: "row",marginVertical:scale(20),marginHorizontal:scale(5) }}>
                            <CustomLabel text="Select font size of your choice" labelStyle={{fontSize:scale(12)}} />
                            <View style={{ borderRadius: scale(5), borderColor: appColors.blue, flex: 1, borderWidth: scale(1),height:scale(30),justifyContent:"center" }}>
                                <RNPickerSelect
                                    style={{ viewContainer: { justifyContent: 'center' }, inputIOS: { fontSize: scale(14), color: appColors.blue } }}
                                    onValueChange={(value) => {
                                        onChangePicker(value);
                                        console.log("", value);
                                    }}
                                    // placeholder={{value:'',label:"Select Font Size"}}
                                    items={fontSizes}
                                    value={pickerValue}

                                    fixAndroidTouchableBug
                                />
                            </View>
                        </View>
                        <View style={{ marginBottom: scale(20), paddingHorizontal: scale(20) }}>
                            <Pressable style={styles.btn} onPress={onDownload}>
                                <Text style={styles.txtBtn}>
                                    Download
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: scale(60),
        backgroundColor: appColors.lighterGray,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: scale(20), justifyContent: "space-between"
    },
    fdRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    btn: {
        backgroundColor: appColors.secondary,
        borderRadius: scale(5),
        justifyContent: "center",
        alignItems: "center",
        height: scale(40),
        paddingHorizontal: scale(20)
    },
    txtBtn: {
        color: appColors.white,
        fontWeight: "bold"
    }
})
