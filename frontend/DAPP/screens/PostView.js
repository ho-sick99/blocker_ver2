import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PostView({navigation, route}) {
  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.textbox}>아이디 : {route.params.id}</Text>
        <Text style={styles.textbox}>타이틀 : {route.params.title}</Text>
        <Text style={styles.textbox}>콘텐츠 : {route.params.content}</Text>
        <Text style={styles.textbox}>계약서 ID : {route.params.contract_id}</Text>
      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.push('Notice_board')}>
          <Text style={styles.edit}>ADD BOOK MARK</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flexDirection:'row',
    justifyContent:'center',
    width: "100%",
    height: "20%",
    //marginTop:"10%",
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
  button_of_edit: {
    backgroundColor:'#FFFFFF',
    width: 310,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textbox:{
    margin:"5%",
    fontsize:23,
    fontWeight: 'bold',
    borderColor:"#FFAF00",
  },
  edit: {
    fontSize:23,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default PostView;