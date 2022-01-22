import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, View, ScrollView, TouchableOpacity,Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomIcon from '../../components/CustomIcon';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import { appColors } from '../../utils/appColors';
import { homeData } from '../../utils/MockData';
import { connect } from 'react-redux';
import { searchByQuery, resetSearchResults, getResultsByTopic } from '../../redux/searchActions';
import CustomAutoComplete from '../../components/CustomAutoComplete'; 
import { TYPE_ACT, TYPE_FREE_TEXT } from '../../services/ApiList';
import { setSearchType as setSearchTypeLocal, } from '../../utils/searchTypeHelper';
import AutoCompleteForAct from '../../components/AutoCompleteForAct';
import { getUserLogout } from '../../redux/actions';
import { AlertHelper } from '../../utils/AlertHelper';
import SearchBox from '../../components/SearchBox'
import IdrafComp from '../../components/IdrafComp';
import { actualDownload, downloadFilePDF } from '../../services/downloadFile';

function Home({
  navigation,
  searchByQuery$,
  userToken,
  userLogout$
}) {

  const [searchType, setSearchType] = useState(TYPE_FREE_TEXT)
  const [searching, setsearching] = useState(false)
  //const [searchResultsFiltred, setSearchResultsFiltred] = useState(searchResults)
 
 
  const onSignin = () => {
    if (userToken) {
      userLogout$({ usertoken: userToken, callback })
    }
    else {
      navigation.navigate('Login')
    }
  }
  const callback = (res) => {
    if (res.status == true) {
      AlertHelper.show("success", "Success", "User Logout successful")
    }
  } 
  return (
    <Container
      showFooter
      showHome
      //showMenu
      hideLogo
      showSignin
      signInLabel={userToken ? "Logout" : "Sign In"}
      showProfile={userToken}
      //isScrollable
      onSignin={onSignin}> 

      <View style={[{ flex: 1 } ,  { justifyContent: 'center'  }]}> 
        <CustomIcon iconStyle={{ width:  "100%", height: scale(100) }} /> 
        
          {/* <IdrafComp />   */}
      <View style={{marginBottom:scale(20)}}>
      <CustomAutoComplete onBlur={(val) => { setsearching(val) }} navigation={navigation} />
      </View>

        {/* <CustomInput onChangeText={onChange} placeholder={"Search Free Text..."} rightIcon={"search"} iconSize={scale(20)} onRightIcon={()=>navigation.navigate("Topic")}/> */}

        {!searching && homeData?.map((val, key) => {
          const { pl } = val
          return (
            <TouchableOpacity key={key} style={styles.flexView} onPress={async () => {
              setSearchTypeLocal(val.key)
              searchByQuery$({ type: val.key, text: "" })
              setSearchType(val.key)
              return navigation.navigate(key==4?"SearchboxForAct": "SearchBox")
            }}>
              <CustomLabel text={val.label} labelStyle={styles.label} />
              <CustomLabel text={val.value} labelStyle={[styles.label1, val.key === searchType && { color: appColors.green }]} />
            </TouchableOpacity>
          );
        })}
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
  userToken: state.auth.userData?.data?.userToken
});
const mapDispatchToProps = {
  searchByQuery$: searchByQuery,
  resetSearchResults$: resetSearchResults,
  getResultsByTopic$: getResultsByTopic,
  userLogout$: getUserLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  label: {
    flex: 2,
  },
  flexView: { flexDirection: 'row'  },
  label1: {
    flex: 1,
    color: appColors.blue,
  },
});
