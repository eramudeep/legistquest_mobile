import React from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../../utils/appColors';
import Icon from '../CustomIcon/Icon';
import {connect} from 'react-redux';
import { toggleFiltersWithInResult } from '../../redux/filterActions';
function FilterWithIn({filterWithInResult,toggleFiltersWithInResult$}) {
  const Card = ({item}) => { 
    return (
      <Pressable
      onPress={()=> toggleFiltersWithInResult$(item)}
        style={{
          backgroundColor: appColors.lighterGray,
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: scale(5),
          paddingHorizontal: scale(10),
        }}>
        <Text style={{color: appColors.blue}}>{item}</Text>
        <View
          style={{
            marginRight: scale(5),
            marginLeft: scale(5),
            width: scale(1),
            backgroundColor: appColors.blue,
          }}
        />
        <Icon name={'times'} size={scale(15)} color={appColors.blue} />
      </Pressable>
    );
  };
  // return <Card />;
  console.log("filterWithInResult",filterWithInResult);
  if (filterWithInResult?.length < 1) return null;
  return (
    <View style={{marginTop: scale(10), marginBottom: scale(10)}}>
      <FlatList
        style={{height: scale(25)}}
        horizontal
        data={filterWithInResult||[]}
        ItemSeparatorComponent={() => <View style={{padding: scale(3)}} />}
        renderItem={({item}) => <Card item={item} />}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  filterWithInResult: state.filter.filterWithInResult,
});
const mapDispatchToProps = {
    toggleFiltersWithInResult$: toggleFiltersWithInResult,  
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterWithIn);
