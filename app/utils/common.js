import { CITATION, JUDGE_NAME, PARTY_NAME, TYPE_ACT, TYPE_FREE_TEXT } from "../services/ApiList";

export const removeHtmlTags =(replaceFrom)=>{
   return replaceFrom?.replace(/<[^>]*>?/gm, '')
}

export const getPlacheHolder = (searchType) => {
   switch (searchType) {
     case TYPE_ACT:
       return "Act Name";
     case TYPE_FREE_TEXT:
       return "Search free text..";
     case PARTY_NAME:
       return "petitioner/respondent";
     case JUDGE_NAME:
       return "Judge Name";
     case CITATION:
       return "Search through citation";
   }
 };