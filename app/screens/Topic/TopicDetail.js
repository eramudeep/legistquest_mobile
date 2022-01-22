import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import Details from '../Details';
import {DETAILS_API, GETOCRDATABYCITEDIN, GET_OCR_DATA_BY_CITATION} from '../../services/ApiList';
import LoadingModal from '../../components/Modals/LoadingModal';
import { appColors } from '../../utils/appColors';


export default function TopicDetail({route, navigation}) {
  const {LinkText, HighlightedText, item} = route.params;
 
  const [viewModel, setViewModel] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const [citiedInData, setCitiedInData] = useState()
  const [futureRefData, setfutureRefData] = useState()
  const getViewModel = async ()=>{
    const {LinkText, EncryptedId} = item;
    const Ltext=LinkText
    const EncID=EncryptedId

    const label = parseParam(Ltext);
    const URL = `${DETAILS_API}${label}/${EncID}`; 
    const respounce = await fetch(URL); 
    const result = await respounce.json();
    setViewModel(result?.viewModel);
     //console.log("result?.viewModel?.Status",result?.viewModel?.Status,{paramStatus});
  }
  const getDetailsScreenData = async (data,paramStatus) => {
    setIsLoading(true) 
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
     
    const label = parseParam(Ltext);
    const URL = `${DETAILS_API}${label}/${EncID}`; 
    const respounce = await fetch(URL); 
    const result = await respounce.json();
     console.log("result?.viewModel?.Status",result?.viewModel?.Status,{paramStatus});
     
const citiedUrl=`${paramStatus? GET_OCR_DATA_BY_CITATION:  GETOCRDATABYCITEDIN}?caseId=${result?.viewModel?.EncryptedId}&status=${paramStatus? paramStatus:'Cases Cited In'}`
 
const respounceCitied = await fetch(citiedUrl);
const resultCitied = await respounceCitied.json();
  //console.log("resss",resultCitied,{citiedUrl});
    //setViewModel(result?.viewModel);
    if(paramStatus){
      setfutureRefData(resultCitied)
    }
    else{
      setCitiedInData(resultCitied)
    }
    setIsLoading(false)
    //console.log("end get detail");
  }; 
  const parseParam = (str) => {
    str?.replace(/./g, '');
    return str?.replace(/\s/g, '-');
  };
   
  useEffect(() => {
    getViewModel()
  }, [ ]);
  
  useEffect(() => {
    getDetailsScreenData( );
    getDetailsScreenData(null,viewModel?.OcrDtoList?.[0]?.caseStatus? viewModel?.OcrDtoList?.[0]?.caseStatus: "referred");//OcrDtoList
     
  }, [LinkText, HighlightedText,viewModel]);
  console.log({viewModel,item});

    
  return ( 
    <Container
      isScrollable
      showHome
      showMenu
      showSignin
      //bodyStyle={{backgroundColor:appColors.lighterGray}}
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
        {isLoading ?  <View style={{backgroundColor:appColors.white,flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size="large" color={appColors.secondary} />
          </View>
           : <Details navigation={navigation}  viewModel={viewModel} item={item} futureRefData={futureRefData} citiedInData={citiedInData} onPressCitiedCase={getDetailsScreenData}/>
          }

        
      </View>
      {/* <LoadingModal visible={isLoading}/> */}
      
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
