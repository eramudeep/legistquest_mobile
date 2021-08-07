import React, {useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import CustomIcon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import {connect} from 'react-redux';
import {debounce} from 'lodash';
import TouchRipple from 'react-native-touch-ripple'
import {
  getResultsByTopic,
  resetSearchResults,
  searchByQuery,
} from '../../redux/searchActions';
import { getPlacheHolder, getUniId } from '../../utils/common';
import { appColors } from '../../utils/appColors';
import { AlertHelper } from '../../utils/AlertHelper';

function index({
  searchResults,
  navigation,
  getResultsByTopic$,
  searchByQuery$,
  resetSearchResults$,
  searchQuery,
  filterValueList,
  SortBy,
}) {
  const [isFocsed, setIsFocsed] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState();
  const onFocus = () => {
    setIsFocsed(!isFocsed);
  };

  const clear = () => {
    setSearchedQuery('');
  };
  const debouncedSearch = debounce(function (change) {
    searchByQuery$({type: searchQuery?.type, text: change});
    //setQuery(change);
    // setSearchIcon('spinner');
  }, 1000);
 
  const onChangeText = (chnage) => {
    debouncedSearch(chnage);
    setSearchedQuery(chnage);
  };
  const onItemPress = (item) => { 
    if(item.Value?.length > 2){
      getResultsByTopic$({selectedTopic: item.Value, filterValueList, SortBy});  
     return navigation?.navigate('Topic', {selectedTopic: item.Value});
    }
    AlertHelper.show("error","Please Type...")
     
  };
  const _renderItem = ({item, index}) => {
    const {Value} = item;
    return (
      <TouchRipple
        rippleDuration={800} rippleColor={appColors.blue} 
        onPress={() => onItemPress && onItemPress(item)}
        style={{padding: scale(5), borderBottomWidth: scale(0.5)}}>
        <CustomLabel text={Value} />
      </TouchRipple>
    );
  };
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
          iconSize={scale(16)}
          rightIcon={isFocsed ? 'times' : false}
          containerStyle={{width: '90%'}}
          autoFocus
          placeholder={getPlacheHolder()}
          onSubmitEditing={()=> onItemPress({Value:searchedQuery}) }
        />
      </View>
      <FlatList
        keyExtractor={(item) => `${new Date().getTime()}_${item.Value}_${getUniId()}`}
        data={ searchResults }
        renderItem={_renderItem}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  searchQuery: state.search.searchQuery,
  filterValueList: `${state.filter.filterWithInResult?.toString()}`,
  SortBy: state.filter.sortBy?.toString(), // HARD CODING FOR NOW, NEED TO SYNC WITH `ResultFound.js` Component,
});

const mapDispatchToProps = {
  searchByQuery$: searchByQuery,
  resetSearchResults$: resetSearchResults,
  getResultsByTopic$: getResultsByTopic,
};

export default connect(mapStateToProps, mapDispatchToProps)(index);
