import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import TabsList from './TabsList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {appColors, shadow} from '../../utils/appColors';
import Highlighter from 'react-native-highlight-words';
import {removeHtmlTags} from '../../utils/common';

export default function index({viewModel, item}) {
  console.log('viewModel', viewModel);
  const keywordToHigeLight = (query) => {
    return query?.split(' ');
  };
  const _renderHeader = () => {
    return (
      <View style={[styles.headerContainer, shadow]}>
        {_renderCaseTitle()}
        {_renderIcons()}
      </View>
    );
  };
  const _renderCaseTitle = () => {
    return (
      <Text style={styles.caseTitle}>{`${viewModel?.Petitioner} V.\n ${viewModel?.Respondent}`}</Text>
    );
  };

  const _renderIcons = () => {
    return ['download', 'bookmark', 'moon','frown'].map((item, key) => {
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
      <View style={{backgroundColor: '#f1f5fa'}}>
        <Highlighter
          highlightStyle={{
            backgroundColor: appColors.higheLight,
            fontWeight: '700',
          }}
          searchWords={[
            ...keywordToHigeLight(
              `${viewModel?.Respondent} ${viewModel?.Petitioner}`,
            ),
          ]}
          textToHighlight={removeHtmlTags(viewModel?.Judgement)}
        />
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
        <Text style={{fontWeight:"bold"}}>({viewModel?.CourtName})</Text>
        <Text>{`${viewModel?.CaseNo} | ${viewModel?.DateOfJudgement}`}</Text>
        
      </View>
    );
  };
  return (
    <>
      {_renderIdraf()}
      {_renderHeader()}
      <TabsList />
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
  headingLabels :{fontSize: scale(25), fontWeight:'bold'}
});
