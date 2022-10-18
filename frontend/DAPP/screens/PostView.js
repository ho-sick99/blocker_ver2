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
import LoginContext from '../context/LoginContext';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function PostView({navigation, route}) {
  const [post_info, setPost] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext);
  const [user_bmark, set_user_bmark] = useState(0);
  const [user_bmark_lst, set_user_bmark_lst] = useState(0);

  const loadPost = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/post_view', { post_id: route.params.post_id })
    setPost(result);
  };

  const my_bookmark = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/bookmark', { id: login_data.id})
    set_user_bmark(result.length);
    set_user_bmark_lst(result.data);
    console.log(user_bmark_lst)
  }

  const edit_my_bookmark = async () => {
    let edit_user_bmark_lst = "[";
    for(let i=0; i<user_bmark_lst.length; i++){
      edit_user_bmark_lst += "[" + user_bmark_lst[i][0] + ",\"" +user_bmark_lst[i][1]+ "\"],"
    }
    edit_user_bmark_lst = edit_user_bmark_lst.slice(0, -1);
    edit_user_bmark_lst += ']';
    const { data: res } = await Axios.post(HOSTNAME + '/edit_bookmark', { id: login_data.id, bookmark: {data: edit_user_bmark_lst, length: user_bmark_lst.length} });
    return res;
  }

  useEffect(() => {
    loadPost();
    my_bookmark();
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
        <TouchableOpacity style={styles.btn_add_bmark} onPress={() =>{
          if(!(login_data.id===post_info.id)){
            for(let i=0; i<user_bmark_lst.length; i++){
              if(user_bmark_lst[i][0] ===  route.params.post_id){
                alert("이미 등록된 게시글 입니다."); 
                return ;
              }
            }
            user_bmark_lst.push([route.params.post_id, post_info.post_title]);
            edit_my_bookmark(); 
          }
          alert("북마크 등록되었습니다."); 
        }}>
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