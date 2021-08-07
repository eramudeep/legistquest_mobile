import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import CustomLabel from './CustomLabel/CustomLabel';
import {connect} from 'react-redux';
import {sortData} from '../utils/MockData';
import {searchByFilters, sortByOnly} from '../redux/filterActions';
import { getResultsByTopic } from '../redux/searchActions';

function ResultFound({filtersList,searchByFilters$,filterWithInResult,getResultsByTopic$,CaseCount, searchQuery, sortByOnly$, sortByF}) {
  //console.log("searchQuery",searchQuery,"sortByF",sortByF);
  const [sortBy, setSortBy] = useState(sortByF);
  const onChangePicker = (value) => {
    sortByOnly$({ 
      sortBy: value,
    });
    setSortBy(value);
    console.log({filtersList});
    searchByFilters$({...filtersList,SortBy: value?.toString() })

    //getResultsByTopic$({selectedTopic: searchQuery?.text,filterValueList:[ ...filterWithInResult]?.toString(), SortBy :value?.toString(), keepFilters:true});
  };
  if (!CaseCount) return null;
  // return(
  //   <View style={styles.cont}>
  //     <View style={{flex:1,backgroundColor:"red"}}>
  //     <Text>df</Text>
  //     </View>

  //   </View>
  // )
  return (
    <View style={styles.cont}>
      <View style={{flexDirection:"row",flexWrap:"wrap",}}>
        <Text>Found : </Text>
        <CustomLabel
          labelStyle={{padding: 0, fontSize: scale(12)}}
          text={CaseCount}
        />
        <Text> results for query {searchQuery.text} </Text>
      </View>
       
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    //borderBottomWidth: scale(0.3),
    paddingVertical: scale(10),
    //marginTop: scale(10), 
     
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    //flex:1,
    //backgroundColor:"pink"
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    flex:1,
    fontSize: 28,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'blue',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}); 
const mapStateToProps = (state) => ({
  CaseCount: state?.search?.searchTopicResult?.CaseCount,
  searchQuery: state.search.searchQuery,
  sortByF: state.filter.sortBy,
  filterWithInResult: state.filter.filterWithInResult,   
  filtersList: {
    Courtarray: `${state.filter.selectedByCourt?.toString()}`, 
    BenchArray: `${state.filter.selectedByBench?.toString()}`,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    SearchText: state?.search?.searchQuery?.text,
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString() 
  },
});
const mapDispatchToProps = {
  sortByOnly$: sortByOnly,
  getResultsByTopic$:getResultsByTopic,
  searchByFilters$: searchByFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultFound);
