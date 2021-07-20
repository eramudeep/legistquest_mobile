import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY="@searchType"
export const setSearchType = async (value) => {
    try {
      await AsyncStorage.setItem(KEY, value)
    } catch (e) {
      // saving error
    }
  }


export const getSearchType = async () => {
    try {
      const value = await AsyncStorage.getItem(KEY)
      if(value)
      return value
      return "freetext"
      
    } catch(e) {
      // error reading value
    }
  }