import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from '../components/ScrollableTabView'

export default function ScrollableTab({children}) {
    return (
        <ScrollableTabView

            renderTabBar={() => (
                <ScrollableTabBar
                    style={styles.scrollStyle}
                    tabStyle={styles.tabStyle}
                />
            )}
            tabBarTextStyle={styles.tabBarTextStyle}
            tabBarInactiveTextColor={'black'}
            tabBarActiveTextColor={'red'}
            tabBarUnderlineStyle={styles.underlineStyle}
            initialPage={1}
        >
          <View key={'1'} tabLabel={'firt tab '} style={{flex:1,backgroundColor:'red'}}/>
             
        <View key={'2'} tabLabel={'second tab'} style={{flex:1,backgroundColor:'blue'}}/>
          
        <View key={'3'} tabLabel={'third tab'} style={{flex:1,backgroundColor:'yellow'}}/>
            
        </ScrollableTabView>
    )
}

const styles = StyleSheet.create({
    tabStyle: {},
    scrollStyle: {
        backgroundColor: 'white',
        // paddingLeft: 65,
        // paddingRight: 65,
        // justifyContent: 'center',
    },
    tabBarTextStyle: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    underlineStyle: {
        height: 3,
        backgroundColor: 'red',
        borderRadius: 3,
        width: 15,
    },
})
