import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';

export default function ByBench({list}) {
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
    return selectedBench === toCompareWith;
  };

  const toggleSelecttion = (item) => {
    const {Bench} = item;
    setSelectedBench(Bench);
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
