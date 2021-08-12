import React, {useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {WebView} from 'react-native-webview';
import {IDRAF_HIGELIGHT_COLORS} from '../utils/appColors';
import {getIdrafTabsList} from '../utils/common';

export default function IdrafComp({viewModel, judgement}) {
  const webView = useRef();
  const getIdrafTabButtons = (viewModel) => {
    //selected <=== removed
    const buttons = getIdrafTabsList(viewModel).map(
      (item) =>
        `<button  id="${item.label?.toLowerCase()}-1" class="btn btn-light mr-3 p-3"> ${
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

    <style>  
    body {margin: 0;   max-width: 100%; overflow-x: hidden;}
    #myBtn {
      display: none;
      position: fixed;
      bottom: 20px;
      right: 30px;
      z-index: 99;
      font-size: 18px;
      border: none;
      outline: none;
      background-color: #ed7e1f;
      color: white;
      cursor: pointer;
      padding: 15px;
      border-radius: 4px;
    }
    
    #myBtn:hover {
      background-color: #555;
    }

    button.btn.btn-light {
      border-bottom: 3px solid #ed7e1f;
      border-radius: 0;
      margin-right:5px;
    }
    .container-outer { position:fixed;background-color:#fff;  /* overflow: scroll; width: 500px; height: 50px;  */ }
    /* .container-inner { width: 600px; } */
 
    </style>
    </head>
<body style="max-width: 100%;overflow-x:hidden;"> 
<div class="container-outer">
   <div class="container-inner">
   ${getIdrafTabButtons(viewModel)}
   </div>
</div>

 
</br>
 <div style="margin-top:100px;">
 ${judgement}
 </div>
 <button onclick="topFunction()" id="myBtn" title="Go to top">Top</button>
 </body> 
</html>
`;

const getStyleRemover =()=>{
  let styleRmover = "function getStyleRemover( ) {"
  getIdrafTabsList(viewModel).map((item)=>{ 
    styleRmover += ` document.getElementById('selected${item.id?.toLowerCase()}-1').style.backgroundColor= 'transparent'; ` 
  })
  styleRmover+="}"
  console.log(styleRmover);
 return styleRmover
}

  const generateDynamicJavasciptToInject = () => {
    //
    let scriptString = `
     ${getStyleRemover()}
     var mybutton = document.getElementById("myBtn");
    window.onscroll = function() {scrollFunction()}; 
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }  
    function topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
    `; // "document.body.style.overflow = 'hidden'; ";
    getIdrafTabsList(viewModel).map(
      (item) =>
        (scriptString += `
      document.getElementById('${item.label?.toLowerCase()}-1').onclick = function changeContent() {   
        getStyleRemover()
        location.href = "#selected${item.id?.toLowerCase()}-1";    
        document.getElementById('selected${item.id?.toLowerCase()}-1').style.backgroundColor = '${
          IDRAF_HIGELIGHT_COLORS[item.id]
        }' ;  
        
      }`),
    );
    return scriptString;
  };
  
  useEffect(() => {
    const run = `
     ${generateDynamicJavasciptToInject()} 
    true;
  `;
    console.log({run});
    setTimeout(() => {
      webView?.current?.injectJavaScript(run);
    }, 500);
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
