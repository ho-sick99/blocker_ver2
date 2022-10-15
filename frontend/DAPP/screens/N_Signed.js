import React, {
  useState,
  useEffect,
  CommonActions ,
} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Dimensions, 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화


function N_Signed({navigation, route}) {
  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container_contract}>
        
        <View style={styles.textbox_fix}>
          <Text style={styles.textframe}>아아디: {route.params.id}</Text>      
          <Text style={styles.textframe}>계약서 ID: {route.params.contract_id}</Text>
        </View>

          <Text style={styles.textframe}>계약서: {route.params.title}</Text>

          <Text style={styles.textframe}>계약내용</Text>
          <Text style={styles.textbox}>{route.params.content}</Text>
          <Text style={styles.textframe}></Text>

          {/* <TextInput style={styles.textbox} placeholder="계약서 내용 입력"></TextInput> */}
        </View>
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.button_of_del} onPress={() => alert("삭제")}>
          <Text style={styles.textStyle_btn}>DEL</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.replace("Contract_Edit", {
                      title: route.params.title,
                      id: route.params.id,
                      content: route.params.content,
                      contract_id: route.params.contract_id,
        })}>
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </TouchableOpacity>
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
  container_button: {
    flexDirection: 'row',
    width: "100%",
    height: "10%",
    justifyContent: 'space-between',
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
    borderColor:"#FFAF00",
  },
  textbox_fix: {
    width: Width* 0.84,
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 20, 
    borderRadius: 5, 
    borderColor: "#2196F3",
    borderWidth: 3,
    paddingLeft: 5, 
    paddingRight: 5,
  },
  textbox:{
    margin:"5%",
    fontsize:23,
    fontWeight: 'bold',
    borderColor:"#FFAF00",
  },
  button_of_del: {
    backgroundColor: "#2196F3",
    width: Width* 0.45,
    height: Height* 0.07,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, 
  },
  textStyle_btn : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
  },
  button_of_edit: {
    backgroundColor: "#2196F3",
    width: Width* 0.45,
    height: Height* 0.07,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
});

export default N_Signed;