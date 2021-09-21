import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator, Pressable, TextInput, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { scale } from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
import CustomLabel from '../CustomLabel/CustomLabel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import CustomCheck from '../CustomButton/CustomCheck';

export default function ReportModal({
    visible,
    onClose,
    isSelectAll,
    onSelectAll,
    onContent,
    onSegergation,
    onJudge,
    onCourt,
    onCitation,
    onOthers,
    isContent,
    isSegregation,
    isJudge,
    isCourt,
    isCitation,
    isOthers,
    onchangeDisc
}) {
    return (
        <View >
            <Modal isVisible={visible}>
                <View style={{ backgroundColor: appColors.white, flex: 1, }}>
                    <View style={styles.header}>
                        <CustomLabel text={"Report a problem"} labelStyle={{ fontWeight: "bold", fontSize: scale(16) }} />
                        <Pressable onPress={onClose}>
                            <FontAwesome5 name={"times"} color={appColors.gray} size={scale(16)} />
                        </Pressable>
                    </View>
                    <ScrollView>
                        <View style={{ paddingHorizontal: scale(20), marginVertical: scale(20) }}>
                            <Pressable onPress={onSelectAll} style={[styles.fdRow, { marginBottom: scale(20) }]}>
                                <CustomCheck checked={isSelectAll} />
                                <CustomLabel text={"Select all type"} />
                            </Pressable>
                            <Pressable onPress={onContent} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isContent} />
                                <CustomLabel text={"Content"} />
                            </Pressable>
                            <Pressable onPress={onSegergation} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isSegregation} />
                                <CustomLabel text={"Segregation"} />
                            </Pressable>
                            <Pressable onPress={onJudge} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isJudge} />
                                <CustomLabel text={"Judge Name"} />
                            </Pressable>
                            <Pressable onPress={onCourt} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isCourt} />
                                <CustomLabel text={"Court"} />
                            </Pressable>
                            <Pressable onPress={onCitation} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isCitation} />
                                <CustomLabel text={"Citation"} />
                            </Pressable>
                            <Pressable onPress={onOthers} style={styles.fdRow}>
                                <CustomCheck checked={isSelectAll || isOthers} />
                                <CustomLabel text={"Others (If others,Please specify the details)"} />
                            </Pressable>
                            <CustomLabel text={"Description"} labelStyle={{ fontSize: scale(12) }} />
                            <View style={{ borderWidth: scale(1), height: scale(150), borderColor: appColors.black, borderRadius: scale(5), }}>
                                <TextInput
                                    placeholder={"Type your Problem . . ."}
                                    multiline
                                    onChangeText={onchangeDisc}
                                />
                            </View>

                        </View>
                    </ScrollView>
                    <View style={{flexDirection:"row",justifyContent:"flex-end", marginBottom:scale(20),paddingHorizontal:scale(20)}}>
                    <Pressable onPress={onClose} style={[styles.btn,{backgroundColor:appColors.white,marginRight:scale(5)}]}>
                            <Text style={[styles.txtBtn,{color:appColors.secondary}]}>
                                Close
                            </Text>
                        </Pressable>
                        <Pressable style={styles.btn}>
                            <Text style={styles.txtBtn}>
                                Send
                            </Text>
                        </Pressable>
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
        paddingHorizontal:scale(20)
    },
    txtBtn: {
        color: appColors.white,
        fontWeight: "bold"
    }
})
