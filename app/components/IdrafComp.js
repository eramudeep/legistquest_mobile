import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export default function IdrafComp() {
  const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>sda</p>
</body>
</html>
`;
  return (
    <View style={{flex:1}}>
      <WebView source={{html}} />
    </View>
  );
}
