import { DOWNLOAD_JUDGEMENT } from "./ApiList";
import {PermissionsAndroid, Alert} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import { AlertHelper } from "../utils/AlertHelper";

export async function downloadFile(dPath){
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      actualDownload(dPath);
    } else {
      Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
    }
  } catch (err) {
    console.warn(err);
  } 

 
}

  export const actualDownload = (dPath) => {
    const { dirs } = RNFetchBlob.fs;
    const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
    console.log({dirToSave});
    const title = new Date().getTime()
    console.log("dPath",dPath);
   RNFetchBlob.config({
     fileCache: true,
     addAndroidDownloads: {
     useDownloadManager: true,  
     notification: true,
     mediaScannable: true,
     title: `${title}.pdf`,
     path: `${dirToSave}/${title}.pdf`
     },
   })
     .fetch('GET',dPath, {})
     .then((res) => {
       console.log('The file saved to ', res.path());
       AlertHelper.show("success","Success","download success")
     })
     .catch((e) => {
       console.log(e)
       AlertHelper.show("error","Error","download Failed")
     });
 }

// https://www.legitquest.com/api/v1.0/download-judgment?id=1ABB&cname=supreme%20court%20of%20india&fontvalue=4&caseName=7777
// https://www.legitquest.com/api/v1.0/download-judgment?id=ZjYxNTk=&cname=high%20court%20of%20himachal%20pradesh&fontvalue=4&caseName=F6159