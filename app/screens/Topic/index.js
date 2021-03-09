import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { scale } from 'react-native-size-matters'
import Badge from '../../components/Badge'
import Container from '../../components/Container'
import CustomInput from '../../components/CustomInput'
import SearchResult from '../../components/SearchResult'
import ScrollableTab from '../../routing/ScrollableTab'


export default function Topic({ navigation }) {
    return (
        <Container showHome showMenu showFooter>
            <View style={{flex:1}}>
                <CustomInput containerStyle={{ marginTop: 0 }} placeholder={"Search Free Text..."} rightIcon={"search"} iconSize={scale(20)} />
                <View style={{ flexDirection: "row", paddingBottom: scale(10) }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {[1, 2, 3, 4, 5, 6, 7].map((val, key) => {
                            return (
                                <Badge key={key} />
                            )
                        })}
                    </ScrollView>
                </View>
               
                
                
                <ScrollView>
                    {[1, 2, 3, 4, 5].map((val, key) => {
                        return (
                            <SearchResult key={key} onPress={() => navigation.navigate("TopicDetail")} />
                        )
                    })}
                </ScrollView> 
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({})
