export const removeHtmlTags =(replaceFrom)=>{
   return replaceFrom?.replace(/<[^>]*>?/gm, '')
}

export const getPlacheHolder = (searchType) => {
   switch (searchType) {
     case "act-section":
       return "Act Name";
     case "freetext":
       return "Search free text..";
     case "partyname":
       return "petitioner/respondent";
     case "bench":
       return "Judge Name";
     case "citation":
       return "Search through citation";
   }
 };