import React, {useState} from 'react';
import {StyleSheet, Pressable, View} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from 'react-native-size-matters';
import {toggleFiltersWithInResult} from '../../redux/filterActions';
import {appColors} from '../../utils/appColors';
import Icon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import Filters from '../Filters';
import {connect} from 'react-redux';
function SlideModal({
  toggleFiltersWithInResult$,
  filterCourt,
  visible,
  onClose,
  filterWithInResult
}) {
  const [filterVal, setFilterVal] = useState();

  const onSearchWithin = () => {
    if(!filterVal) return
    toggleFiltersWithInResult$(filterVal);
    setFilterVal("")
  };
  const onChangeText = (change) => {
    setFilterVal(change);
  };
console.log({filterWithInResult});
  return (
    <Modal
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
      isVisible={visible}
      onSwipeStart={() => console.log('swipe start')}
      onSwipeComplete={onClose}
      useNativeDriverForBackdrop
      swipeDirection={['left']}
      style={{margin: 0, marginRight: scale(40)}}>
      <View style={{flex: 1, backgroundColor: appColors.white}}>
        <View style={{margin: scale(10), marginTop: scale(50)}}>
          <View style={styles.row}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="filter" size={scale(18)} />
              <CustomLabel text={'SEARCH FILTER'} />
            </View>
            <Pressable style={{flexDirection: 'row', alignItems: 'center'}}>
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
  filterWithInResult: state.filter.filterWithInResult,  
});
const mapDispatchToProps = {
  toggleFiltersWithInResult$: toggleFiltersWithInResult,
};
export default connect(mapStateToProps, mapDispatchToProps)(SlideModal);
