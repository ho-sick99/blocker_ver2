import React from 'react';
<<<<<<< HEAD
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

=======
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Proceeding({navigation}) {
>>>>>>> parent of 5fcb79e (계약서 pdf 저장 & 파일 불러오기 기능 구현)
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
 
        <TouchableOpacity style={styles.button_of_edit} onPress={() => alert("재계약")}>
          <Text style={styles.edit}>RE-CONTRACT</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flexDirection:'row',
    width: 310,
    height: 50,
    marginTop:500,
  },
  button_of_edit: {
    backgroundColor:'#007376',
    width: 310,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:23,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Proceeding;