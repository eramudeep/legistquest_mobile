const BASE_URL = 'https://www.legitquest.com/api/v1.0/';
export const TYPE_ACT = 'act-section';
export const TYPE_FREE_TEXT = 'freetext';
export const PARTY_NAME = "partyname";
export const JUDGE_NAME = "bench";
export const CITATION = "citation";
export const SEARCH_BY_KEY_WORDS = `${BASE_URL}SearchByKeyWords?type=${TYPE_FREE_TEXT}&searchString=`;
export const SEARCH_BY_WORD = `${BASE_URL}SearchByKeyWords?`;
export const CASE_TEXT_API_URL=`${BASE_URL}GetResultBySelectedSearchResult?`
export const DETAILS_API=`${BASE_URL}case/`
export const SEARCH_RESULT_BY_PAGE_NUMBER=`${BASE_URL}GetResultBySelectedSearchResultPageNo`
export const SEARCH_RESULT_WITH_FILTERS_API=`${BASE_URL}GetCaseDetailsByBenchFilter`
export const GETOCRDATABYCITEDIN=`${BASE_URL}GetOcrDataByCitedIn`
export const SEARCH_WITH_IN_CASE=`${BASE_URL}GetResultByCaseIdForSearchWithinCase?`//caseId=1454CC&searchText=indian 
export const LOGIN_API=`https://login.legitquest.com/api/v1.0/customers/login`
export const LOGOUT_API=`https://login.legitquest.com/api/v1.0/customers/logout`
export const DOWNLOAD_JUDGEMENT=`${BASE_URL}download-judgment?`