import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomIcon from '../../components/CustomIcon';
import CustomInput from '../../components/CustomInput';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import { appColors } from '../../utils/appColors';
import { homeData } from '../../utils/MockData';

export default function Home({navigation}) {

  return (
    <Container showFooter  showHome showMenu hideLogo showSignin onSignin={()=>navigation.navigate("Login")}>
      <View style={{ flex: 1, justifyContent: "center", }}>
        <CustomIcon iconStyle={{ width: scale(300), height: scale(100) }} />
        <CustomInput placeholder={"Search Free Text..."} rightIcon={"search"} iconSize={scale(20)} onRightIcon={()=>navigation.navigate("Topic")}/>

        {
          homeData.map((val, key) => {
            return (
              <View key={key} style={styles.flexView}>
                <CustomLabel text={val.label} labelStyle={styles.label} />
                <CustomLabel text={val.value} labelStyle={styles.label1} />
              </View>
            )
          })
        }

      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  label: {
    flex: 2
  },
  flexView: { flexDirection: "row" },
  label1: {
    flex: 1,
    color: appColors.blue
  }
});