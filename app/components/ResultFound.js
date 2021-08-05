import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import CustomLabel from './CustomLabel/CustomLabel';
import {connect} from 'react-redux';
import {sortData} from '../utils/MockData';
import {sortByOnly} from '../redux/filterActions';
import { getResultsByTopic } from '../redux/searchActions';

function ResultFound({filterWithInResult,getResultsByTopic$,CaseCount, searchQuery, sortByOnly$, sortByF}) {
  //console.log("searchQuery",searchQuery,"sortByF",sortByF);
  const [sortBy, setSortBy] = useState(sortByF);
  const onChangePicker = (value) => {
    sortByOnly$({
     /*  searchType: searchQuery?.type,
      searchText: searchQuery?.text, */
      sortBy: value,
    });
    setSortBy(value);
    getResultsByTopic$({selectedTopic: searchQuery?.text,filterValueList:[ ...filterWithInResult]?.toString(), SortBy :value?.toString(), keepFilters:true});
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
      <View style={{flex: 1,}}>
        <Text style={{marginTop:scale(5)}}>Sort by : </Text>
        <RNPickerSelect
          onValueChange={(value) => {
            onChangePicker(value);
          }}
          items={sortData}
          value={sortBy}
          // style={pickerSelectStyles}
          fixAndroidTouchableBug
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    borderBottomWidth: scale(0.3),
    paddingVertical: scale(10),
    marginTop: scale(10),
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    flex:1,
    // backgroundColor:"pink"
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
});
const mapDispatchToProps = {
  sortByOnly$: sortByOnly,
  getResultsByTopic$:getResultsByTopic
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultFound);
