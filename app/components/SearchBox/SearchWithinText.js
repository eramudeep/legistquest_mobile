import React, {useState} from 'react';
import {View, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import {connect} from 'react-redux';
import {SEARCH_WITH_IN_CASE} from '../../services/ApiList';
import HTML from 'react-native-render-html';
import Highlighter from 'react-native-highlight-words';
import {appColors} from '../../utils/appColors';
import {removeHtmlTags, truncateString} from '../../utils/common';
function SearchWithinText({navigation, route}) {
  console.log(route.params);
  const {id} = route.params;
  const [isFocsed, setIsFocsed] = useState(false);
  //   const [isFocsedSection, setIsFocsedSection] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState();
  const [searchwithinResult, setSearchwithinResult] = useState('');
  //   const [sectionText, setSectionText] = useState();

  const onFocus = () => {
    setIsFocsed(!isFocsed);
  };

  const clear = () => {
    if (isFocsed) setSearchedQuery('');
    // if (isFocsedSection) setSectionText('');
  };

  const onChangeText = (chnage) => {
    setSearchedQuery(chnage);
  };
  const onItemPress = async () => {
    // console.log("searchData",searchData);

    const URL = `${SEARCH_WITH_IN_CASE}caseId=${id}&searchText=${searchedQuery}`;
    console.log('=====================================', URL);
    const result = await fetch(URL);
    const {JudgmentText} = await result.json();
    setSearchwithinResult(
      JudgmentText?.length > 0 ? JudgmentText : 'Found in 0 places ',
    );
  };
  //   const _renderItem = ({item, index}) => {
  //     const {Value} = item;
  //     return (
  //       <TouchRipple
  //         rippleDuration={800}
  //         rippleColor={appColors.blue}
  //         onPress={() => {
  //           setSearchedQuery(Value);
  //           onItemPress && onItemPress(item);

  //         }}
  //         style={{padding: scale(5), borderBottomWidth: scale(0.5)}}>
  //         <CustomLabel text={Value} />
  //       </TouchRipple>
  //     );
  //   };
  ///console.log({searchQuery});
  return (
    <View style={{flex: 1, paddingHorizontal: scale(10)}}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Pressable onPress={() => navigation?.goBack()}>
          <CustomIcon name="angle-left" size={scale(25)} />
        </Pressable>

        <CustomInput
          defaultValue={searchedQuery}
          onChangeText={onChangeText}
          onRightIcon={clear}
          onFocus={onFocus}
          onBlur={onFocus}
          iconSize={scale(14)}
          rightIcon={isFocsed ? 'times' : false}
          containerStyle={{width: '90%'}}
          autoFocus
          placeholder={'Type your text here'}
          onSubmitEditing={() => {
            onItemPress();
          }}
        />
      </View>
      {searchedQuery && (
        <Highlighter
          highlightStyle={{
            backgroundColor: appColors.yellow,
            fontWeight: '700',
          }}
          // searchWords={['ram']}
          searchWords={[...searchedQuery?.split(' ')]}
          textToHighlight={  removeHtmlTags(searchwithinResult)}
          style={styles.bodyText}
        />
      )}
      {/* <HTML  source={{ html:searchwithinResult }}  />  */}
      {/* <FlatList
        keyExtractor={(item) =>
          `${new Date().getTime()}_${item.Value}_${getUniId()}`
        }
        data={searchResults}
        renderItem={_renderItem}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: appColors.grayDark,
  },
});
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SearchWithinText);
