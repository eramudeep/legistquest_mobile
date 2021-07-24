import React from 'react';
import { View, Text, StyleSheet,useWindowDimensions,ScrollView, TouchableHighlight  } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import TabsList, { tabsList } from './TabsList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { appColors, shadow } from '../../utils/appColors';
import Highlighter from 'react-native-highlight-words';
import { removeHtmlTags } from '../../utils/common';
import ScrollableTabView,{ScrollableTabBar } from '../../components/ScrollableTabView'
import HTML from "react-native-render-html";
import createReactClass from 'create-react-class';
import CitiedIn from './CitiedIn';

// const Child = createReactClass({
//   onEnter() {
//     console.log('enter: ' + this.props.i); // eslint-disable-line no-console
//   },

//   onLeave() {
//     console.log('leave: ' + this.props.i); // eslint-disable-line no-console
//   },

//   render() {
//     const i = this.props.i;
//     return <Text key={i}>{`rertab${i}`}</Text>;
//   },
// });
// const Child=(props)=> {
//   console.log("props child",props);
//   return <View style={{height:200}}>
//     <Text style={{fontSize:20}}>{`rertab`}</Text>;
//   </View>

  
// }
const  tabs=[ 'short', 'list' ]
export default function index({ viewModel, item,onPressCitiedCase ,citiedInData}) {
  // console.log('viewModel', viewModel);
  const contentWidth = useWindowDimensions().width; 
  const keywordToHigeLight = (query) => {
    return query?.split(' ');
  };
 
  const _renderHeader = () => {
    return (
      <View style={[styles.headerContainer, shadow,]}>
        <View style={{ flex: 1, backgroundColor: appColors.white, flexDirection: "row" }}>
          {_renderCaseTitle()}
        </View>
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", backgroundColor: appColors.white }}>
          {_renderIcons()}
        </View>
      </View>
    );
  };
  const _renderCaseTitle = () => {
    return (
      <Text numberOfLines={2} style={styles.caseTitle}>{`${viewModel?.Petitioner} V.\n ${viewModel?.Respondent}`}</Text>
    );
  };

  const _renderIcons = () => {
    return ['download', 'bookmark', 'moon', 'frown'].map((item, key) => {
      return <FontAwesome5 key={key} name={item} size={15} />;
    });
  };
  const _renderIdraf = () => { 
    return (
      <View style={styles.idrafContainer}>
        <FontAwesome5 color={appColors.tabLabel} name={'gem'} size={15} />
        <Text
          style={{
            marginLeft: scale(10),
            fontWeight: 'bold',
            fontSize: scale(14),
          }}>
          Open iDraf
        </Text>
      </View>
    );
  };
  const _renderJudgement = () => {
    return (
      <View style={{   flex:1 }}>
        {/* <Highlighter
          highlightStyle={{
            backgroundColor: appColors.higheLight,
            //fontWeight: '700',
            lineHeight:scale(23)
          }}
          searchWords={[
            ...keywordToHigeLight(
              `${viewModel?.Respondent} ${viewModel?.Petitioner}`,
            ),
          ]}
          textToHighlight={removeHtmlTags(viewModel?.Judgement)}
        /> */}
              <HTML containerStyle={{padding:20}} contentWidth={contentWidth}  source={{ html: viewModel?.Judgement }}   />

      </View>
    );
  };
 
  const _renderBench = () => {
    return (
      <View style={{   flex:1 }}>
        <Text style={[styles.headingLabels,{alignSelf:"center",}]}>Bench List</Text>
       <View style={styles.underLine}/>
              <HTML containerStyle={{padding:20}} contentWidth={contentWidth}  source={{ html: viewModel?.Bench }}   />

      </View>
    );
  };
  const _renderCitiation = () => {
    return (
      <View style={{   flex:1 }}>
        <Text style={[styles.headingLabels,{alignSelf:"center",}]}>Eq Citation</Text>
       <View style={styles.underLine}/>
              <HTML containerStyle={{padding:20}} contentWidth={contentWidth}  source={{ html: viewModel?.Citation }}   />

      </View>
    );
  };
  const _renderAdvocates = () => {
    
    return (
      <View style={{   flex:1 }}>
       <Text style={[styles.headingLabels,{alignSelf:"center",}]}>Advocates List</Text>
       <View style={styles.underLine}/>
              <HTML containerStyle={{padding:20}} contentWidth={contentWidth}  source={{ html: viewModel?.Advocates }}   />

      </View>
    );
  };

  const _renderCaseHeading = () => {
    return (
      <View
        style={{
          //  padding: scale(20),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(10),
          marginBottom: scale(10)
        }}>
        <Text style={styles.headingLabels}>{viewModel?.Petitioner}</Text>
        <Text style={styles.headingLabels}>V. </Text>
        <Text style={styles.headingLabels}>{viewModel?.Respondent}</Text>
        <Text style={{ fontWeight: "bold" }}>({viewModel?.CourtName})</Text>
        <Text>{`${viewModel?.CaseNo} | ${viewModel?.DateOfJudgement}`}</Text>

      </View>
    );
  };
  
  const handleChangeTab=({i, ref, from, })=> {
    children[i].onEnter();
    children[from].onLeave();
  }
  return (
    <View style={{flex:1}}>
      {_renderIdraf()}
      {_renderHeader()}
      <TabsList >
        <View key={0}> 
    {_renderCaseHeading()} 
     {viewModel?.Judgement && _renderJudgement()}
        </View>
        <View key={1}>
          <Text></Text>
        </View >
        <View key={2}>
         <CitiedIn onPress={onPressCitiedCase} data={citiedInData}/>
        </View>
        <View key={3}>
        {_renderAdvocates()}
         
        </View>
        <View key={4}>
        {_renderBench()}
        </View>
        <View key={5}>
          {_renderCitiation()}
        </View>
        </TabsList> 
      {/* <ScrollableTabView 
      tabBarActiveTextColor={appColors.tabLabel} 
      tabBarUnderlineStyle={{backgroundColor:appColors.tabLabel}}  
      tabBarInactiveTextColor={appColors.tabLabel} 
      renderTabBar={() => <ScrollableTabBar />}>
      {tabsList.map((tab, i) => {
        return <Child
          // ref={(ref) => (children[i] = ref)}
          tabLabel={`${tab.label}`}
          i={i}
          key={i}
        />;
      })}   
    </ScrollableTabView> */}
   
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    maxHeight: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pagerView: {
    flex: 1,backgroundColor:"blue"
  },
  idrafContainer: {
    flexDirection: 'row',
    marginBottom: scale(10),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: scale(0.5),
    borderBottomColor: appColors.gray,

  },
  caseTitle: {
    fontWeight: 'bold',
  },
  headingLabels: { fontSize: scale(25), fontWeight: 'bold' },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 150,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  underLine:{
    width:scale(60),
    borderBottomWidth:scale(2),
    borderBottomColor:appColors.secondary,
    marginBottom:scale(20),
    alignSelf:"center"
},
});
