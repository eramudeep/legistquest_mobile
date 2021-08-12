import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';
import {connect} from 'react-redux';
import {toggleByBench} from '../../redux/filterActions';

function ByBench({onRemove, selectedByBenchs,applyFilters, list, toggleByBench$}) {
  const [selectedBench, setSelectedBench] = useState();
  const getName = (item) => {
    const {Bench} = item;
    return Bench;
  };
  const getCaseCount = (item) => {
    const {BenchCaseCount} = item;
    return BenchCaseCount;
  };

  const _isSelected = (toCompareWith) => {
    //return selectedBench === toCompareWith;
   return selectedByBenchs?.includes(toCompareWith)
  };
  //console.log("selectedByBenchs",selectedByBenchs);
 
  const toggleSelecttion = (item) => {
    const {Bench} = item;
    toggleByBench$(Bench);
    
    applyFilters && applyFilters({BenchArray: `${Bench?.toString()},`});
    if (Bench === selectedBench) { 
      console.log("onRemove",onRemove);
      onRemove && onRemove(Bench)
        setSelectedBench('')
    };
    setSelectedBench(Bench);
  };

  return (
    <View>
      {list?.map((item, key) => {
        return (
          <RButton
            item={item}
            getName={getName}
            _isSelected={_isSelected}
            toggleSelecttion={toggleSelecttion}
            getCaseCount={getCaseCount}
            key={key}
          />
        );
      })}
    </View>
  );
}

const mapStateToProps = (state) => ({
  searchResults: state.filter.searchResults,
  selectedByBenchs:state.filter.selectedByBench
});
const mapDispatchToProps = {
  toggleByBench$: toggleByBench,
};
export default connect(mapStateToProps, mapDispatchToProps)(ByBench);
