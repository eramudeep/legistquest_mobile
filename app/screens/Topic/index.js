import React, {useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native';
import {scale} from 'react-native-size-matters';

import Container from '../../components/Container';

import SearchResult from '../../components/SearchResult';
import {getResultsByTopic} from '../../redux/searchActions';

import {connect} from 'react-redux';
import {appColors, shadowLight} from '../../utils/appColors';
import SlideModal from '../../components/Modals/SlideModal';
import CustomAutoComplete from '../../components/CustomAutoComplete';
import ResultFound from '../../components/ResultFound';
import Icon from '../../components/CustomIcon/Icon';
import {getPagination, setPageNo} from '../../redux/actions';
import {filterListValues} from '../../utils/appConstants';
import {TYPE_ACT} from '../../services/ApiList';
import AutoCompleteForAct from '../../components/AutoCompleteForAct';
import FilterWithIn from '../../components/Filters/FilterWithIn';

import RNPickerSelect from 'react-native-picker-select';
import {sortData} from '../../utils/MockData';
import {searchByFilters, sortByOnly} from '../../redux/filterActions';
import CustomLabel from '../../components/CustomLabel/CustomLabel';
import ScMat from '../../components/ScMat';
const courtLists = ['SupremeCourtList', 'HighCourtList', 'OtherCourtList'];
function Topic({
  sortByF,
  searchByFilters$,
  sortByOnly$,
  searchTopicResult,
  searchQuery,
  getResultsByTopic$,
  getPaginationResults$,
  route,
  navigation,
  isTopicLoading,
  filtersList,
  userToken,
  setPageNumber$,
  pageNumber
}) {
  const [loadMore, setLoadMore] = useState(false);
  const {selectedTopic} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [showSearchWithIn, setShowSearchWithIn] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [sortBy, setSortBy] = useState(sortByF);
  const toggleSearchWithin = () => {
    setShowSearchWithIn(!showSearchWithIn);
  };
  console.log("pageNumber",pageNumber);
  // console.log('searchQuery', searchTopicResult?.CaseDetails);
  const _renderSearchResult = ({item, index}) => {
    const {EncryptedId} =item
    return (
      <SearchResult
        selectedTopic={selectedTopic}
        searchData={item}
        key={`case_${EncryptedId}_${index}`}
        onSearchCase={toggleSearchWithin}
        onPressSearchWithin={()=>navigation.navigate("SearchWithinText",{id:item?.EncryptedId})}
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
    if (searchTopicResult?.CaseCount <= 10) return;
    setLoadMore(true);
   const page= pageNumber? Number(pageNumber) + 1:2
    const respo = await getPaginationResults$({
      query: searchQuery.text,
      searchType: searchQuery?.type,
      pageNumber: page,
      filtersList,
      callback: callbackFromSaga,
    });
    console.log(respo,">>>>",pageNumber);
    setPageNumber$(page)
    setPageNo((prev) => prev + 1);
  };
  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const seniTizeCourtFilters = () => {
    let filters = {};
    // console.log("searchTopicResult",searchTopicResult);
    let Court = [];
    courtLists?.map((courtName) => {
      if (searchTopicResult?.[courtName]) {
        const {CourtName, CaseCount, CaseIds, CaseListViewModel} =
          searchTopicResult?.[courtName];
        Court.push({
          CourtName,
          CaseCount,
          CaseIds,
          SubCourtList: CaseListViewModel,
        });
      }
    });
    filters = {...filters, Court};

    //filters.Court=Court
    filterListValues?.map((item) => {
      const {key, label} = item;
      if (searchTopicResult?.[label]) {
        filters[key] = [...searchTopicResult?.[label]];
      }
    });

    let IdrafList = [];
    if (searchTopicResult?.IdrafList?.length > 0) {
      searchTopicResult?.IdrafList?.map((item) => {
        IdrafList.push({CaseCount: item, StatusId: item});
      });
      filters.iDRAF = IdrafList;
    }
    // console.log({IdrafList});
    return filters;
  };

  const onChangePicker = (value) => {
    sortByOnly$({
      sortBy: value,
    });
    setSortBy(value);
    //console.log({filtersList});
    searchByFilters$({...filtersList, SortBy: value?.toString()});

    //getResultsByTopic$({selectedTopic: searchQuery?.text,filterValueList:[ ...filterWithInResult]?.toString(), SortBy :value?.toString(), keepFilters:true});
  };
//console.log("Mmmmmmmmm",searchTopicResult?.CaseDetails);
  return (
    <Container
      bodyStyle={{padding: scale(0)}}
      //isScrollable
      showHome
      showMenu
      showFooter
      showSignin
      showSearch
      //signInLabel={userToken ?  }
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
        <View style={{flex: 1, paddingTop: scale(0)}}>
          
           {/* <CustomAutoComplete navigation={navigation} /> */}
          
          {/* <View style={{flexDirection: 'row', paddingBottom: scale(10)}}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3, 4, 5, 6, 7].map((val, key) => {
              return <Badge key={key} />;
            })}
          </ScrollView>
        </View> */}
          <View
            style={[{
              //marginTop: scale(15),
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              borderWidth: scale(0.5),
              borderColor: appColors.blue,
              backgroundColor:appColors.lighterGray,
              alignItems:"center",overflow:"hidden"
            },Platform.OS==="android" &&{height:scale(35),}]}>
            <View style={{width: '50%', borderRightWidth: scale(0.6)}}>
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

            <View
              style={[{
                flex:1,
                justifyContent: 'center',
                alignItems: 'center',
                // alignContent: 'center',
                backgroundColor: appColors.lighterGray,
                  flexDirection: 'row',
              },Platform.OS==="android"&&{flexDirection:"column"}]}>
                
              <RNPickerSelect
                 
                onValueChange={(value) => {
                  onChangePicker(value);
                }}
                items={sortData}
                value={sortBy}
                Icon={() =><Icon name={'sort'} size={scale(15)} color={appColors.blue} />}
                style={{
                  inputAndroid: {color: appColors.blue},
                  iconContainer: {marginRight: scale(30)}, 
                  viewContainer: {justifyContent: 'center',marginLeft:Platform.OS==="android"?scale(20):0 },
                  inputIOS: {fontSize: scale(14), color: appColors.blue},
                }}
                fixAndroidTouchableBug
              />
            </View>
             
          </View>
         
          <View
            style={{
              paddingTop: scale(10),
              paddingHorizontal: scale(10),
              backgroundColor: appColors.white,
              marginBottom: scale(5),
              // ...shadowLight,
            }}>
              {/* <ScMat /> */}
            <FilterWithIn />
            <ResultFound />
          </View>
          
          {/* <Filters  Court={seniTizeCourtFilters()}/> */}
          
          <FlatList
            ListEmptyComponent={() => (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: scale(500),
                }}>
                <CustomLabel
                  text={`No result found for query '${ searchQuery?.text}'`}
                  labelStyle={{color: appColors.tabLabel}}
                />
              </View>
            )}
            data={searchTopicResult?.CaseDetails /* | [...searchTopicResult?.CaseDetails] */}
            renderItem={_renderSearchResult}
            keyExtractor={(item) =>
              `${new Date().getTime()}_${item.Id}_${item.EncryptedId}_${
                item.CaseId
              }`
            }
            onMomentumScrollBegin={() => {
              setOnEndReachedCalledDuringMomentum(false);
            }}
            onEndReached={({distanceFromEnd}) => {
              if (!onEndReachedCalledDuringMomentum && searchTopicResult?.CaseDetails?.length >=10) {
                getLoadMoreResults();
                setOnEndReachedCalledDuringMomentum(true);
              }
            }}
            //onEndReached={getLoadMoreResults}
            onEndReachedThreshold={0.5}
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
  pageNumber: state.error.pageNumber,
  filtersList: { 
    Courtarray: `${state.filter.selectedByCourt?.toString()}`,
    BenchArray: `${state.filter.selectedByBench?.toString()}`,
    Yeararray: `${state.filter.selectedByYear?.toString()}`,
    Decisionarray: `${state.filter.selectedByDecStatus?.toString()}`,
    Idrafarray: `${state.filter.selectedByIdraf?.toString()}`,
    SearchText: state?.search?.searchQuery?.text,
    SearchType: state?.search?.searchQuery?.type,
    RemoveFilter: '',
    FilterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString(),
  },
  sortByF: state.filter.sortBy,
  userToken: state.auth.userData?.data?.userToken
});
const mapDispatchToProps = {
  getResultsByTopic$: getResultsByTopic,
  getPaginationResults$: getPagination,

  sortByOnly$: sortByOnly,
  searchByFilters$: searchByFilters,
  setPageNumber$:setPageNo
};
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const styles = StyleSheet.create({});
