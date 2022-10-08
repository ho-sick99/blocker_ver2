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
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화

function Proceeding({navigation}) {
  const htmldata = 
  `<html>
    <body>
      <h1>PDF file test</h1>
    </body>
  </html>`
  ;

  let generatePdf = async () => {
    const file = await printToFileAsync({
      html: htmldata,
      base64: true 
    });
    console.log(file);
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

export default Proceeding;