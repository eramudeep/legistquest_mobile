import React, {useEffect, useState} from 'react';
import {Keyboard,StyleSheet, Text, View, ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomIcon from '../../components/CustomIcon';
import CustomInput from '../../components/CustomInput';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import {appColors} from '../../utils/appColors';
import {homeData} from '../../utils/MockData';
import {connect} from 'react-redux';
import {searchByQuery} from '../../redux/searchActions';
import CustomAutoComplete from '../../components/CustomAutoComplete';

function Home({navigation, searchResults, searchByQuery$}) {
  const [query, setQuery] = useState('');
  const [searchIcon, setSearchIcon] = useState("search")//spinner
   const [searchResultsFiltred, setSearchResultsFiltred] = useState(searchResults)
  const onChange = (change) => {
    searchByQuery$(change);
    setQuery(change);
    setSearchIcon("spinner")
  };
  useEffect(() => {
    setSearchResultsFiltred(searchResults)
  }, [searchResults])
  //console.log("searchResults",searchResults);
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
            data={searchResultsFiltred}
            onChangeText={onChange}
            itemOnPress={(item) => { 
              Keyboard.dismiss()
              setQuery(item.Value);
              setSearchResultsFiltred([]);
              setSearchIcon("search")
            }
              
            }
            icon={searchIcon}
          />
         

        {/* <CustomInput onChangeText={onChange} placeholder={"Search Free Text..."} rightIcon={"search"} iconSize={scale(20)} onRightIcon={()=>navigation.navigate("Topic")}/> */}

        {homeData.map((val, key) => {
          return (
            <View key={key} style={styles.flexView}>
              <CustomLabel text={val.label} labelStyle={styles.label} />
              <CustomLabel text={val.value} labelStyle={styles.label1} />
            </View>
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
