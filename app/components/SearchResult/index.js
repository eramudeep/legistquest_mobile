import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import TouchableRipple from 'react-native-touch-ripple';
import {appColors,shadow} from '../../utils/appColors';
import Badge from '../Badge';
import Icon from '../CustomIcon/Icon';
import CustomLabel from '../CustomLabel/CustomLabel';
import {
  cleanString,
  noEmptyElements,
  removeHtmlTags,
  toTitleCase,
  truncateString,
} from '../../utils/common';
import Highlighter from 'react-native-highlight-words';
import HTML from 'react-native-render-html';
import {SEARCH_WITH_IN_CASE} from '../../services/ApiList';
import CustomInput from '../CustomInput';
import CustomButton from '../CustomButton';

export default function SearchResult({
  searchData,
  onPress,
  data,
  onJudges,
  /* onSearchCase, */
  onPressSearchWithin,
  selectedTopic,
}) {
  const [showJudges, setShowJudges] = useState(false);
  const [showSearchWithIn, setShowSearchWithIn] = useState(false);
  const [searchWithiNQuery, setSearchWithiNQuery] = useState();
  const [searchWithinResults, setSearchWithinResults] = useState();

  
  const toggleSearchWithin = () => {
    setSearchWithiNQuery(undefined)
  setSearchWithinResults(undefined)

    setShowSearchWithIn(!showSearchWithIn);
    setShowJudges(false);
  };
  const {
    LinkText,
    HighlightedText,
    CourtName,
    DateOfJudgment,
    Judges,
    PartyName,
    OtherStatusImgUrl,
    DistinguishedImgUrl,
    CaseId,
    EncryptedId,
    
  } = searchData;

    
  const _renderJudge = ({item, index}) => {
    return (
      <Badge key={index} text={item} labelStyle={{color: appColors.black}} />
    );
  };
  const fetchData = async () => {
    console.log("searchData",searchData);

    const URL = `${SEARCH_WITH_IN_CASE}caseId=${EncryptedId}&searchText=${searchWithiNQuery}`;
    console.log({URL});
    const result = await fetch(URL);
    const {JudgmentText} = await result.json();
    setSearchWithinResults(
      JudgmentText?.length > 0 ? JudgmentText : 'Found in 0 places ',
    );
  };

  const _renderJudges = () => {
    
    return (
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{padding: scale(3)}} />}
          //horizontal
          data={  cleanString(Judges)?.includes("<BR />") ? noEmptyElements( cleanString(Judges)?.split('<BR />') ): noEmptyElements(cleanString(Judges)?.split('<br />'))  || [] }
          renderItem={_renderJudge}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const _renderSearchWithinCase = () => {
    return (
      <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
        <CustomInput
          onChangeText={(chnage) => {
            setSearchWithiNQuery(chnage)}}
          placeholder="Type your text here"
          containerStyle={{width: '70%'}}
        />
        <CustomButton
          onPress={() => fetchData()}
          label="Search"
          buttonStyle={{height: scale(40), paddingHorizontal: scale(10)}}
        />
      </View>
    );
  };
  return (
    <View
      style={{
         //borderBottomWidth: scale(1),
        borderBottomColor: appColors.gray,
        paddingVertical: scale(10),
         backgroundColor:'#fff',
        marginBottom:scale(10),
         ...shadow,
         paddingHorizontal:scale(10)
      }}>
      <CustomLabel
        onPress={() =>
          onPress &&
          onPress(LinkText, HighlightedText?.replace(/<[^>]*>?/gm, ''))
        }
        otherStatus={
          searchData?.OtherStatusImgUrl
            ? searchData?.OtherStatusImgUrl
            : searchData?.DistinguishedImgUrl
            ? searchData?.DistinguishedImgUrl 
            : false
        }
        text={toTitleCase(LinkText)}
        labelStyle={styles.title}
      />
      <CustomLabel
        text={`${CourtName} | ${DateOfJudgment}`}
        labelStyle={styles.subTitle}
      />
      <Highlighter
        highlightStyle={{
          backgroundColor: appColors.higheLight,
          fontWeight: '700',
        }}
        searchWords={[...selectedTopic?.split(' ')]}
        textToHighlight={truncateString(removeHtmlTags(HighlightedText))}
        style={styles.bodyText}
      />

      {/* <CustomLabel
        text={HighlightedText?.replace(/<[^>]*>?/gm, '')}
        labelStyle={styles.bodyText}
      />  */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between',paddingVertical:scale(5)}}>
        <TouchableOpacity style={styles.footerBtn} onPress={onPressSearchWithin}>
          <Icon name={'search'} size={scale(14)} color={appColors.blue} />
          <CustomLabel text={'Search Within Case'} color={appColors.blue} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowSearchWithIn(false);
            setShowJudges(!showJudges);
          }}
          style={styles.footerBtn}>
          <Icon name={'user-tie'} size={scale(14)} color={appColors.blue} />
          <CustomLabel text={'Judges'} color={appColors.blue} />
        </TouchableOpacity>
      </View>
      {showJudges && _renderJudges()}
      {showSearchWithIn && _renderSearchWithinCase()}
      {/* <HTML  source={{ html:searchWithinResults }}  />  */}
      {searchWithiNQuery && showSearchWithIn && (
        <Highlighter
          highlightStyle={{
            backgroundColor: appColors.yellow,
            fontWeight: '700',
          }}
          searchWords={[...searchWithiNQuery?.split(' ')]}
          textToHighlight={removeHtmlTags(searchWithinResults)}
          style={styles.bodyText}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    color: appColors.blue,
    paddingBottom: 0,
    padding: 0,
  },
  subTitle: {
    fontWeight: '500',
    color: appColors.green,
    paddingTop: 0,
    padding: 0,
    marginBottom: scale(5),
    marginTop: scale(5),
    fontSize: scale(12),
  },
  bodyText: {
    color: appColors.grayDark
  },
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
