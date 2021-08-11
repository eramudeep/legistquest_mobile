import { DOWNLOAD_JUDGEMENT } from "./ApiList";
import {PermissionsAndroid, Alert} from "react-native";

export async function downloadFile(id,cname,fontValue,caseName){
    console.log("id",id,"case",cname,"fontValue",fontValue,"caseName",caseName);
    console.log(`${DOWNLOAD_JUDGEMENT}id=${id}&cname=${encodeURI(cname)}&fontvalue=${fontValue}&caseName=${caseName}`);
    const respo= await fetch(`${DOWNLOAD_JUDGEMENT}id=${id}&cname=${encodeURI(cname)}&fontvalue=${fontValue}&caseName=${caseName}`)
    .then(respo=>console.log("respo=>",respo.path()))
    .catch(e=>{console.log("download judgement error",e);})


}
const downloadFilePDF = () => {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.actualDownload();
        } else {
          Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
        }
      } catch (err) {
        console.warn(err);
      } 
  }
const actualDownload = () => {
    const { dirs } = RNFetchBlob.fs;
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,
     notification: true,
     mediaScannable: true,
     title: `test.pdf`,
     path: `${dirs.DownloadDir}/test.pdf`,
     },
   })
     .fetch('GET', 'http://www.africau.edu/images/default/sample.pdf', {})
     .then((res) => {
       console.log('The file saved to ', res.path());
     })
     .catch((e) => {
       console.log(e)
     });
 }

// https://www.legitquest.com/api/v1.0/download-judgment?id=1ABB&cname=supreme%20court%20of%20india&fontvalue=4&caseName=7777
// https://www.legitquest.com/api/v1.0/download-judgment?id=ZjYxNTk=&cname=high%20court%20of%20himachal%20pradesh&fontvalue=4&caseName=F6159