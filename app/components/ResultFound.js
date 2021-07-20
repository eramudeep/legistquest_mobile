import React from 'react'
import { View, Text } from 'react-native'
import { scale } from 'react-native-size-matters'
import {Picker} from '@react-native-picker/picker';
import CustomLabel from './CustomLabel/CustomLabel';
import {connect} from 'react-redux';
 function ResultFound({CaseCount,searchQuery}) {
     console.log("searchQuery",searchQuery);
     if(!CaseCount)
     return null
    return (
        <View style={{height: scale(25), borderBottomWidth:scale(0.3), margin: scale(10), flexDirection:'row', justifyContent:'space-between', flexWrap:'wrap'}}>
            <View style={{flexDirection:'row'}}>
                <Text>Found :  </Text> 
                <CustomLabel labelStyle={{padding:0, fontSize:scale(12) }} text={CaseCount} />
                <Text> results for query  {searchQuery.text} </Text>
            </View>
            
           {/*  <Picker
                 selectedValue={"java"}
                //onValueChange={(itemValue, itemIndex) =>   { setSelectedLanguage(itemValue) }}  
                >
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
                </Picker> */}

        </View>
    )
}



const mapStateToProps = (state) => ({
    CaseCount: state?.search?.searchTopicResult?.CaseCount, 
    searchQuery: state.search.searchQuery,
  });
  const mapDispatchToProps = { 
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ResultFound);
  