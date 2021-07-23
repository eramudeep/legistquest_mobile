import {
  CITATION,
  JUDGE_NAME,
  PARTY_NAME,
  TYPE_ACT,
  TYPE_FREE_TEXT,
} from '../services/ApiList';

export const removeHtmlTags = (replaceFrom) => {
  return replaceFrom?.replace(/<[^>]*>?/gm, '');
};

/**
 *
 * @param {*} itemToCheck
 * @param {*} arrayOfItem
 * @returns {[]}
 * @description will return an array, this function will check the the passed [itemToCheck] params exist in array. if it exist, it will remove it otherwise it will push into it
 */
export const senitizeAnyArray = (
  itemToCheck,
  arrayOfItem,
  allOverRide = false,
) => {
  let tmpFilters = arrayOfItem;
  if (tmpFilters?.includes(itemToCheck)) {
    //remove
    const index = tmpFilters.indexOf(itemToCheck);
    if (index > -1) {
      tmpFilters.splice(index, 1);
    }

    return [...tmpFilters];
  } else {
    if (!allOverRide) return [...tmpFilters, itemToCheck];
    return [itemToCheck];
  }
};
export const getPlacheHolder = (searchType) => {
  switch (searchType) {
    case TYPE_ACT:
      return 'Act Name';
    case TYPE_FREE_TEXT:
      return 'Search free text..';
    case PARTY_NAME:
      return 'petitioner/respondent';
    case JUDGE_NAME:
      return 'Judge Name';
    case CITATION:
      return 'Search through citation';
  }
};
export const getHeaders = (jsonData) => {
  const raw = JSON.stringify(jsonData);
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return requestOptions;
};


export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}