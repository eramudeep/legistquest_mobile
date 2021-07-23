import React, {useEffect,useMemo} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLabel from '../CustomLabel/CustomLabel';
import ByBench from './ByBench';
import ByYear from './ByYear';
import RadioGroup from './RadioGroup';
import ByDisposition from './ByDisposition';
import {connect} from 'react-redux';
import {searchByFilters} from '../../redux/filterActions';
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
    //console.log({...filtersList,...currentFilter});
     searchByFilters$({...filtersList,...currentFilter}) 
  }; 
   
   
  return (
    <View style={{margin: scale(3)}}>
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
            {label == 'Court' && <RadioGroup list={Court} />}
            {label == 'Bench' && (
              <ByBench applyFilters={applyFilters} list={Court} />
            )}
            {label == 'Year' && (
              <ByYear applyFilters={applyFilters} list={Court} />
            )}
            {label == 'Dispotions' && (
              <ByDisposition applyFilters={applyFilters} list={Court} />
            )}
          </Pressable>
        </View>
      )}
    </View>
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
    BenchArray: `${state.filter.selectedByBench?.toString()}`,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    SearchText: state?.search?.searchQuery?.text,
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString(), // HARD CODING FOR NOW, NEED TO SYNC WITH `ResultFound.js` Component, 
   /*  SelectedFilter: "benchfilter",
    PageNo:1,
    Idrafarray:"",
    Partyarray:"", 
    Filter:"", 
    Courtarray:"",   */
  },

   
});
const mapDispatchToProps = {
  searchByFilters$: searchByFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo( FilterComp));
