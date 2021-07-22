import React, {useState} from 'react';
import {
  StyleSheet,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  Dimensions
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
const window = Dimensions.get('window');
//import useSelectedLang from '../../hooks/useSelectedLang';
//import { translateIt } from '../../utils/TranslationHelper';

function AutoCompleteForAct({
  InputStyle,
  placeholder,
  searchResults,
  onIconPress,
  onBlur,
  searchQuery,
  searchByQuery$,
  getResultsByTopic$,
  navigation,
}) {
  const [searchIcon, setSearchIcon] = useState('search'); //spinner
  const [typing, setTyping] = useState(false);
  const [actName, setActName] = useState("")
  const [sectionName, setSectionName] = useState("")
  const onChange = (change) => {
    
    debouncedSearch(change);
  };
  const debouncedSearch = debounce(function (change) {
    searchByQuery$({type: searchQuery?.type, text: change});
    //setQuery(change);
    setSearchIcon('spinner');
  }, 1000);

  const itemOnPress = (item) => {
    onBlur&&onBlur(false)
    getResultsByTopic$({selectedTopic: item.Value});
    Keyboard.dismiss();
    setTyping(false);
    //console.log("item",item);
    searchByQuery$({type: searchQuery?.type, text: `${item?.Value}${sectionName?`+ ${sectionName}`:""}`});
    setSearchIcon('search');
    navigation?.navigate('Topic', {selectedTopic: item.Value});
  };

  const OnSearchPress = () => {
    getResultsByTopic$({selectedTopic: searchQuery?.text+sectionName});

    navigation?.navigate('Topic', {selectedTopic: searchQuery?.text});
  };

  //console.log({searchQuery});
  return (
      <View style={{flexDirection:"row",margin:scale(5)}}>
    <View
      style={[
        styles.container,
        styles.shadow,
        InputStyle,
        Platform.OS == 'ios' && {zIndex: 1},
      ]}>
      <Autocomplete
         
        autoCapitalize="none"
        autoCorrect={false}
        data={/* data */ (typing && [...searchResults]) || []}
        defaultValue={searchQuery?.text}
        inputContainerStyle={styles.input}
        onFocus={() => {
           setTyping(true);
           onBlur &&onBlur(true)
        }}
        TextInput={
         { onBlur:() => {
             
            setTyping(false);
          }}
        }
        
      //  listContainerStyle={{/* paddingHorizontal:0,zIndex:100, *//* backgroundColor:'red', padding:140 */}}
        keyExtractor={(item) => Math.random().toString(36).substring(7)}
        listStyle={[{borderWidth: 0, paddingHorizontal: 0,  marginTop: scale(Platform.OS =="ios" ? 0: 25), maxHeight: scale(350), marginBottom:scale(30) }, Platform.OS =="ios" ? {width:window.width -120,} :{} ]}
        placeholder={getPlacheHolder(searchQuery?.type) }
        onChangeText={onChange /* onChangeText */}
         
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
      />
    </View>
    <View
      style={[
        styles.container,
        styles.shadow,
        InputStyle,{height:scale(40)},
        Platform.OS == 'ios' && {zIndex: 1},
      ]}>
      <Autocomplete
         
        autoCapitalize="none"
        autoCorrect={false}
        // data={/* data */ (typing && [...searchResults]) || []}
        data={[]}
        defaultValue={sectionName}
        inputContainerStyle={[styles.inputSection]}
        // onFocus={() => {
        //    setTyping(true);
        //    onBlur &&onBlur(true)
        // }}
        // TextInput={
        //  { onBlur:() => {
             
        //     setTyping(false);
        //   }}
        // }
        
      //  listContainerStyle={{/* paddingHorizontal:0,zIndex:100, *//* backgroundColor:'red', padding:140 */}}
        keyExtractor={(item) => Math.random().toString(36).substring(7)}
        listStyle={[{borderWidth: 0, paddingHorizontal: 0,  marginTop: scale(Platform.OS =="ios" ? 0: 25), maxHeight: scale(350), marginBottom:scale(30) }, Platform.OS =="ios" ? {width:window.width -120,} :{} ]}
        placeholder={"Section"}
        onChangeText={(val)=>setSectionName(val) /* onChangeText */}
         
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
      />
      {searchIcon && (
        <TouchableOpacity onPress={OnSearchPress} style={styles.iconView}>
          <FontAwesome5Icon
            name={"search"}
            color={appColors.secondary}
            size={scale(18)}
          />
        </TouchableOpacity>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
    flexDirection: 'row',
    // height: scale(42),
    backgroundColor: appColors.white,
    borderRadius: scale(20),
    margin: scale(5),
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
  inputSection:{
    // flex: 1,
    // fontFamily: 'Roboto-Regular',
    //fontSize: scale(14),
    borderWidth: 0,
    height:scale(40),
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
});
const mapDispatchToProps = {
  searchByQuery$: searchByQuery,
  resetSearchResults$: resetSearchResults,
  getResultsByTopic$: getResultsByTopic,
};
export default connect(mapStateToProps, mapDispatchToProps)(AutoCompleteForAct);
