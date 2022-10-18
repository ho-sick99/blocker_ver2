import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { HOSTNAME } from "@env";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function PostView({navigation, route}) {
  const [post_info, setPost] = useState([]); // 계약서 배열

  const loadPost = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/post_view', { post_id: route.params.post_id })
    setPost(result);
  };

  useEffect(() => {
    loadPost()
  }, []);
  
  return (
    <View style={styles.container}>
      <View style={styles.container_post}>
        <Text style={styles.textbox}>아이디 : {post_info.id}</Text>
        <Text style={styles.textbox}>타이틀 : {post_info.post_title}</Text>
        <Text style={styles.textbox}>콘텐츠 : {post_info.post_content}</Text>
        <Text style={styles.textbox}>계약서 ID : {post_info.contract_id}</Text>
      </View>
      
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.btn_contract_view}
                onPress={() => navigation.push("Contract_View", { 
                  contract_id: post_info.contract_id
                })}>
            <Text style={styles.textStyle_btn}>Contract</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_add_bmark} onPress={() => navigation.push('Notice_board')}>
            <Text style={styles.textStyle_btn}>BookMark</Text>
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
  container_post: {
    backgroundColor:'white',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"94%",
    height: "87%",
    margin: "3%",
    borderRadius:10,
  },
  container_button:{
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
  btn_contract_view: {
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_add_bmark:{
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
  },
  textbox:{
    margin:"5%",
    fontsize:23,
    fontWeight: 'bold',
    borderColor:"#FFAF00",
  },

});

export default PostView;