import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { scale } from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
export const tabsList = [
  {
    label: "Judgement",
    active: true
  },
  {
    label: "Future Refrence",
    active: false
  },
  {
    label: "Citied In",
    active: false
  },
  {
    label: "Advocates",
    active: false
  },
  {
    label: "Bench",
    active: false
  },
  {
    label: "Eq Citiation",
    active: false
  }
]
export default function DynamicTabs({children,tabs}) {
  console.log("children");
  const [currentTab, setCurrentTab] = useState(0)
  const _renderTab = (item, key) => {
    // const { label, active } = item
    return (
      <TouchableOpacity onPress={() => setCurrentTab(key)} key={key} style={[styles.tabContiner, currentTab == key ? styles.activeTabStyle : {}]}>
        <Text style={styles.tabLabl}>{item === "Others" ? "Tribunal" :item }</Text>
      </TouchableOpacity>
    );
  };
  const _renderScene = ({children}) => {
    return (
      <View style={{}}>
         {React.Children.map(children, child => {
          
         if(child?.key==currentTab)
         return(
          React.cloneElement(child, {style: {...child.props.style,}})
      )}
            )}
      </View>
    )
  }
  const _renderTabs = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.tabsContainer}>
        {[...tabs]?.map((item, key) => {
          return _renderTab(item, key);
        })}
      </ScrollView>
    );
  };
  return <View style={{}}>
    {_renderTabs()}
    {_renderScene({children})}
  </View>;
}

const styles = StyleSheet.create({
  tabsContainer: {
    /*    flex: 1,
       flexDirection: 'row', */
    //backgroundColor:'red', 
  },
  tabContiner: { margin: scale(3), height: scale(35), padding: scale(5) },
  activeTabStyle: {
    borderBottomWidth: scale(2.5),
    borderBottomColor: appColors.tabLabel
  },
  tabLabl: {
    color: appColors.tabLabel,
    fontWeight: '800'
  }
});
