import React, {useEffect, useState} from 'react';
import {Keyboard, StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomIcon from '../../components/CustomIcon';
import CustomInput from '../../components/CustomInput';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import {appColors} from '../../utils/appColors';
import {homeData} from '../../utils/MockData';
import {connect} from 'react-redux';
import {searchByQuery, resetSearchResults, getResultsByTopic} from '../../redux/searchActions';
import CustomAutoComplete from '../../components/CustomAutoComplete';
import { debounce } from "lodash";
import { TYPE_FREE_TEXT } from '../../services/ApiList';
import { setSearchType as setSearchTypeLocal, } from '../../utils/searchTypeHelper';

function Home({
  navigation,
  resetSearchResults$,
  searchResults,
  searchByQuery$,
  getResultsByTopic$
}) {
  const [query, setQuery] = useState('');
  const [searchIcon, setSearchIcon] = useState('search'); //spinner
  const [searchType, setSearchType] = useState(TYPE_FREE_TEXT)
  const [typing, setTyping] = useState(false)
  //const [searchResultsFiltred, setSearchResultsFiltred] = useState(searchResults)
  const onChange = (change) => {
    debouncedSearch(change); 
  };
  const debouncedSearch = debounce(function (change) {
    searchByQuery$({type:searchType,text:change});
    setQuery(change);
    setSearchIcon('spinner');
    
  }, 1000);

  
  return (
    <Container
      showFooter
      showHome
      showMenu
      hideLogo
      showSignin
      onSignin={() => navigation.navigate('Login')}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <CustomIcon iconStyle={{width: scale(300), height: scale(100)}} />

        <CustomAutoComplete
          defaultValue={query}
          placeholder={'Search free text...'}
          data={typing && [...searchResults]}
          onChangeText={onChange}
          onFocus={()=>{setTyping(true)}} 
          itemOnPress={(item) => {
            getResultsByTopic$({selectedTopic:item.Value})
            Keyboard.dismiss();
            setQuery(item.Value);
            setTyping(false)
            //resetSearchResults$();
            setSearchIcon('search');
            navigation.navigate("Topic",{selectedTopic:item.Value})
          }}
          // onIconPress={()=>navigation.navigate("Topic")}
          icon={searchIcon}
        />

        {/* <CustomInput onChangeText={onChange} placeholder={"Search Free Text..."} rightIcon={"search"} iconSize={scale(20)} onRightIcon={()=>navigation.navigate("Topic")}/> */}

        {homeData.map((val, key) => {
          return (
            <TouchableOpacity key={key} style={styles.flexView} onPress={async ()=>{
              setSearchTypeLocal(val.key)
              setSearchType(val.key)}}>
              <CustomLabel text={val.label} labelStyle={styles.label} />
              <CustomLabel text={val.value} labelStyle={[styles.label1,val.key===searchType&& {color:appColors.green}]} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({ 
  searchResults: state.search.searchResults,
});
const mapDispatchToProps = {
  searchByQuery$: searchByQuery,
  resetSearchResults$: resetSearchResults,
  getResultsByTopic$:getResultsByTopic
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  label: {
    flex: 2,
  },
  flexView: {flexDirection: 'row'},
  label1: {
    flex: 1,
    color: appColors.blue,
  },
});
