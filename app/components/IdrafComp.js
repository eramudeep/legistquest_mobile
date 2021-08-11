import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {WebView} from 'react-native-webview';
import { IDRAF_HIGELIGHT_COLORS } from '../utils/appColors';
import {getIdrafTabsList} from '../utils/common';

export default function IdrafComp({viewModel, judgement}) {
  const webView = useRef();
  const getIdrafTabButtons = (viewModel) => {
    //selected <=== removed
    const buttons = getIdrafTabsList(viewModel).map(
      (item) =>
        `<button  id="${item.label?.toLowerCase()}-1" class="btn btn-info mr-3 p-3"> ${
          item.label
        } </button>`,
    );
    const tmpbuttons = buttons?.toString();
    return tmpbuttons?.replace(/,/g, '');
  };

  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body> 
<div class="mb-3 mt-3">
 ${getIdrafTabButtons(viewModel)}
 </div>
</br>
 ${judgement} </body> 
</html>
`;

  const generateDynamicJavasciptToInject = () => {
    let scriptString = "" ;// "document.body.style.overflow = 'hidden'; ";
    getIdrafTabsList(viewModel).map(
      (item) =>
        (scriptString += `
      document.getElementById('${item.label?.toLowerCase()}-1').onclick = function changeContent() {   
        location.href = "#selected${item.id?.toLowerCase()}-1";  
        document.getElementById('selected${item.id?.toLowerCase()}-1').style.backgroundColor = '${IDRAF_HIGELIGHT_COLORS[item.id]}' ;  
        
      }`),
    );
    return scriptString;
  };
  useEffect(() => {
    const run = `
     ${generateDynamicJavasciptToInject()} 
    true;
  `;
    setTimeout(() => {
      webView?.current?.injectJavaScript(run);
    }, 300);
  }, []);
  const runFirst = `
      document.body.style.backgroundColor = 'red';
      const myp = document.getElementById("myp")
      myp.innerText ="ramadas" 
     
      true; // note: this is required, or you'll sometimes get silent failures
    `;
  return (
    <View style={{flex: 1, height: 700, backgroundColor: 'red'}}>
      <WebView
        ref={webView}
        source={{html}}
        onMessage={(event) => {
          console.log({event});
        }}
        // injectedJavaScript={runFirst}
      />
    </View>
  );
}
