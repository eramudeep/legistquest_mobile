import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';

export default function ByDisposition({list}) {
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
    return selectedBench === toCompareWith;
  };

  const toggleSelecttion = (item) => {
    const {DecisionStatusName} = item;
    if (DecisionStatusName === selectedBench) return setSelectedBench('');
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
