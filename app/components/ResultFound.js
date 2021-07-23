import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import CustomLabel from './CustomLabel/CustomLabel';
import {connect} from 'react-redux';
import {sortData} from '../utils/MockData';
import {sortByOnly} from '../redux/filterActions';
function ResultFound({CaseCount, searchQuery, sortByOnly$, sortByF}) {
  //console.log("searchQuery",searchQuery,"sortByF",sortByF);
  const [sortBy, setSortBy] = useState(sortByF);
  const onChangePicker = (value) => {
    sortByOnly$({
      searchType: searchQuery?.type,
      searchText: searchQuery?.text,
      sortBy: value,
    });
    setSortBy(value);
  };
  if (!CaseCount) return null;
  return (
    <View style={styles.cont}>
      <View style={{flexDirection: 'row', flex: 2, flexWrap: 'wrap'}}>
        <Text>Found : </Text>
        <CustomLabel
          labelStyle={{padding: 0, fontSize: scale(12)}}
          text={CaseCount}
        />
        <Text> results for query {searchQuery.text} </Text>
      </View>
      <View style={{flex: 1}}>
        <Text>Sort by : </Text>

        <RNPickerSelect
          onValueChange={(value) => {
            onChangePicker(value);
          }}
          items={sortData}
          value={sortBy}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
const mapStateToProps = (state) => ({
  CaseCount: state?.search?.searchTopicResult?.CaseCount,
  searchQuery: state.search.searchQuery,
  sortByF: state.filter.sortBy,
});
const mapDispatchToProps = {
  sortByOnly$: sortByOnly,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultFound);
