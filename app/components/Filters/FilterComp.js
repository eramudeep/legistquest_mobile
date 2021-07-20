import React, {useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomLabel from '../CustomLabel/CustomLabel'; 
import RadioGroup from './RadioGroup';

export default function FilterComp() {
  const [isOpen, setIsOpen] = useState();
  const onPress = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View>
      <Pressable onPress={onPress} style={styles.pressableContainer}>
        <Ionicons
          name={isOpen ? 'caret-down-outline' : 'caret-forward-outline'}
          size={scale(20)}
        />
        <CustomLabel text="By Court" labelStyle={styles.itemLabel} />
      </Pressable>

      {isOpen && (
        <View style={{  height: scale(300)}}>
          <Pressable
            style={{
              margin: scale(10),
              /* flexDirection: 'row',
              justifyContent: 'space-between', */
            }}>
            {/* <RadioGroup radioButtons={radioButtonsData} /> */}
            
            <RadioGroup />
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
