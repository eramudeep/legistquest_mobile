import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import CustomLabel from '../CustomLabel/CustomLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RButton from './RButton';

export default function RadioGroup({list}) {
  const [selected, setSelected] = useState();
  const [selectedSubCourt, setSelectedSubCourt] = useState();
  const [universalSelectedCourt, setUniversalSelectedCourt] = useState([]);
  const _isSelected = (toCompareWith) => {
    return selected === toCompareWith || selectedSubCourt === toCompareWith;
    //return universalSelectedCourt.includes(toCompareWith)
  };
  const getName = (item) => {
    const {SubCourtName, CourtName} = item;
    if (SubCourtName) return SubCourtName;
    return CourtName;
  };

  const getCaseCount = (item) => {
    const {SubCourtCaseCount, CaseCount} = item;
    if (CaseCount) return CaseCount;
    return SubCourtCaseCount;
  };

  const toggleSelecttion = (item) => {
    const {SubCourtName, CourtName} = item;
    setSelectedSubCourt(undefined);
    if (CourtName) return setSelected(getName(item));
    return setSelectedSubCourt(SubCourtName);
    /* if (CourtName) 
        return  setUniversalSelectedCourt([CourtName]) 
        const tmpUniversalSelectedCourt =universalSelectedCourt
        if(universalSelectedCourt.length >2)
         tmpUniversalSelectedCourt.splice(-1,1)
    return  setUniversalSelectedCourt([...tmpUniversalSelectedCourt,SubCourtName]) */
  };

  const RenderRadio = ({item}) => {
    const {IsHaveSegregation, SubCourtList} = item;
    return (
      <>
        <RButton
          item={item}
          getName={getName}
          _isSelected={_isSelected}
          toggleSelecttion={toggleSelecttion}
          getCaseCount={getCaseCount}
          IsHaveSegregation={IsHaveSegregation}
        />

        {_isSelected(getName(item)) && (
          <View style={{marginLeft: scale(10)}}>
            {SubCourtList?.map((subCourt, key) => {
              return (
                <RButton
                  key={key}
                  item={subCourt}
                  getName={getName}
                  _isSelected={_isSelected}
                  toggleSelecttion={toggleSelecttion}
                  getCaseCount={getCaseCount}
                  IsHaveSegregation={IsHaveSegregation}
                />
              );
            })}
          </View>
        )}
      </>
    );
  };
  return (
    <ScrollView nestedScrollEnabled>
      {list?.map((item, key) => {
        return <RenderRadio item={item} key={key} />;
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  radioContUnChecked: {
    borderWidth: scale(3),
    borderColor: appColors.blue,
    backgroundColor: appColors.white,
    height: scale(22),
    width: scale(22),
    borderRadius: scale(15),
    marginRight: scale(10),
    alignItems: 'center',
  },
  radioContChecked: {
    borderWidth: scale(8),
    borderColor: appColors.blue,
    backgroundColor: appColors.white,
    height: scale(22),
    width: scale(22),
    borderRadius: scale(15),
    marginRight: scale(10),
    alignItems: 'center',
  },
  row: {
    padding: scale(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    //backgroundColor:'red'
  },
});