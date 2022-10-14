import React from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화

function Signed({navigation, route}) {
  const html = `
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      한글 인식 테스트
      한글 추가 
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;

  let generatePdf = async () => {
    //console.log(htmldata);
    const file = await printToFileAsync({
      html: html,
      base64 : true
    });
    //console.log(file);
    if(Platform.OS === "ios"){
      // ios인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
    else{
      // 안드로이드인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.container_contract}>
        <Text>contarct view</Text>
        <Text>{route.params.title}</Text>
        <Text>{route.params.content}</Text>
        <Text>{route.params.contractors}</Text>
      </View>
      
      <View style={styles.container_button}>
        <Pressable
              style={[styles.btn_contract]}
              onPress={() => alert("재계약")}
              >
          <Text style={styles.textStyle_btn}>Renewal Contract</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract]}
              onPress={() => {
                generatePdf()
              }}
              >
          <Text style={styles.textStyle_btn}>Conver to PDF</Text>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_contract: {
    backgroundColor:'balck',
    width: "100%",
    height: "90%",
  },
  container_button: {
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  textStyle_btn : {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn_contract: {
    width: "45%",
    height: Width * 0.1,
    margin: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  }
});

export default Signed;