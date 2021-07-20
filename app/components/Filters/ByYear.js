import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import RButton from './RButton';

export default function ByYear({list}) {
  const [selectedYear, setSelectedYear] = useState();
  const getName = (item) => {
    const {DisplayYear} = item;
    return DisplayYear;
  };
  const getCaseCount = (item) => {
    const {CaseCount} = item;
    return CaseCount;
  };

  const _isSelected = (toCompareWith) => {
    return selectedYear === toCompareWith;
  };

  const toggleSelecttion = (item) => {
    const {DisplayYear} = item;
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
