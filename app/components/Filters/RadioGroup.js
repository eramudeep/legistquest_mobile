import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import CustomLabel from '../CustomLabel/CustomLabel';
import Ionicons from 'react-native-vector-icons/Ionicons';
const courtList = [
  {
    CourtName: 'HIGH COURT',
    CaseCount: 2272,
    CaseIds: '2-HC',
    SubCourtList: [
      {
        SubCourtName: 'ALLAHABAD MAIN',
        SubCourtCaseCount: 300,
        SubCourtCaseIds: 7,
        IsHaveSegregation: 'Y',
      },
      {
        SubCourtName: 'LUCKNOW',
        SubCourtCaseCount: 47,
        SubCourtCaseIds: 10,
        IsHaveSegregation: 'N',
      },
    ],
  },
  {
    CourtName: 'SUPREME COURT',
    CaseCount: 922,
    CaseIds: '2-HC',
  },
];
export default function RadioGroup() {
  const [selected, setSelected] = useState();
  const [selectedSubCourt, setSelectedSubCourt] = useState();
  const _isSelected = (toCompareWith) => {
    return selected === toCompareWith || selectedSubCourt === toCompareWith;
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
  };
  const RenderRadio = ({item}) => {
    const {SubCourtCaseIds, CaseIds, IsHaveSegregation, SubCourtList} = item;
    return (
      <>
        <Pressable
          onPress={
            () => toggleSelecttion(item) /* setSelected(getName(item)) */
          }
          style={styles.row}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={
                _isSelected(getName(item))
                  ? [styles.radioContChecked]
                  : [styles.radioContUnChecked]
              }
            />
            <CustomLabel text={getName(item)} />
          </View>
          {/*can be used to show iDraf*/}
          {IsHaveSegregation && <Ionicons name="flower-outline" />}
          <CustomLabel text={getCaseCount(item)} />
        </Pressable>
        {_isSelected(getName(item)) && (
          <View style={{marginLeft: scale(10)}}>
            {SubCourtList?.map((subCourt, key) => {
              return <RenderRadio item={subCourt} key={key} />;
            })}
          </View>
        )}
      </>
    );
  };
  return (
    <View>
      {courtList?.map((item, key) => {
        return <RenderRadio item={item} key={key} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  radioContUnChecked: {
    borderWidth: scale(3),
    borderColor: appColors.blue,
    backgroundColor: appColors.white,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(15),
    marginRight: scale(10),
    alignItems: 'center',
  },
  radioContChecked: {
    borderWidth: scale(8),
    borderColor: appColors.blue,
    backgroundColor: appColors.white,
    height: scale(25),
    width: scale(25),
    borderRadius: scale(15),
    marginRight: scale(10),
    alignItems: 'center',
  },
  row: {
    padding: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    //backgroundColor:'red'
  },
});
