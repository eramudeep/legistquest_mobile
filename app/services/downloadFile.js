import { DOWNLOAD_JUDGEMENT } from "./ApiList";

export async function downloadFile(id,cname,fontValue,caseName){
    console.log("id",id,"case",cname,"fontValue",fontValue,"caseName",caseName);
    console.log(`${DOWNLOAD_JUDGEMENT}id=${id}&cname=${encodeURI(cname)}&fontvalue=${fontValue}&caseName=${caseName}`);
    const respo= await fetch(`${DOWNLOAD_JUDGEMENT}id=${id}&cname=${encodeURI(cname)}&fontvalue=${fontValue}&caseName=${caseName}`)
    .then(respo=>console.log("respo=>",respo.path()))
    .catch(e=>{console.log("download judgement error",e);})


}

// https://www.legitquest.com/api/v1.0/download-judgment?id=1ABB&cname=supreme%20court%20of%20india&fontvalue=4&caseName=7777
// https://www.legitquest.com/api/v1.0/download-judgment?id=ZjYxNTk=&cname=high%20court%20of%20himachal%20pradesh&fontvalue=4&caseName=F6159