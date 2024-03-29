import {
  CITATION,
  JUDGE_NAME,
  PARTY_NAME,
  TYPE_ACT,
  TYPE_FREE_TEXT,
} from '../services/ApiList';
import {PermissionsAndroid, Platform} from 'react-native';
export const removeHtmlTags = (replaceFrom) => {
  return replaceFrom?.replace(/<[^>]*>?/gm, '');
};



export const requestWriteStoeagePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Ieltsify write storage',
        message:
          'Ieltsify needs access to your storage ' +
          'so you can download pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can download photos');
      return true;
    } else {
      console.log('storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
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
    default:
      return 'Search free text..';
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
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
export function removeAllSpaces(params) {
  return params.replace(/ /g,'');
}


export function cleanString(params) {
  return params.replace(/;\s*$/, '');
}

export function truncateString(params) {
  var length = 203;
  return params.substring(0, length);
}

export function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function multipleyDecider(value) {
  if (value < 5) {
    return 15;
  }
  if (value <= 7) {
    return 13;
  }
  if (value >= 50) {
    return 2;
  }
  return 12;
}

export function getUniId(length = 5) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function noEmptyElements(array) {
  var filtered = array.filter(function (el) {
    return el != null || el === '';
  });

  return filtered;
}

export const iddrafTabs = [
  {label: 'IsFoundArgumentsOfPetitioner',  id: "argofpetitioner" },
  {label: 'IsFoundArgumentsOfResponder',  id: "argofresponder" },
  {label: 'IsFoundFacts',  id: "facts" },
  {label: 'IsFoundPrinciple',  id: "issue" }, //principle
  {label: 'IsFoundReasoning',  id: "reasoning" },
  {label: 'IsFoundDecision',  id: "decision" },
];

export const getIdrafTabsList = (dataFromApi) => {
  let tabs = [];
  iddrafTabs?.map((item) => {
    const {label,id} =item
    if (dataFromApi[label]) {
      if(label==="IsFoundPrinciple"){/// replacing with issues 
        tabs.push({id,label: "Issues" });
      }
      else{
          tabs.push({id,label: item.label.replace('IsFound', '').trim()});
      }
      
    }
  });
  return tabs;
};
