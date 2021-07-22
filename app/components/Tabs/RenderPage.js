import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function RenderPage({children}) {
    return (
        <View style={{flex:1}}>
           {children}
        </View>
    )
}

const styles = StyleSheet.create({})
