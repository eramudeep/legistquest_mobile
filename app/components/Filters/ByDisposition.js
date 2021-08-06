import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';
import {connect} from 'react-redux';
import {toggleByDecsion} from '../../redux/filterActions';
function ByDisposition({applyFilters,list, toggleByDecsion$,selectedByDecStatus}) {
  const [selectedBench, setSelectedBench] = useState();
  const getName = (item) => {
    const {DecisionStatusName} = item;
    return DecisionStatusName;
  };
  const getCaseCount = (item) => {
    const {CaseCount} = item;
    return CaseCount;
  };
 
  const _isSelected = (toCompareWith) => {
    
    return   selectedByDecStatus?.includes( toCompareWith);
  };
  console.log({selectedBench}); 

  const toggleSelecttion = (item) => { 
    const {DecisionStatusName,StatusId} = item; 
    toggleByDecsion$(DecisionStatusName);  
    if (DecisionStatusName === selectedBench) {
      applyFilters && applyFilters({Decisionarray: ""});
      return setSelectedBench('');
    }
    else{
      applyFilters && applyFilters({Decisionarray: `${StatusId?.toString()},`});
    }
    setSelectedBench(DecisionStatusName);
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
  selectedByDecStatus: state.filter.selectedByDecStatus,
});
const mapDispatchToProps = {
  toggleByDecsion$: toggleByDecsion,
};
export default connect(mapStateToProps, mapDispatchToProps)(ByDisposition);
