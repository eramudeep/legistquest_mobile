import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, ScrollView, TouchableHighlight, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import Highcharts from '../../components/Highcharts';
import TabsList, { tabsList } from './TabsList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { appColors, shadow } from '../../utils/appColors';
import Highlighter from 'react-native-highlight-words';
import { removeHtmlTags } from '../../utils/common';
import ScrollableTabView, { ScrollableTabBar } from '../../components/ScrollableTabView'
import HTML from "react-native-render-html";
import createReactClass from 'create-react-class';
import CitiedIn from './CitiedIn';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import { setIsNightMode } from '../../redux/actions';

import CustomChart from '../../components/CustomChart';
import ReportModal from '../../components/Modals/ReportModal';
import DownloadModal from '../../components/Modals/DownloadModal';
import { downloadFile } from '../../services/downloadFile';
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
const tabs = ['short', 'list']
 function index({ viewModel, item, onPressCitiedCase, citiedInData ,setIsNightMode$,isNightmode}) {
  const [isVisible, setIsVisible] = useState(false)
  const [selectAll, setSelectAll] = useState(false)
  const [content, setContent] = useState(false)
  const [segregation, setSegregation] = useState(false)
  const [Judge, setJudge] = useState(false)
  const [court, setCourt] = useState(false)
  const [citation, setCitation] = useState(false)
  const [other, setOther] = useState(false)
  const [showDownModal, setShowDownModal] = useState(false)
const [discription, setDiscription] = useState()
const [fontsize, setFontsize] = useState(4)
  const contentWidth = useWindowDimensions().width;
  const keywordToHigeLight = (query) => {
    return query?.split(' ');
  };
const onDownload=async()=>{
  // console.log("viewModel",viewModel);
  const{EncryptedId,CourtName,CaseId,CaseNo,PageID,PlainJudgment}=viewModel
// await downloadFile(PageID,CourtName,fontsize,PlainJudgment)

}
  const _renderHeader = () => {
    return (
      <View style={[styles.headerContainer,/*  shadow, */]}>
        <View style={{ flex: 1, backgroundColor: appColors.white, flexDirection: "row" }}>
          {_renderCaseTitle()}
        </View>
        <View style={{ padding: scale(5), flex: 1, flexDirection: "row", justifyContent: "space-around", backgroundColor: appColors.white }}>
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
const onPressIcon=(item)=>{
  if(item==="moon"){
    setIsNightMode$(!isNightmode)
  }
  if(item==="frown"){
    setIsVisible(true)
  }
  if(item==="download"){
setShowDownModal(true)
  }
}
  const _renderIcons = () => {
    return ['download', 'moon', 'frown'].map((item, key) => {
   
      if(isNightmode && key==1){
        return <Pressable onPress={()=>onPressIcon(item)}><Fontisto key={key} name={"day-sunny"} size={15} /></Pressable>;
      }
      return <Pressable onPress={()=>onPressIcon(item)}><FontAwesome5 key={key} name={item} size={15} /></Pressable>;
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
      <View style={{ flex: 1 }}>
        {viewModel?.OcrDtoList.length > 0 ?

          <View />

          : <View />}
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
        <HTML containerStyle={{ padding: 20 }} tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color:isNightmode? appColors.white:appColors.black
          },
        }} contentWidth={contentWidth} source={{ html: viewModel?.Judgement }} />

      </View>
    );
  };

  const _renderBench = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.headingLabels, { alignSelf: "center",color:isNightmode?appColors.white:appColors.black }]}>Bench List</Text>
        <View style={styles.underLine} />
        <HTML containerStyle={{ padding: 20 }} tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color:isNightmode? appColors.white:appColors.black
          },
        }} contentWidth={contentWidth} source={{ html: viewModel?.Bench }} />

      </View>
    );
  };
  const _renderCitiation = () => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.headingLabels, { alignSelf: "center",color:isNightmode?appColors.white:appColors.black }]}>Eq Citation</Text>
        <View style={styles.underLine} />
        <HTML containerStyle={{ padding: 20 }} tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color:isNightmode? appColors.white:appColors.black
          },
        }} contentWidth={contentWidth} source={{ html: viewModel?.Citation }} />

      </View>
    );
  };
  const _renderAdvocates = () => {

    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.headingLabels, { alignSelf: "center",color:isNightmode?appColors.white:appColors.black }]}>Advocates List</Text>
        <View style={styles.underLine} />
        <HTML containerStyle={{ padding: 20 }} tagsStyles={{
          body: {
            whiteSpace: 'normal',
            color:isNightmode? appColors.white:appColors.black
          },
        }} contentWidth={contentWidth} source={{ html: viewModel?.Advocates }} />

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
        <Text style={[styles.headingLabels, { color: isNightmode? appColors.white:appColors.black }]}>{viewModel?.Petitioner}</Text>
        <Text style={[styles.headingLabels, { color: isNightmode? appColors.white:appColors.black }]}>V. </Text>
        <Text style={[styles.headingLabels, { color: isNightmode? appColors.white:appColors.black }]}>{viewModel?.Respondent}</Text>
        <Text style={{ fontWeight: "bold", color: isNightmode? appColors.white:appColors.black }}>({viewModel?.CourtName})</Text>
        <Text style={{ marginTop: scale(6), color: isNightmode? appColors.white:appColors.black }} >{`${viewModel?.CaseNo} | ${viewModel?.DateOfJudgement}`}</Text>

      </View>
    );
  };

  const handleChangeTab = ({ i, ref, from, }) => {
    children[i].onEnter();
    children[from].onLeave();
  }
  return (
    <View style={{ flex: 1 }}>
      {_renderIdraf()}
      {_renderHeader()}
      <TabsList >
        <View key={0} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          {_renderCaseHeading()}
          {viewModel?.Judgement && _renderJudgement()}
        </View>
        <View key={1} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          <CitiedIn onPress={onPressCitiedCase} data={citiedInData} />
        </View >
        <View key={2} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          {/* <CitiedIn onPress={onPressCitiedCase} data={citiedInData} /> */}
        </View>
        <View key={3} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          {_renderAdvocates()}

        </View>
        <View key={4} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          {_renderBench()}
        </View>
        <View key={5} style={{...styles.tabComp,backgroundColor:isNightmode?appColors.black:appColors.white}}>
          {_renderCitiation()}
        </View>
      </TabsList>
       
<ReportModal 
visible={isVisible}
 onClose={()=>setIsVisible(false)}
 isCitation={citation}
 isContent={content}
 isCourt={court}
 isJudge={Judge}
 isOthers={other}
 isSegregation={segregation}
 isSelectAll={selectAll}
 onCitation={()=>setCitation(prev=>!prev)}
 onContent={()=>setContent(prev=>!prev)}
 onCourt={()=>setCourt(prev=>!prev)}
 onJudge={()=>setJudge(prev=>!prev)}
 onOthers={()=>setOther(prev=>!prev)}
 onSegergation={()=>setSegregation(prev=>!prev)}
 onSelectAll={()=>setSelectAll(prev=>!prev)}
 onchangeDisc={val=>setDiscription(val)}
 />
 <DownloadModal visible={showDownModal} onDownload={onDownload} onClose={()=>setShowDownModal(false)} pickerValue={fontsize} onChangePicker={(value)=>setFontsize(value)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  tabComp:{ 
    backgroundColor: appColors.blue,
    paddingHorizontal:scale(5) 
  },
  headerContainer: {
    flex: 2,
    maxHeight: scale(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pagerView: {
    flex: 1, backgroundColor: "blue"
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
  headingLabels: {

    fontSize: scale(18),
    fontWeight: 'bold',
    marginBottom: scale(5)
  },
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
  underLine: {
    width: scale(60),
    borderBottomWidth: scale(2),
    borderBottomColor: appColors.secondary,
    marginBottom: scale(20),
    alignSelf: "center"
  },
});

const mapStateToProps = (state) => ({
  isNightmode:state.auth.isNightmode
 
});
const mapDispatchToProps = {
  setIsNightMode$: setIsNightMode,
};
export default connect(mapStateToProps, mapDispatchToProps)(index);