import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLabel from '../CustomLabel/CustomLabel';
import ByBench from './ByBench';
import ByYear from './ByYear';
import RadioGroup from './RadioGroup';
import ByDisposition from './ByDisposition';

export default function FilterComp({toggleFilters$, filters, label, Court}) {
  //const [isOpen, setIsOpen] = useState();
  const onPress = () => {
    //setIsOpen(!isOpen);
    toggleFilters$(label);
  };
  const isFilterOpen = () => {
    return filters?.includes(label);
  };
  //console.log("filters",filters);
  return (
    <View style={{margin:scale(3)}}>
      <Pressable onPress={onPress} style={styles.pressableContainer}>
        <Ionicons
          name={isFilterOpen() ? 'caret-down-outline' : 'caret-forward-outline'}
          size={scale(20)}
        />
        <CustomLabel text={`By ${label}`} labelStyle={styles.itemLabel} />
      </Pressable>

      {isFilterOpen() && (
        <View>
          <Pressable style={{margin: scale(10)}}>
            {label == 'Court' && <RadioGroup list={Court} />}
            {label == 'Bench' && <ByBench list={Court} />}
            {label == 'Year' && <ByYear list={Court} />}
            {label == 'Dispotions' && <ByDisposition list={Court} />}
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pressableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: scale(12),
    padding: scale(0),
  },
});
