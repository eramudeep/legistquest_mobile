import React, {useEffect} from 'react';
import {FlatList,ScrollView, StyleSheet, Text, View,ActivityIndicator} from 'react-native';
import {scale} from 'react-native-size-matters';
import Badge from '../../components/Badge';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import SearchResult from '../../components/SearchResult';
import {getResultsByTopic} from '../../redux/searchActions';
import ScrollableTab from '../../routing/ScrollableTab';
import {connect} from 'react-redux';
import { appColors } from '../../utils/appColors';

function Topic({searchTopicResult,getResultsByTopic$, route, navigation,isTopicLoading}) { 
const {selectedTopic} =route.params
  
const _renderSearchResult = ({item,index})=>{
   
    return <SearchResult
    selectedTopic={selectedTopic}
    searchData={item}
    key={index}
    onPress={(LinkText,HighlightedText) => navigation.navigate('TopicDetail',{LinkText,HighlightedText, item})}
  />
}
return (
    <Container
      showHome
      showMenu
      showFooter
      onHome={() => navigation.navigate('Home')}>
        {
          isTopicLoading ?<View>
          <ActivityIndicator size={"large"} animating={isTopicLoading} color={appColors.black}/>
        </View>
        : <View style={{flex: 1}}>
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

        <FlatList  
         data={ searchTopicResult?.CaseDetails}
         renderItem={_renderSearchResult}
         keyExtractor={(item) => item.id}
        /> 
      </View>
        }       
     
    </Container>
  );
}

const mapStateToProps = (state) => ({
    searchTopicResult:state.search.searchTopicResult,
    isTopicLoading:state.error.isloading
});
const mapDispatchToProps = {
  getResultsByTopic$: getResultsByTopic,
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const styles = StyleSheet.create({});
