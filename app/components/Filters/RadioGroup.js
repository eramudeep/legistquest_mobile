import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet, ScrollView, FlatList} from 'react-native';
import {scale} from 'react-native-size-matters';
import RButton from './RButton';
import {connect} from 'react-redux';
import { toggleByCourt } from '../../redux/filterActions';
function RadioGroup({selectedByCourt,toggleByCourt$,applyFilters, list}) {
   console.log("listlistlist");
  const [selected, setSelected] = useState();
  const [CaseIdss, setCaseIds] = useState()
  const [selectedSubCourt, setSelectedSubCourt] = useState();
  const [selectedSubSubCourt, setSelectedSubSubCourt] = useState();
  const [universalSelectedCourt, setUniversalSelectedCourt] = useState([]);
  const _isSelected = (toCompareWith) => {
   return selectedByCourt?.includes(toCompareWith)
    //return selected === toCompareWith || selectedSubCourt === toCompareWith || selectedSubSubCourt === toCompareWith ;
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
    const {SubCourtName, CourtName,CaseIds,SubCourtCaseIds} = item; 
    
    if (CourtName) {
       //for first selection/level
      setCaseIds(CaseIds)
      applyFilters && applyFilters({Courtarray:  CaseIds?.toString()}); 
      setSelectedSubCourt(undefined);   
      setSelectedSubSubCourt(undefined)
      toggleByCourt$(getName(item))
      toggleByCourt$(CaseIds)
      return setSelected(getName(item));
    }  else {
      if(selectedSubCourt){
        console.log("in 1 else");
        /* applyFilters && applyFilters({Courtarray:  `${CaseIdss?.toString()},${SubCourtName?.toString()},${selectedSubSubCourt?.toString()}`});
        setSelectedSubSubCourt(SubCourtName)
        toggleByCourt$(SubCourtName)  */
        
      }  else{
        //level 2
        console.log("in 2 else");
        applyFilters && applyFilters({Courtarray:  `${selectedByCourt?.toString()},${SubCourtName?.toString()}`});
        toggleByCourt$(SubCourtName)
       return setSelectedSubCourt(SubCourtName)
      } 
      
    }  
     /* applyFilters && applyFilters({Courtarray:  `${CaseIdss?.toString()},${SubCourtName?.toString()}`});
       return setSelectedSubCourt(SubCourtName); */
    /* if (CourtName) 
        return  setUniversalSelectedCourt([CourtName]) 
        const tmpUniversalSelectedCourt =universalSelectedCourt
        if(universalSelectedCourt.length >2)
         tmpUniversalSelectedCourt.splice(-1,1)
    return  setUniversalSelectedCourt([...tmpUniversalSelectedCourt,SubCourtName]) */
  };

  const RenderRadio = ({item}) => {
     
    const {IsHaveSegregation, SubCourtList,CourtName} = item;
    //console.log({CourtName});
    return (
      <>
        <RButton
          item={item}
          getName={getName}
          _isSelected={_isSelected}
          toggleSelecttion={toggleSelecttion}
          getCaseCount={getCaseCount}
          IsHaveSegregation={IsHaveSegregation==="Y"}
        />

        {CourtName !="SUPREME COURT" && _isSelected(getName(item)) && (
          <View style={{marginLeft: scale(10)}}>
            {SubCourtList?.map((subCourt, key) => {
              return (
                <RenderRadio  
                  item={subCourt}
                  key={key}
                />
              );
            })}
          </View>
        )}
      </>
    );
  }; 
  return <FlatList keyExtractor={(item,index)=>  `${new Date().getTime()}_${item.CourtName}`}   renderItem={({item,index})=><RenderRadio item={item} key={index} /> } data={list}  />
}

const mapStateToProps = (state) => ({
  selectedByCourt:  state.filter.selectedByCourt, 
   
});
const mapDispatchToProps = {
  toggleByCourt$: toggleByCourt,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RadioGroup));
