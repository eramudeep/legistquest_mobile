import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';
import {connect} from 'react-redux';
import {toggleByBench, toggleByIdraf} from '../../redux/filterActions';

function ByIdraf({selectedByBenchs,applyFilters, list, toggleByIdraf$}) {
  const [selectedIdraf, setSelectedIdraf] = useState();
  const getName = (item) => {
    const {CaseCount} = item; 
    return CaseCount;
  };
  const getCaseCount = (item) => {
    const {CaseCount} = item;
    return CaseCount;
  };

  const _isSelected = (toCompareWith) => { 
   return selectedIdraf?.includes(toCompareWith)
  }; 
 
  const toggleSelecttion = (item) => {
    const {CaseCount} = item; 
     toggleByIdraf$(CaseCount); 
     applyFilters && applyFilters({Idrafarray: CaseCount?.toString()});
    if (CaseCount === selectedIdraf) return setSelectedIdraf('');
    setSelectedIdraf(CaseCount);
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
           // getCaseCount={getCaseCount}
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
    toggleByIdraf$: toggleByIdraf,
   
};
export default connect(mapStateToProps, mapDispatchToProps)(ByIdraf);
