import { Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { requestWriteStoeagePermission } from './common';

export default async function FileDownloader(url,formdata) {  
    try {
      if(Platform.OS =="android"){
        const granted=await requestWriteStoeagePermission()
      if(granted){
        downloader(url,formdata)
            return "end"
      }
      }else{
        downloader(url,formdata)
      }
    } catch (error) {
        console.log("error in file download",error);
    }
}

async function downloader(url,formdata) {
  const { config, fs } = RNFetchBlob
        let PictureDir = Platform.OS === 'ios'  ? fs.dirs.DocumentDir : fs.dirs.PictureDir 
         let ext =`.pdf` //`.${getExtention(url)[0]}`;  
         //ext =  ext?.substring(0,ext?.indexOf("?alt")) 
         
        let options = {
            fileCache: true,
            appendExt:  ext ,
            addAndroidDownloads : {
              useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
              notification : true,
              
              description : 'legistquest Downloading image.'
            },
            path:  `${PictureDir}/legistquest_${Math.floor(new Date().getTime()  + new Date().getSeconds() / 2)}${ext}`, // this is the path where your downloaded file will live in
          }
 


          await config(options).fetch('POST', url,{
            'Content-Type' : 'multipart/form-data',

          },formdata).then((res) => {
              
              if(Platform.OS =="ios"){
                RNFetchBlob.ios.previewDocument(res?.data)
              } 
              
            return "Downloading"
          })
          .catch((errorMessage)=>{
            console.log("ererr",errorMessage);
              return errorMessage
            }
            )
  
}
const getExtention = filename => {
  // To get the file extension
  return /[.]/.exec(filename) ?
           /[^.]+$/.exec(filename) : undefined;
};