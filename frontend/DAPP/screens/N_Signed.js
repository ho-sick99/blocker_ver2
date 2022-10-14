import React, {
  useState,
  useEffect,
  CommonActions ,
} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';


function N_Signed({navigation, route}) {
  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container3}>
          <Text style={styles.textframe}>★타이틀★</Text>
          <Text style={styles.textbox}>{route.params.title}</Text>
          <Text style={styles.textframe}></Text>

          <Text style={styles.textframe}>★아이디★</Text>
          <Text style={styles.textbox}>{route.params.id}</Text>
          <Text style={styles.textframe}></Text>

          <Text style={styles.textframe}>★콘텐츠★</Text>
          <Text style={styles.textbox}>{route.params.content}</Text>
          <Text style={styles.textframe}></Text>

          <Text style={styles.textframe}>★계약서 ID★</Text>
          <Text style={styles.textbox}>{route.params.contract_id}</Text>
          {/* <TextInput style={styles.textbox} placeholder="계약서 내용 입력"></TextInput> */}
        </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button_of_del} onPress={() => alert("삭제")}>
          <Text style={styles.del}>DEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.space}></TouchableOpacity>    
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.replace("Contract_Edit", {
                      title: route.params.title,
                      id: route.params.id,
                      content: route.params.content,
                      contract_id: route.params.contract_id,
        })}>
          <Text style={styles.edit}>EDIT</Text>
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
    justifyContent:'center',
    width: "100%",
    height: "20%",
    backgroundColor:"#000000"
  },
  container3:{
    flexDirection:'column',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"100%",
    height:"80%",
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
  textbox:{
    margin:"5%",
    fontsize:23,
    fontWeight: 'bold',
    borderColor:"#FFAF00",
  },
  button_of_del: {
    backgroundColor:"#FFFFFF",
    width: 130,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  del: {
    fontSize:23,
    color: 'black',
    fontWeight: 'bold',
  },
  space: {
    width: 50,
    height: 50,
  },
  button_of_edit: {
    backgroundColor:"#FFFFFF",
    width: 130,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:23,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default N_Signed;