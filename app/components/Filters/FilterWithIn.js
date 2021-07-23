import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import Icon from '../CustomIcon/Icon';
import {connect} from 'react-redux';
import { searchByFilters, toggleFiltersWithInResult } from '../../redux/filterActions';
import { getResultsByTopic } from '../../redux/searchActions';
import { senitizeAnyArray } from '../../utils/common';
function FilterWithIn({filterWithInResult,toggleFiltersWithInResult$,
  searchQuery, 
  SortBy,
  getResultsByTopic$,
  selectedByYear,selectedByBench,selectedByDecStatus,
  filtersList,
  searchByFilters$
}) {

  const removeFilter = (item)=>{  
    toggleFiltersWithInResult$(item)    
     if(selectedByYear?.length >0 || selectedByBench?.length >0  || selectedByDecStatus?.length >0 )  {
       //any filter applied then call by filter api
        filtersList.FilterValueList= filterWithInResult
        const filtersList_= filtersList 
        searchByFilters$(filtersList_) 
     }
     else 
      getResultsByTopic$({selectedTopic: searchQuery?.text,filterValueList:filterWithInResult , SortBy :SortBy?.toString(), keepFilters:true}); 
  }
  const Card = ({item}) => {  
    return (
      <Pressable
        onPress={()=> removeFilter(item)}
        style={{
          backgroundColor: appColors.lighterGray,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: scale(5),
          paddingHorizontal: scale(10),
        }}>
        <Text style={{color: appColors.blue}}>{item}</Text>
        <View
          style={{
            marginRight: scale(5),
            marginLeft: scale(5),
            width: scale(1),
            backgroundColor: appColors.blue,
          }}
        />
        <Icon name={'times'} size={scale(15)} color={appColors.blue} />
      </Pressable>
    );
  };
  // return <Card />;
   //console.log({filterWithInResult});
  if (filterWithInResult?.length < 1) return null;
  return (
    <View style={{marginTop: scale(10), marginBottom: scale(10)}}>
      <FlatList
        style={{height: scale(25)}}
        horizontal
        data={filterWithInResult||[]}
        ItemSeparatorComponent={() => <View style={{padding: scale(3)}} />}
        renderItem={({item}) => <Card item={item} />}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  filterWithInResult: state.filter.filterWithInResult,
  searchQuery: state.search.searchQuery, 
  SortBy: state.filter.sortBy?.toString(),
  selectedByYear: state.filter.selectedByYear, 
  selectedByBench:state.filter. selectedByBench, 
  selectedByDecStatus:state.filter.selectedByDecStatus,
  filtersList: {
    BenchArray: `${state.filter.selectedByBench?.toString()}`,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    SearchText: state?.search?.searchQuery?.text,
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString(), 
  },
});
const mapDispatchToProps = {
    toggleFiltersWithInResult$: toggleFiltersWithInResult,  
    getResultsByTopic$: getResultsByTopic,
    searchByFilters$: searchByFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterWithIn);
