import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
export const tabsList = [
  {
    label: 'Judgment',
    active: true,
  },
  {
    label: 'Future Reference',
    active: false,
  },
  {
    label: 'Cited In',
    active: false,
  },
  {
    label: 'Advocates',
    active: false,
  },
  {
    label: 'Bench',
    active: false,
  },
  {
    label: 'Eq Citiations',
    active: false,
  },
];
export default function TabsList({children,activeTabIndex}) {
   
  const [currentTab, setCurrentTab] = useState(activeTabIndex? activeTabIndex:0);
   console.log({activeTabIndex,currentTab});
  const _renderTab = (item, key) => {
    const {label, active} = item;
    return (
      <TouchableOpacity
        onPress={() => setCurrentTab(key)}
        key={key}
        style={[
          styles.tabContiner,
           currentTab == key   ? styles.activeTabStyle : {},
        ]}>
        <Text style={styles.tabLabl}>{label}</Text>
      </TouchableOpacity>
    );
  };
  const _renderScene = ({children}) => {
    return (
      <View style={{}}>
        {React.Children.map(children, (child) => {
          if (child?.key == currentTab)
            return React.cloneElement(child, {style: {...child.props.style}});
        })}
      </View>
    );
  };
  const _renderTabs = () => {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.tabsContainer}>
        {[...tabsList]?.map((item, key) => {
          return _renderTab(item, key);
        })}
      </ScrollView>
    );
  };
 
  return (
    <View style={{}}>
      {_renderTabs()}
      {_renderScene({children})}
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    /*    flex: 1,
       flexDirection: 'row', */
    //backgroundColor:'red',
  },
  tabContiner: {margin: scale(3), height: scale(35), padding: scale(5)},
  activeTabStyle: {
    borderBottomWidth: scale(2.5),
    borderBottomColor: appColors.tabLabel,
  },
  tabLabl: {
    color: appColors.tabLabel,
    fontWeight: '800',
  },
});
