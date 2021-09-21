import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';
import {connect} from 'react-redux';
import {toggleByDecsion, toggleByDecsionLabel} from '../../redux/filterActions';
function ByDisposition({onRemove,applyFilters,list, toggleByDecsion$,selectedByDecStatus,toggleByDecsionLabel$,selectedByDecStatusLabel}) {
  const [selectedBench, setSelectedBench] = useState(  selectedByDecStatus[selectedByDecStatus?.length-1]  ); 
  const getName = (item) => {
    const {DecisionStatusName,StatusId} = item;
    return DecisionStatusName;
  };
  const getCaseCount = (item) => {
    const {CaseCount} = item;
    return CaseCount;
  };
 
  const _isSelected = (toCompareWith) => { 
     return   selectedByDecStatusLabel?.includes( toCompareWith);
    //return   selectedByDecStatus?.includes( toCompareWith);
  };
  //console.log({selectedBench}); 

  const toggleSelecttion = (item) => { 
    /* const {DecisionStatusName,StatusId} = item; 
    toggleByDecsion$(DecisionStatusName);  
    if (DecisionStatusName === selectedBench) {
      applyFilters && applyFilters({Decisionarray: ""});
      return setSelectedBench('');
    }
    else{
      applyFilters && applyFilters({Decisionarray: `${StatusId?.toString()},`});
    }
    setSelectedBench(DecisionStatusName); */

    const {DecisionStatusName,StatusId} = item;  
    toggleByDecsionLabel$(DecisionStatusName);  
    toggleByDecsion$(StatusId);  
    if (StatusId === selectedBench) { 
      //applyFilters && applyFilters({Decisionarray: ""});
       onRemove && onRemove("Decisionarray")
       setSelectedBench('');
    }
    else{
       
      applyFilters && applyFilters({Decisionarray: `${StatusId?.toString()}`});
    }
    setSelectedBench(StatusId);


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
  selectedByDecStatusLabel: state.filter.selectedByDecStatusLabel
});
const mapDispatchToProps = {
  toggleByDecsion$: toggleByDecsion,
  toggleByDecsionLabel$:toggleByDecsionLabel
};
export default connect(mapStateToProps, mapDispatchToProps)(ByDisposition);
