import React, {useState,Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Contract_Eidt({navigation, route}) {

  return ( 
      <View style={styles.container}>
        <View style={styles.container3}>
          <TextInput style={styles.textbox}>타이틀 : {route.params.title}</TextInput>
          <TextInput style={styles.textbox}>아이디 : {route.params.id}</TextInput>
          <TextInput style={styles.textbox}>콘텐츠 : {route.params.content}</TextInput>
          <TextInput style={styles.textbox}>계약서 ID : {route.params.contract_id}</TextInput>
        </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.space}></TouchableOpacity>    
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.navigate("N_Signed", {
                      title: route.params.title,
                      id: route.params.id,
                      content: route.params.content,
                      contract_id: route.params.contract_id,
        })}>
          <Text style={styles.edit}>COMPLETION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.space}></TouchableOpacity>    
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
    backgroundColor:"#04B45F",
    width: 130,
    height: 50,
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

export default Contract_Eidt;