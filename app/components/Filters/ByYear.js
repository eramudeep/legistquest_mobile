import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {toggleByYear} from '../../redux/filterActions';
import RButton from './RButton';
import {connect} from 'react-redux';
function ByYear({applyFilters,list, toggleByYear$, selectedByYear}) {
  const [selectedYear, setSelectedYear] = useState();
  const getName = (item) => {
    const {DisplayYear} = item;
    return DisplayYear;
  };
  const getCaseCount = (item) => {
    const {CaseCount} = item;
    return CaseCount;
  };
   //console.log({selectedByYear});
  const _isSelected = (toCompareWith) => {
    return selectedByYear?.includes(toCompareWith)
    //return selectedYear === toCompareWith;
  };

  const toggleSelecttion = (item) => {
    const {DisplayYear} = item;
    toggleByYear$(DisplayYear);
    applyFilters && applyFilters({Yeararray: DisplayYear?.toString()});
    if (DisplayYear === selectedYear) return setSelectedYear('');
    setSelectedYear(DisplayYear);
  };

  return (
    <ScrollView>
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
    </ScrollView>
  );
}

const mapStateToProps = (state) => ({
  selectedByYear: state.filter.selectedByYear,
});
const mapDispatchToProps = {
  toggleByYear$: toggleByYear,
};
export default connect(mapStateToProps, mapDispatchToProps)(ByYear);
