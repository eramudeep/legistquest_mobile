import React, { useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import CustomIcon from '../CustomIcon/Icon';
import CustomInput from '../CustomInput';
import CustomLabel from '../CustomLabel/CustomLabel';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import TouchRipple from 'react-native-touch-ripple';
import {
    getResultsByTopic,
    resetSearchResults,
    searchByQuery,
} from '../../redux/searchActions';
import { getPlacheHolder, getUniId } from '../../utils/common';
import { appColors } from '../../utils/appColors';
import { AlertHelper } from '../../utils/AlertHelper';
import { TYPE_ACT } from '../../services/ApiList';

function SearchboxForAct({
    searchResults,
    navigation,
    getResultsByTopic$,
    searchByQuery$,
    resetSearchResults$,
    searchQuery,
    filterValueList,
    SortBy,
}) {
    const [isFocsed, setIsFocsed] = useState(false);
    const [isFocsedSection, setIsFocsedSection] = useState(false);
    const [searchedQuery, setSearchedQuery] = useState();
    const [sectionText, setSectionText] = useState();
    const [hasSection, setHasSection] = useState(false)
    const [searchTyle, setSearchTyle] = useState()

    const onFocus = () => {
        setIsFocsed(!isFocsed);
    };
    const onFocusSection = () => {
        setIsFocsedSection(true);
    };
    const onBlurSection = () => {
        setIsFocsedSection(false);
    };

    const clear = () => {
        if (isFocsed) setSearchedQuery('');
        if (isFocsedSection) setSectionText('');
    };
    const debouncedSearch = debounce(function (change) {
        searchByQuery$({ type: searchQuery?.type, text: change });
        //setQuery(change);
        // setSearchIcon('spinner');
    }, 500);

    const onChangeText = (chnage_) => {
       const  chnage = chnage_//?.replace(/[^a-zA-Z ]/g, "")
        setHasSection(false)
        setSearchedQuery(chnage);
        // searchByQuery$({ type: searchQuery?.type, text: chnage });
        debouncedSearch(chnage);
    };
    const onChangeTextSection = (chnage_) => {
        const  chnage = chnage_//?.replace(/[^a-zA-Z ]/g, "")
        setHasSection(true)
        setSectionText(chnage);
        //debouncedSearch(chnage);
    };
    const onItemPress = (item) => {
         
         
        const SEARCH_QUERY = item?.Value; // getQuery();
        if (searchedQuery?.length > 0) {
          searchByQuery$({type: searchQuery?.type, text: `${searchedQuery} + ${sectionText}`}); 
          getResultsByTopic$({
            selectedTopic: `${searchedQuery} ${encodeURIComponent("+")} ${sectionText}`,
            filterValueList,
            SortBy,
          });
          return navigation?.navigate('Topic', {selectedTopic: `${searchedQuery} ${encodeURIComponent("+")} ${sectionText}`});
        } else {
          AlertHelper.show('error', 'Search should be minimum 3 alphabets...');
        }
    };
    const _renderItem = ({ item, index }) => {
        const { Value } = item;
        // console.log("item",item);
        return (
            <TouchRipple
                rippleDuration={800}
                rippleColor={appColors.blue}
                onPress={() => {
                    hasSection ? setSectionText(Value) : setSearchedQuery(Value);
                    //   onItemPress && onItemPress(item);
                    setSearchTyle(item?.type)
                    resetSearchResults$();
                }}
                style={{ padding: scale(5), borderBottomWidth: scale(0.5) }}>
                <CustomLabel text={Value} />
            </TouchRipple>
        );
    };
    ///console.log({searchQuery});
    return (
        <View style={{ flex: 1, paddingHorizontal: scale(10) }}>
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Pressable onPress={() => navigation?.goBack()}>
                    <CustomIcon name="angle-left" size={scale(25)} />
                </Pressable>

                <CustomInput
                    defaultValue={searchedQuery}
                    onChangeText={onChangeText}
                    onRightIcon={clear}
                    onFocus={onFocus}
                    onBlur={onFocus}
                    iconSize={scale(14)}
                    rightIcon={isFocsed ? 'times' : false}
                    containerStyle={{ width: '90%' }}
                    autoFocus
                    placeholder={getPlacheHolder(searchQuery.type)}
                    onSubmitEditing={() => {
                        resetSearchResults$();
                         onItemPress({Value: searchedQuery});
                    }}
                />
            </View>
            {/* for section */}
            <CustomInput
                defaultValue={sectionText}
                onChangeText={onChangeTextSection}
                //onRightIcon={clear}
                onFocus={onFocusSection}
                onBlur={onBlurSection}
                iconSize={scale(14)}
                rightIcon={isFocsedSection ? 'times' : false}
                containerStyle={{ width: '90%', alignSelf: "flex-end" }}
                 showSearch
                onSearch={onItemPress}
                //autoFocus
                //   placeholder={getPlacheHolder(searchQuery.type)}
                placeholder={"Section"}
                onSubmitEditing={() => {
                    resetSearchResults$();
                    onItemPress({ Value: sectionText });
                }}

            />
            <FlatList
                keyExtractor={(item) =>
                    `${new Date().getTime()}_${item.Value}_${getUniId()}`
                }
                keyboardShouldPersistTaps={"always"}
                data={searchResults}
                renderItem={_renderItem}
            />
        </View>
    );
}

const mapStateToProps = (state) => ({
    searchResults: state.search.searchResults,
    searchQuery: state.search.searchQuery,
    filterValueList: `${state.filter.filterWithInResult?.toString()}`,
    SortBy: state.filter.sortBy?.toString(), // HARD CODING FOR NOW, NEED TO SYNC WITH `ResultFound.js` Component,
});

const mapDispatchToProps = {
    searchByQuery$: searchByQuery,
    resetSearchResults$: resetSearchResults,
    getResultsByTopic$: getResultsByTopic,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchboxForAct);
