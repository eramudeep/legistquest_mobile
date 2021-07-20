import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import Container from '../../components/Container'
import CustomIcon from '../../components/CustomIcon'

export default function Splash({navigation}) {
    return (
        <Container  hideHeader>
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <CustomIcon iconStyle={{width:scale(300),height:scale(100)}}/>
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({})
