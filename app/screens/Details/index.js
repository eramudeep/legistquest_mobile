import React from 'react';
import { View, Text, StyleSheet,useWindowDimensions  } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import TabsList from './TabsList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { appColors, shadow } from '../../utils/appColors';
import Highlighter from 'react-native-highlight-words';
import { removeHtmlTags } from '../../utils/common';
import RenderPage from '../../components/Tabs/RenderPage';
import { TabView, SceneMap } from 'react-native-tab-view';
import PagerView from 'react-native-pager-view';
import HTML from "react-native-render-html";

export default function index({ viewModel, item }) {
  // console.log('viewModel', viewModel);
  const contentWidth = useWindowDimensions().width;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);
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
  const renderScene = SceneMap({
    first: <RenderPage>
      {/* {_renderCaseHeading()}
      {viewModel?.Judgement && _renderJudgement()} */}
    </RenderPage>,
    second: <RenderPage>
    {/* {_renderCaseHeading()}
    {viewModel?.Judgement && _renderJudgement()} */}
  </RenderPage>,
  
  });
  // return(
  //   <PagerView style={styles.pagerView} initialPage={0}>
  //     <View key="1" style={{backgroundColor:"red",flex:1}}>
  //       <Text>First page</Text>
  //     </View>
  //     <View key="2">
  //       <Text>Second page</Text>
  //     </View>
  //   </PagerView>
  // )
  return (
    <>
      {_renderIdraf()}
      {_renderHeader()}
      <TabsList />
      {/* <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    /> */}
      {_renderCaseHeading()} 
     {viewModel?.Judgement && _renderJudgement()}

    </>
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
  headingLabels: { fontSize: scale(25), fontWeight: 'bold' }
});
