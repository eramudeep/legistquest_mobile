import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Badge from '../../components/Badge';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import SearchResult from '../../components/SearchResult';
import {getResultsByTopic} from '../../redux/searchActions';
import ScrollableTab from '../../routing/ScrollableTab';
import {connect} from 'react-redux';
import {appColors} from '../../utils/appColors';
import SlideModal from '../../components/Modals/SlideModal';
import CustomAutoComplete from '../../components/CustomAutoComplete';

function Topic({
  searchTopicResult,
  getResultsByTopic$,
  route,
  navigation,
  isTopicLoading,
}) {
  const [loadMore, setLoadMore] = useState(false);
  const {selectedTopic} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const _renderSearchResult = ({item, index}) => {
    return (
      <SearchResult
        selectedTopic={selectedTopic}
        searchData={item}
        key={index}
        onPress={(LinkText, HighlightedText) =>
          navigation.navigate('TopicDetail', {LinkText, HighlightedText, item})
        }
      />
    );
  };
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const seniTizeCourtFilters= ()=>{
    const {  CourtName ,  CaseCount , CaseIds,} =searchTopicResult?.HighCourtList
    
    return {
    "Court":  [
      {
        CourtName ,  CaseCount , CaseIds,
        SubCourtList: searchTopicResult?.HighCourtList?.CaseListViewModel
      },
      {
        CourtName  : searchTopicResult?.OtherCourtList?.CourtName,  
        CaseCount : searchTopicResult?.OtherCourtList?.CaseCount, 
        CaseIds: searchTopicResult?.OtherCourtList?.CaseIds,
        SubCourtList: searchTopicResult?.OtherCourtList?.CaseListViewModel
      },
      {
        CourtName  : searchTopicResult?.SupremeCourtList?.CourtName,  
        CaseCount : searchTopicResult?.SupremeCourtList?.CaseCount, 
        CaseIds: searchTopicResult?.SupremeCourtList?.CaseIds,
        SubCourtList: searchTopicResult?.SupremeCourtList?.CaseListViewModel
      }

    ],
    "Bench":  [
      {
        CourtName ,  CaseCount , CaseIds,
        SubCourtList: searchTopicResult?.HighCourtList?.CaseListViewModel
      },
      {
        CourtName  : searchTopicResult?.OtherCourtList?.CourtName,  
        CaseCount : searchTopicResult?.OtherCourtList?.CaseCount, 
        CaseIds: searchTopicResult?.OtherCourtList?.CaseIds,
        SubCourtList: searchTopicResult?.OtherCourtList?.CaseListViewModel
      },
      {
        CourtName  : searchTopicResult?.SupremeCourtList?.CourtName,  
        CaseCount : searchTopicResult?.SupremeCourtList?.CaseCount, 
        CaseIds: searchTopicResult?.SupremeCourtList?.CaseIds,
        SubCourtList: searchTopicResult?.SupremeCourtList?.CaseListViewModel
      }

    ]
  }
    //
  }
  return (
    <Container
      showHome
      showMenu
      showFooter
      onHome={() => navigation.navigate('Home')}>
      {isTopicLoading ? (
        <View>
          <ActivityIndicator
            size={'large'}
            animating={isTopicLoading}
            color={appColors.black}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {/* <CustomInput
          containerStyle={{marginTop: 0}}
          placeholder={'Search Free Text...'}
          rightIcon={'search'}
          iconSize={scale(20)}
        /> */}
          <CustomAutoComplete navigation={navigation} />
          {/* <View style={{flexDirection: 'row', paddingBottom: scale(10)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7].map((val, key) => {
              return <Badge key={key} />;
            })}
          </ScrollView>
        </View> */}
          <View
            style={{
              backgroundColor: appColors.lighterGray,
              alignItems: 'center',
              paddingVertical: scale(5),
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{fontSize: scale(14)}} onPress={toggleModal}>
              Show Filters
            </Text>
          </View>

          <FlatList
            data={searchTopicResult?.CaseDetails}
            renderItem={_renderSearchResult}
            keyExtractor={(item) => item.id}
            onEndReached={() => setLoadMore(true)}
            onEndReachedThreshold={1}
          />
        </View>
      )}
      <View style={{padding: scale(5)}}>
        <ActivityIndicator
          size={'large'}
          animating={loadMore}
          color={appColors.black}
        />
      </View>
      <SlideModal filterCourt={ seniTizeCourtFilters()} visible={modalVisible} onClose={toggleModal} />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  searchTopicResult: state.search.searchTopicResult,
  isTopicLoading: state.error.isloading,
});
const mapDispatchToProps = {
  getResultsByTopic$: getResultsByTopic,
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const styles = StyleSheet.create({});
