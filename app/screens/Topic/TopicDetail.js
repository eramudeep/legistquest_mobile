import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomLabel from '../../components/CustomLabel/CustomLabel';

export default function TopicDetail({route, navigation}) {
  const {LinkText, HighlightedText} = route.params;
   return (
    <Container
      isScrollable
      showHome
      showMenu
      onHome={() => navigation.navigate('Home')}>
      <View>
        <CustomLabel
          text={LinkText}
          labelStyle={styles.title}
        />
        <CustomLabel
          text={HighlightedText}
          labelStyle={styles.bodyText}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
  },
  bodyText: {},
});
