import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import Details from '../Details';
import {DETAILS_API} from '../../services/ApiList';

export default function TopicDetail({route, navigation}) {
  const {LinkText, HighlightedText, item} = route.params;
  const [viewModel, setViewModel] = useState();
  const getDetailsScreenData = async () => {
    const {LinkText, EncryptedId} = item;
    const label = parseParam(LinkText);
    const URL = `${DETAILS_API}${label}/${EncryptedId}`;

    const respounce = await fetch(URL);
    const result = await respounce.json();
    setViewModel(result?.viewModel);
  }; 
  const parseParam = (str) => {
    str?.replace(/./g, '');
    return str?.replace(/\s/g, '-');
  };
  useEffect(() => {
    getDetailsScreenData();
  }, [LinkText, HighlightedText]);
  return (
    <Container
      isScrollable
      showHome
      showMenu
      onHome={() => navigation.navigate('Home')}>
      <View>
        {/* <CustomLabel
          text={LinkText}
          labelStyle={styles.title}
        />
        <CustomLabel
          text={HighlightedText}
          labelStyle={styles.bodyText}
        /> */}
        <Details viewModel={viewModel} item={item} />
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
