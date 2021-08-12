import React, {useEffect,useMemo} from 'react';
import {View, Text, Pressable, StyleSheet,ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLabel from '../CustomLabel/CustomLabel';
import ByBench from './ByBench';
import ByYear from './ByYear';
import RadioGroup from './RadioGroup';
import ByDisposition from './ByDisposition';
import ByIdraf from './ByIdraf';

import {connect} from 'react-redux';
import {searchByFilters} from '../../redux/filterActions';
import { senitizeAnyArray } from '../../utils/common';
function FilterComp({
  filtersList,
  searchByFilters$,
  toggleFilters$,
  filters,
  label,
  Court,
}) {
  const onPress = () => {
    toggleFilters$(label);
  };
  const isFilterOpen = () => {
    return filters?.includes(label);
  };

  const applyFilters = (currentFilter) => { 
    //REMOVE FILTER PENDING FOR COURT (ALL COURTS)
    /* const FiLTER_KEY=  Object.keys(currentFilter)[0]
    const existedFilterValue =filtersList?.[FiLTER_KEY]?.split(",") 
    const currentFilterValue =currentFilter?.[FiLTER_KEY]?.split(",") 
    const newFilterValueSent = currentFilterValue[currentFilterValue?.length-1] 
    const ff=  senitizeAnyArray(newFilterValueSent,existedFilterValue,true)?.filter((item)=> { if(item?.length >=1) return item })
    filtersList[FiLTER_KEY]  = ff?.toString()
      */
     searchByFilters$({...filtersList  ,...currentFilter     }) 
  }; 
   
  const onRemove = (Bench)=>{
    console.log("remove",Bench);
  }
  
    
  return (
    <ScrollView style={{margin: scale(3)}}>
      <Pressable onPress={onPress} style={styles.pressableContainer}>
        <Ionicons
          name={isFilterOpen() ? 'caret-down-outline' : 'caret-forward-outline'}
          size={scale(20)}
        />
        <CustomLabel text={`By ${label}`} labelStyle={styles.itemLabel} />
      </Pressable> 
 
      {isFilterOpen() && (
        <View>
          <Pressable style={{margin: scale(10)}}>
            {label == 'Court' && <RadioGroup applyFilters={applyFilters} list={Court} />}
            {label == 'Bench' && (
              <ByBench onRemove={onRemove} applyFilters={applyFilters} list={Court} />
            )} 
            {label == 'Year' && (
              <ByYear applyFilters={applyFilters} list={Court} />
            )}
            {label == 'Dispositions' && (
              <ByDisposition applyFilters={applyFilters} list={Court} />
            )}
            {label == 'iDRAF' && (
              <ByIdraf applyFilters={applyFilters} list={Court} />
            )}
             
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: scale(12),
    padding: scale(0),
  },
});

const mapStateToProps = (state) => ({
  filtersList: { 
    BenchArray: `${state.filter.selectedByBench?.toString()}` ,//  state.filter.selectedByBench?.length > 0 ?   `${state.filter.selectedByBench?.toString()}` :`${state.filter.selectedByBench?.toString()},` ,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    //Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    Decisionarray: state.filter.selectedByCourt?.length > 1 ?  state.filter.selectedByDecStatus[state.filter.selectedByDecStatus?.length-1] :`${state.filter.selectedByDecStatus?.toString()}`,

    Idrafarray : `${state.filter.selectedByIdraf?.toString()}`, 
    SearchText: state?.search?.searchQuery?.text, 
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString(), // HARD CODING FOR NOW, NEED TO SYNC WITH `ResultFound.js` Component, 
    Courtarray: `${state.filter.selectedByCourt?.toString()}`,   
  },

   
});
const mapDispatchToProps = {
  searchByFilters$: searchByFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo( FilterComp));
