import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import Badge from '../../components/Badge';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import SearchResult from '../../components/SearchResult';
import {getResultsByTopic} from '../../redux/searchActions';
import ScrollableTab from '../../routing/ScrollableTab';
import {connect} from 'react-redux';

function Topic({searchTopicResult,getResultsByTopic$, route, navigation}) {
   
console.log("searchTopicResult",searchTopicResult);
   
  return (
    <Container
      showHome
      showMenu
      showFooter
      onHome={() => navigation.navigate('Home')}>
      <View style={{flex: 1}}>
        <CustomInput
          containerStyle={{marginTop: 0}}
          placeholder={'Search Free Text...'}
          rightIcon={'search'}
          iconSize={scale(20)}
        />
        <View style={{flexDirection: 'row', paddingBottom: scale(10)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7].map((val, key) => {
              return <Badge key={key} />;
            })}
          </ScrollView>
        </View>

        <ScrollView>
          {searchTopicResult?.CaseDetails?.map((val, key) => {
              
            return (
              <SearchResult
                searchData={val}
                key={key}
                onPress={(LinkText,HighlightedText) => navigation.navigate('TopicDetail',{LinkText,HighlightedText})}
              />
            );
          })}
        </ScrollView>
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({
    searchTopicResult:state.search.searchTopicResult,
});
const mapDispatchToProps = {
  getResultsByTopic$: getResultsByTopic,
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const styles = StyleSheet.create({});
