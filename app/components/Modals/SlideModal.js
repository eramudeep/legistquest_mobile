import React, {useState} from 'react';
import {StyleSheet, Pressable, View, Scr} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import {
  resetFilters,
  toggleFiltersWithInResult,
} from '../../redux/filterActions';
import {appColors} from '../../utils/appColors';
import Icon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import Filters from '../Filters';
import {connect} from 'react-redux';
import {getResultsByTopic} from '../../redux/searchActions';
import Feather from 'react-native-vector-icons/Feather';
function SlideModal({
  toggleFiltersWithInResult$,
  filterCourt,
  visible,
  onClose,
  searchQuery,
  filterWithInResult,
  SortBy,
  getResultsByTopic$,
  resetFilters$,
}) {
  const [filterVal, setFilterVal] = useState();

  const onSearchWithin = () => {
    if (!filterVal) return;
    toggleFiltersWithInResult$(filterVal);
    getResultsByTopic$({
      selectedTopic: searchQuery?.text,
      filterValueList: [filterVal, ...filterWithInResult],
      SortBy: SortBy?.toString(),
      keepFilters: true,
    });
    setFilterVal('');
  };
  const onChangeText = (change) => {
    setFilterVal(change);
  };
  const onClearFilter = () => {
    resetFilters$({keepWithInResultFilter: true});
    getResultsByTopic$({
      selectedTopic: searchQuery?.text,
      filterValueList: [/* filterVal, ...filterWithInResult */],
      SortBy: SortBy?.toString(),
      keepFilters: true,
    });
  };
  const _renderCloseIcon = () => {
    return (
      <Pressable onPress={onClose} style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View
          style={{
            height: scale(30),
            width: scale(30),
            backgroundColor: appColors.tabLabel,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: scale(25),
             
          }}>
          <Feather name="x" color={appColors.white} size={scale(20)} />
        </View>
      </Pressable>
    );
  };
  return (
    <Modal
      /*  animationIn="slideInLeft"
      animationOut="slideOutLeft" */
      isVisible={visible}
      //onSwipeStart={() => console.log('swipe start')}
      //onSwipeComplete={onClose}
      //useNativeDriverForBackdrop
      //swipeDirection={['left']}
      style={{margin: 0, marginRight: scale(40)}}>
      <View style={{flex: 1, backgroundColor: appColors.white}}>
        <View style={{margin: scale(10), marginTop: scale(50)}}>
          {_renderCloseIcon()}
          <View style={styles.row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="filter" size={scale(18)} />
              <CustomLabel text={'SEARCH FILTER'} />
            </View>
            <Pressable
              onPress={onClearFilter}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="undo" size={scale(12)} color={appColors.blue} />
              <CustomLabel
                text={'Clear'}
                labelStyle={{color: appColors.blue}}
              />
            </Pressable>
          </View>
          <CustomInput
            onChangeText={onChangeText}
            containerStyle={{
              marginTop: 0,
              backgroundColor: appColors.lighterGray,
            }}
            placeholder={'Filter within result...'}
            rightIcon={'times-circle'}
            iconSize={scale(17)}
            iconColor={appColors.blue}
            leftIcon="search"
            onRightIcon={onSearchWithin}
            defaultValue={filterVal}
          />
           
          <Filters Court={filterCourt} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  row: {
    borderBottomWidth: scale(0.5),
    marginBottom: scale(10),
    height: scale(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapStateToProps = (state) => ({
  searchQuery: state.search.searchQuery,
  filterWithInResult: state.filter.filterWithInResult,
  SortBy: state.filter.sortBy?.toString(), // HARD CODING FOR NOW, NEED TO SYNC WITH `ResultFound.js` Component,
});
const mapDispatchToProps = {
  toggleFiltersWithInResult$: toggleFiltersWithInResult,
  getResultsByTopic$: getResultsByTopic,
  resetFilters$: resetFilters,
};
export default connect(mapStateToProps, mapDispatchToProps)(React.memo( SlideModal));
