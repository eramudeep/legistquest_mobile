import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import TouchableRipple from 'react-native-touch-ripple';
import {appColors} from '../../utils/appColors';
import Badge from '../Badge';
import Icon from '../CustomIcon/Icon';
import CustomLabel from '../CustomLabel/CustomLabel';
import {removeHtmlTags} from '../../utils/common'
import Highlighter from 'react-native-highlight-words';

export default function SearchResult({
  searchData,
  onPress,
  data,
  onJudges,
  onSearchCase,
  selectedTopic
}) {
  const [showJudges, setShowJudges] = useState(false);
  const {
    LinkText,
    HighlightedText,
    CourtName,
    DateOfJudgment,
    Judges,
    PartyName,
  } = searchData;
 
  const _renderJudge = ({item, index}) => {
    return <Badge key={index} text={removeHtmlTags(item)} />;
  };
  const _renderJudges = () => {
    return (
        <View>
        <FlatList
         showsHorizontalScrollIndicator={false}
          horizontal
          data={Judges?.split(';')}
          renderItem={_renderJudge}
          keyExtractor={(item) => item.id}
        />
       </View>
    );
  };
  return (
    <View
      style={{
        borderBottomWidth: scale(1),
        borderBottomColor: appColors.gray,
        paddingVertical: scale(10),
      }}>
       
      <CustomLabel
        onPress={() =>
          onPress &&
          onPress(LinkText, HighlightedText?.replace(/<[^>]*>?/gm, ''))
        }
        text={LinkText}
        labelStyle={styles.title}
      />
      <CustomLabel
        text={`${CourtName} | ${DateOfJudgment}`}
        labelStyle={styles.subTitle}
      />
       <Highlighter 
         highlightStyle={{backgroundColor: appColors.higheLight, fontWeight:'700'}}
         searchWords={[ ...selectedTopic?.split(" ")]}
         textToHighlight={removeHtmlTags(HighlightedText)}
         style={styles.bodyText}
        />

        {/* <CustomLabel
        text={HighlightedText?.replace(/<[^>]*>?/gm, '')}
        labelStyle={styles.bodyText}
      />  */} 
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.footerBtn} onPress={onSearchCase}>
          <Icon name={'search'} size={scale(14)} color={appColors.blue} />
          <CustomLabel text={'Search Within Case'} color={appColors.blue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            console.log("show judg");
            setShowJudges(!showJudges)}} style={styles.footerBtn}>
          <Icon name={'user-tie'} size={scale(14)} color={appColors.blue} />
          <CustomLabel text={'Judges'} color={appColors.blue} />
        </TouchableOpacity>
      </View>
      {showJudges && _renderJudges()}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    color: appColors.blue,
    paddingBottom: 0,
  },
  subTitle: {
    fontWeight: '600',
    color: appColors.green,
    paddingTop: 0,
  },
  bodyText: {},
  footerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
