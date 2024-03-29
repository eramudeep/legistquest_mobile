import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions,
  Pressable
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {connect} from 'react-redux';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  getResultsByTopic,
  resetSearchResults,
  searchByQuery,
} from '../redux/searchActions';
import {appColors} from '../utils/appColors';
import Autocomplete from './AutoComplete';
import {debounce} from 'lodash';
import { getPlacheHolder } from '../utils/common'; 
import { AlertHelper } from '../utils/AlertHelper';
const window = Dimensions.get('window');
//import useSelectedLang from '../../hooks/useSelectedLang';
//import { translateIt } from '../../utils/TranslationHelper';

function CustomAutoComplete({
  InputStyle,
  placeholder,
  searchResults,
  onIconPress,
  onBlur,
  searchQuery,
  searchByQuery$,
  getResultsByTopic$,
  navigation,
  filterValueList,
  SortBy
}) {
  const [searchIcon, setSearchIcon] = useState('search'); //spinner
  const [typing, setTyping] = useState(false);
  const onChange = (change) => {
    
    debouncedSearch(change);
  };
  const debouncedSearch = debounce(function (change) {
    searchByQuery$({type: searchQuery?.type, text: change});
    //setQuery(change);
   // setSearchIcon('spinner');
  }, 1000);
  
  const itemOnPress = (item) => {
    onBlur&&onBlur(false)
    getResultsByTopic$({selectedTopic: item.Value,filterValueList, SortBy});
    Keyboard.dismiss();
    setTyping(false);
    //console.log("item",item);
    searchByQuery$({type: item?.Key, text: item?.Value});
    setSearchIcon('search');
    navigation?.navigate('Topic', {selectedTopic: item.Value});
  };

  const OnSearchPress = () => {
    
    if( searchQuery?.text?.length > 2){
       getResultsByTopic$({selectedTopic: searchQuery?.text,  SortBy:1}); /// on reset 

   return navigation?.navigate('Topic', {selectedTopic: searchQuery?.text});
    }
   return AlertHelper.show("error", "Search should be minimum 3 alphabets...")
  };

  //console.log({searchQuery});
  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        InputStyle,
        Platform.OS == 'ios' && {zIndex: 1},
      ]}>
        <Pressable style={{flex:1,justifyContent:"center"}} onPress={()=>navigation.navigate("SearchBox")}>
          <Text style={{color:appColors.grayDark}}>
            {searchQuery?.text?decodeURIComponent( searchQuery?.text ): getPlacheHolder(searchQuery?.type)}
          </Text>
        </Pressable>
      {/* <Autocomplete
         
        autoCapitalize="none"
        autoCorrect={false}
        data={  (typing && Array.isArray(searchResults) &&[...searchResults]) || []}
        //defaultValue={searchQuery?.text}
        inputContainerStyle={styles.input}
        onFocus={() => {
         return navigation.navigate("SearchBox")
           setTyping(true);
           searchByQuery$({type: searchQuery?.type, text: ""});
           onBlur &&onBlur(true)
        }}
        TextInput={ 
         { onBlur:() => {
             console.log("blured ");
            setTyping(false);
          }}
        }
        
      //  listContainerStyle={ paddingHorizontal:0,zIndex:100, *//* backgroundColor:'red', padding:140 }
        keyExtractor={(item) => Math.random().toString(36).substring(7)}
        listStyle={[{borderWidth: 0, paddingHorizontal: 0,  marginTop: scale(Platform.OS =="ios" ? 0: 25), maxHeight: scale(350), marginBottom:scale(30) }, Platform.OS =="ios" ? {width:window.width -120,} :{} ]}
        placeholder={searchQuery?.text?decodeURIComponent( searchQuery?.text ): getPlacheHolder(searchQuery?.type) }
        onChangeText={onChange}
         
        renderItem={({item, i}) => {
          const {Value} = item;
          return (
            <TouchableOpacity
              key={i}
              style={{ padding: scale(5)}}
              onPress={() => itemOnPress(item)}>
              <Text style={{padding:5}}>{Value}</Text>
            </TouchableOpacity>
          );
        }}
      /> */}
      {searchIcon && (
        <TouchableOpacity onPress={OnSearchPress} style={styles.iconView}>
          <FontAwesome5Icon
            name={searchIcon}
            color={appColors.secondary}
            size={scale(18)}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // height: scale(42),
    backgroundColor: appColors.white,
    borderRadius: scale(20),
    margin: scale(10),
    paddingHorizontal: scale(20),
  },
  iconView: {
    height: scale(42),
    width: scale(42),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    // fontFamily: 'Roboto-Regular',
    //fontSize: scale(14),
    borderWidth: 0,
    minWidth: '80%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rightButtonCont: {
    backgroundColor: appColors.primary,
    height: scale(42),
    minWidth: '30%',
    paddingHorizontal: scale(10),
    borderTopRightRadius: scale(20),
    borderBottomRightRadius: scale(20),
    right: -23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
export default connect(mapStateToProps, mapDispatchToProps)(CustomAutoComplete);
