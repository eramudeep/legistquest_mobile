import React from 'react'
import { View, Text } from 'react-native'
import FilterComp from './FilterComp'

export default function index({Court}) {
    return (
        <View> 
            {
                Object.keys(Court)?.map((item,key)=>{ 
                    return <FilterComp  label={item} Court={ Court[item]}/>
                })
            }
            {/*  */}
        </View>
    )
}
