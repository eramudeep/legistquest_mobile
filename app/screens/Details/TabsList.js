import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { scale } from 'react-native-size-matters';
import { appColors } from '../../utils/appColors';
const tabsList =[
  {label:"Judgement",
  active:true
},
{label:"Future Refrence",
  active:false
},
{label:"Citied In",
  active:false
},
{label:"Advocates",
  active:false
},
{label:"Bench",
  active:false
},
{label:"Eq Citiation",
  active:false
}
]
export default function TabsList() {
  const _renderTab = (item, key) => {
    const {label,active}=item
    return (
      <TouchableOpacity key={key} style={[styles.tabContiner,active ? styles.activeTabStyle :{}]}>
        <Text style={styles.tabLabl}>{label}</Text>
      </TouchableOpacity>
    );
  };
  const _renderTabs = () => {
    return (
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.tabsContainer}>
        {[...tabsList]?.map((item, key) => {
          return _renderTab(item, key);
        })}
      </ScrollView>
    );
  };
  return <View style={{ }}>{_renderTabs()}</View>;
}

const styles = StyleSheet.create({
  tabsContainer: {
 /*    flex: 1,
    flexDirection: 'row', */
    //backgroundColor:'red', 
  },
  tabContiner:{ margin:scale(3),   height:scale( 35), padding: scale(5)},
  activeTabStyle :{
     borderBottomWidth: scale(2.5),
     borderBottomColor: appColors.tabLabel
  },
  tabLabl:{
    color:appColors.tabLabel,
    fontWeight:'800'
  }
});
