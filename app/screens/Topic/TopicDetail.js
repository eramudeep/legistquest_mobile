import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import Details from '../Details';
import {DETAILS_API, GETOCRDATABYCITEDIN} from '../../services/ApiList';
import LoadingModal from '../../components/Modals/LoadingModal';


export default function TopicDetail({route, navigation}) {
  const {LinkText, HighlightedText, item} = route.params;
  const [viewModel, setViewModel] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [citiedInData, setCitiedInData] = useState()
  const getDetailsScreenData = async (data) => {
    setIsLoading(true)
    console.log("in get detail");
    let Ltext
    let EncID
    if(data){
      
      const {LinkText, EncryptedId} = data;
      Ltext=LinkText
      EncID=EncryptedId
    }
    else{
      const {LinkText, EncryptedId} = item;
      Ltext=LinkText
      EncID=EncryptedId
    }
    console.log("in get detail 2",Ltext,EncID);
    const label = parseParam(Ltext);
    const URL = `${DETAILS_API}${label}/${EncID}`;

    const respounce = await fetch(URL);
    // console.log("in get detail 3",respounce);
    const result = await respounce.json();
    console.log("result?.viewModel",result?.viewModel);
    //>>get citied in<<<
const citiedUrl=`${GETOCRDATABYCITEDIN}?caseId=${result?.viewModel?.EncryptedId}&status=${result?.viewModel?.Status}`
console.log("citiedUrl",citiedUrl);
const respounceCitied = await fetch(citiedUrl);
const resultCitied = await respounceCitied.json();
// console.log("resss",respounceCitied);
    setViewModel(result?.viewModel);
    setCitiedInData(resultCitied)
    setIsLoading(false)
    console.log("end get detail");
  }; 
  const parseParam = (str) => {
    str?.replace(/./g, '');
    return str?.replace(/\s/g, '-');
  };
  // useEffect(
  //   () => {
  //     let timer1 = setTimeout(() => setIsLoading(false),4000);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   []
  // );
  useEffect(() => {
    getDetailsScreenData();
  }, [LinkText, HighlightedText]);
  return (
    <Container
      isScrollable
      showHome
      showMenu
      onHome={() => navigation.navigate('Home')}>
      <View>
        {/* <CustomLabel
          text={LinkText}
          labelStyle={styles.title}
        />
        <CustomLabel
          text={HighlightedText}
          labelStyle={styles.bodyText}
        /> */}
        <Details viewModel={viewModel} item={item} citiedInData={citiedInData} onPressCitiedCase={getDetailsScreenData}/>
      </View>
      <LoadingModal visible={isLoading}/>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  bodyText: {},
});
