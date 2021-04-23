export const removeHtmlTags =(replaceFrom)=>{
   return replaceFrom?.replace(/<[^>]*>?/gm, '')
}