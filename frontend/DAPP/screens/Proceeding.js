import React from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Pressable,
} from 'react-native';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
function Proceeding({navigation, route}) {
  return (
    <View style={styles.container}>

      <View style={styles.container_contract}>
        <Text>contarct view</Text>
        <Text>{route.params.title}</Text>
        <Text>{route.params.content}</Text>
        <Text>{route.params.contractors}</Text>
      </View>

      <View style={styles.container_button}>
        <Pressable style={styles.btn_contract} 
        onPress={() => {
          alert("삭제")
         }}>
          <Text style={styles.textStyle_btn}>CANCLE</Text>
        </Pressable> 
        <Pressable style={styles.btn_contract} 
        onPress={() => {
          alert("수정")
          }}>
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </Pressable>
        <Pressable style={styles.btn_contract} 
        onPress={() => {
          alert("사인")
          }}>
          <Text style={styles.textStyle_btn}>SIGN</Text>
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
    width: "30%",
    height: Width * 0.1,
    margin: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  }
});

export default Proceeding;