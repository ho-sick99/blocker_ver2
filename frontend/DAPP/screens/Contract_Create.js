import React from 'react';
import {
  StyleSheet, 
  Text,
  View, 
  TextInput,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Contract_Create({navigation, route}) {
  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container_contract}>
          <Text style={styles.textframe}>계약서</Text>
          <TextInput style={styles.textbox}>계약서 이름을 입력하세요...</TextInput>
          <Text style={styles.textframe}>계약내용</Text>
          <TextInput style={styles.textbox}>계약 내용을 입력하세요...</TextInput>
        </View>
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.btn_create} onPress={() => navigation.pop()}>
          <Text style={styles.edit}>CREATE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.space}></TouchableOpacity>    
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#E7E6E6", 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_button: {
    flexDirection:'row',
    width: "100%",
    height: "10%",
    justifyContent:'center',
  },
  container_contract:{
    flexDirection:'column',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"94%",
    height:"87%",
    margin: "3%",
    borderRadius:10,
    backgroundColor:"#FFFFFF",
  },
  textframe:{
    margin:"2%",
    fontsize:50,
    fontWeight: 'bold',
  },
  textbox:{
    fontsize: 23,
    fontWeight: 'bold',
    borderColor: "#FFAF00",
    backgroundColor: "#E7E6E6",
    borderRadius: 5, 
    padding: 5, 
    width: Width* 0.84,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10, 
  },
  btn_create: {
    backgroundColor:"#04B45F",
    width: Width* 0.94,
    height: Height* 0.07,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Contract_Create;