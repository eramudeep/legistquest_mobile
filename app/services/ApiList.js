const BASE_URL = 'https://legitquest.com/api/v1.0/';
export const TYPE_ACT = 'act-section';
export const TYPE_FREE_TEXT = 'freetext';
export const PARTY_NAME = "partyname";
export const JUDGE_NAME = "bench";
export const CITATION = "citation";
export const SEARCH_BY_KEY_WORDS = `${BASE_URL}SearchByKeyWords?type=${TYPE_FREE_TEXT}&searchString=`;
export const SEARCH_BY_WORD = `${BASE_URL}SearchByKeyWords?`;
export const CASE_TEXT_API_URL=`${BASE_URL}GetResultBySelectedSearchResult?`
export const DETAILS_API=`${BASE_URL}case/`
export const SEARCH_RESULT_BY_PAGE_NUMBER=`${BASE_URL}GetResultBySelectedSearchResultPageNo?`
 
// {"SearchText":"court","SearchType":"freetext","BenchArray":"","Idrafarray":"","Yeararray":"","PageNo":2,"Partyarray":"","Decisionarray":"","SelectedFilter":"courtfilter","Filter":"","SortBy":"1","Courtarray":"","RemoveFilter":"","FilterValueList":""}


// https://legitquest.com/api/v1.0/GetResultBySelectedSearchResultPageNo?