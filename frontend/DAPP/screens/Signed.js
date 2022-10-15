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
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

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
              style={[styles.btn_contract_1]}
              onPress={() => alert("재계약")}
              >
          <Text style={styles.textStyle_btn}>RE-CON</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract_2]}
              onPress={() => {
                generatePdf()
              }}
              >
          <Text style={styles.textStyle_btn}>PDF</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract_3]}
              onPress={() => alert("계약파기")}
              >
          <Text style={styles.textStyle_btn}>CANCLE</Text>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#E7E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_contract: {
    backgroundColor:'white',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"94%",
    height: "87%",
    margin: "3%",
    borderRadius:10,
  },
  container_button: {
    width: "100%",
    height: "10%",
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  textStyle_btn : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  },
  btn_contract_1: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_contract_2: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  },
  btn_contract_3: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
  },
});

export default Signed;