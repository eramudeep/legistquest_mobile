import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
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
import ResultFound from '../../components/ResultFound';
import Icon from '../../components/CustomIcon/Icon';
import {getPagination} from '../../redux/actions';
import {filterListValues} from '../../utils/appConstants';
import {TYPE_ACT} from '../../services/ApiList';
import AutoCompleteForAct from '../../components/AutoCompleteForAct';
import FilterWithIn from '../../components/Filters/FilterWithIn';
 
const coutLists=["SupremeCourtList", "HighCourtList","OtherCourtList"]
function Topic({
  searchTopicResult,
  searchQuery,
  getResultsByTopic$,
  getPaginationResults$,
  route,
  navigation,
  isTopicLoading,
  filtersList,
}) {
  const [loadMore, setLoadMore] = useState(false);
  const {selectedTopic} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  //console.log('searchQuery', searchQuery);
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
  const callbackFromSaga = () => {
    // alert("done")
    setLoadMore(false);
  };
  const getLoadMoreResults = async () => {
    // console.log("searchTopicResult?.CaseCount",searchTopicResult?.CaseCount);
    if(searchTopicResult?.CaseCount<=10) return
    setLoadMore(true);

    const respo = await getPaginationResults$({
      query: searchQuery.text,
      searchType: searchQuery?.type,
      pageNumber: pageNo + 1,
      filtersList,
      callback: callbackFromSaga,
    });

    setPageNo((prev) => prev + 1);
  };
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const seniTizeCourtFilters = () => {
    let filters = {
        
    };
    // console.log("searchTopicResult",searchTopicResult);
    let Court=[]
    coutLists?.map((courtName)=>{
        if(searchTopicResult?.[courtName]){
            const { CourtName ,  CaseCount , CaseIds,CaseListViewModel} =searchTopicResult?.[courtName]
            Court.push({ CourtName ,  CaseCount , CaseIds,SubCourtList:CaseListViewModel })
        }
    }) 
    filters={...filters,Court}

    //filters.Court=Court
    filterListValues?.map((item) => {
      const {key, label} = item; 
      if (searchTopicResult?.[label]) {
        filters[key] = [...searchTopicResult?.[label]];
      }
    });

    let IdrafList=[]
    if(searchTopicResult?.IdrafList?.length > 0){
      searchTopicResult?.IdrafList?.map(item=>{
        IdrafList.push( {CaseCount:item, StatusId:item})
      }) 
      filters.iDRAF =IdrafList
    }
    // console.log({IdrafList});
    return filters;
  };
  return (
    <Container
    isScrollable
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
          {searchQuery?.type === TYPE_ACT ? (
            <AutoCompleteForAct navigation={navigation} />
          ) : (
            <CustomAutoComplete navigation={navigation} />
          )}

          {/* <View style={{flexDirection: 'row', paddingBottom: scale(10)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7].map((val, key) => {
              return <Badge key={key} />;
            })}
          </ScrollView>
        </View> */}
         <View style={{width:'30%'}}>
         <Pressable
            onPress={toggleModal}
            style={{
              backgroundColor: appColors.lighterGray,
              alignItems: 'center',
              paddingVertical: scale(5),
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Icon name={'filter'} size={scale(15)} color={appColors.blue} />
            <Text
              style={{
                fontSize: scale(14),
                marginLeft: scale(10),
                color: appColors.blue,
              }}>
              Filters
            </Text>
          </Pressable>
         </View>
          <FilterWithIn />
          <ResultFound />

          <FlatList
            data={searchTopicResult?.CaseDetails}
            renderItem={_renderSearchResult}
            keyExtractor={(item) => item.Id}
            onEndReached={getLoadMoreResults}
            // onEndReachedThreshold={0.1}
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
       <SlideModal
        filterCourt={seniTizeCourtFilters()}
        visible={modalVisible}
        onClose={toggleModal}
      />  
    </Container>
  );
}

const mapStateToProps = (state) => ({
  searchTopicResult: state.search.searchTopicResult,
  searchQuery: state.search.searchQuery,
  isTopicLoading: state.error.isloading,
  filtersList: {
    BenchArray: `${state.filter.selectedByBench?.toString()}`,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    SearchText: state?.search?.searchQuery?.text,
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString() 
  },
});
const mapDispatchToProps = {
  getResultsByTopic$: getResultsByTopic,
  getPaginationResults$: getPagination,
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const styles = StyleSheet.create({});
