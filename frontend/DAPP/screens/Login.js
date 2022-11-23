import React, { useState, useContext, useEffect } from "react";
import { Image, Modal, TextInput, Touchable } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Pressable } from 'react-native';
import { HOSTNAME } from "@env";
import Axios from 'axios';
import LoginContext from "../context/LoginContext";


function Login({ navigation }) {
  console.log(HOSTNAME); 
  // 회원 가입 제어 변수 
  const [is_sign_in, set_is_sign_in] = useState(false);
  const [modalVisible_login, setLoginModalVisible] = useState(false);
  const [modalVisible_register, setRegisterModalVisible] = useState(false);
  const [input_id, set_id] = useState('');
  const [input_pw, set_pw] = useState('');
  const [input_name, set_name] = useState('');
  const _handleIDTextChange = text => {
    set_id(text);
  }
  const _handlePWTextChange = text => {
    set_pw(text);
  }
  const _handleNAMETextChange = text => {
    set_name(text);
  }
  const reset_input = () => {
    set_id("");
    set_pw("");
    set_name("");
  }

  // 로그인 Context 관리 함수 
  const { set_login_data } = useContext(LoginContext);

  // 로그인 
  const chk_login = async (id_input, pw_input) => {
    console.log(HOSTNAME);
    const { data: res } = await Axios.post(HOSTNAME + '/login', { id: id_input, pw: pw_input })
    console.log(res);
    return res;
  }
  // 회원가입 
  const req_register = async (id_input, pw_input, input_name) => {
    const { data: result } = await Axios.post(HOSTNAME + '/register', { id: id_input, pw: pw_input, name: input_name })
    console.log(result);
    return result;
  }
  // 아이디 중복 확인
  const chk_id = async (id_input) => {
    const { data: result } = await Axios.post(HOSTNAME + '/chk_id', { id: id_input})
    return result;
  }

  ///////////로그인 안될때 들어가는 버튼 - button_of_escape////////////
  return (
    <View style={styles.container}>
      <Text style={styles.title} >Start with Blocker</Text>
      <Image
        source={require("./image/Logo.png")}
        style={{ position: 'absolute', width: 130, height: 130, top: 250 }}>
      </Image>
      
      <TouchableOpacity style={styles.button_1} onPress={() => setLoginModalVisible(true)}>
        <Text style={styles.title_1} >Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_2} onPress={() => setRegisterModalVisible(true)}>
        <Text style={styles.title_2}>Sign up</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_login}
        onRequestClose={() => {
          setLoginModalVisible(!modalVisible_login);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.TextInput]}
              placeholder=' ID'
              value={input_id}
              onChangeText={_handleIDTextChange}
            >
            </TextInput>
            <TextInput style={styles.TextInput}
              placeholder=' PASSWORD'
              secureTextEntry={true}
              value={input_pw}
              onChangeText={_handlePWTextChange}
            >
            </TextInput>
            <View style={styles.modal_btn_view}>
              <Pressable
                style={[styles.button_modal, styles.button_login]}
                onPress={async () => {
                  const res = await chk_login(input_id, input_pw);
                  if (res.success) {
                    // 로그인 상태 변경
                    set_login_data(input_id, res.name, 1);
                    setLoginModalVisible(!modalVisible_login);
                    navigation.navigate("Notice_board");
                  }
                  else {
                    if (res.err) alert(res.err);
                    else alert(res.msg);
                  }
                  reset_input();
                }}
              >
                <Text style={styles.textStyle}>Login</Text>
              </Pressable>
              <Pressable
                style={[styles.button_modal, styles.button_close]}
                onPress={() => setLoginModalVisible(!modalVisible_login)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_register}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setRegisterModalVisible(!modalVisible_register);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={[styles.TextInput]}
              placeholder=' NAME'
              value={input_name}
              onChangeText={_handleNAMETextChange}
            >
            </TextInput>

            <TextInput
              style={[styles.TextInput]}
              placeholder=' ID'
              value={input_id}
              onChangeText={_handleIDTextChange}
            >
            </TextInput>
            
            <Pressable
                style={[styles.modal_btn_chk_id]}
                onPress={async() =>{
                  const chk_id_res = await chk_id(input_id);
                  if(chk_id_res.is_signin){
                    set_is_sign_in(true);
                    alert("회원 가입 가능");
                  }
                  else{
                    alert("해당 ID는 이미 사용 중");
                  }
                }}
              >
                <Text style={styles.textStyle}>중복확인</Text>
            </Pressable>

            <TextInput style={styles.TextInput}
              placeholder=' PASSWORD'
              secureTextEntry={true}
              value={input_pw}
              onChangeText={_handlePWTextChange}
            >
            </TextInput>
            <View style={styles.modal_btn_view}>
              <Pressable
                style={[styles.button_modal, styles.button_login]}
                onPress={async () => {
                  if(is_sign_in){
                    const res = await req_register(input_id, input_pw, input_name);
                    if (res.success === "success") {
                      console.log("success")
                      setRegisterModalVisible(!modalVisible_register)
                      setLoginModalVisible(true)
                    }
                    else {
                      console.log("fail")
                    }
                    reset_input();
                  }
                  else {
                    alert("ID 중복 확인 필요")
                  }
                  setRegisterModalVisible(!modalVisible_register)
                  setLoginModalVisible(true)
                }}
              >
                <Text style={styles.textStyle}>Sign in</Text>
              </Pressable>
              <Pressable
                style={[styles.button_modal, styles.button_close]}
                onPress={() => setRegisterModalVisible(!modalVisible_register)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
                
            
          </View>
        </View>
      </Modal>

    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
//긴급탈출버튼
  button_of_escape: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 150,
    height: 40,
    top: 0,
    borderRadius: 10,
  },

  button_1: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0DF9FF',
    width: 280,
    height: 40,
    top: 470,
    borderRadius: 10,
  },

  title: {
    top: "-25%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#0DF9FF",
  },

  title_1: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  button_2: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 280,
    height: 40,
    top: 530,
    borderRadius: 10,
  },

  title_2: {
    fontSize: 15,
    color: "#0DF9FF",
    fontWeight: "bold",

  },

  centeredView: {
    flex: 1,
    alignItems: "center",
    marginTop: 150
  },

  modalView: {
    margin: 20,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0
  },

  button_modal: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "49%",
    alignItems: "center",
    marginTop: 10
  },

  button_login: {
    backgroundColor: "#2196F3",
  },
  button_close: {
    backgroundColor: "#2196F3",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginBottom: 5,
    width: 200,
    textAlign: "center"
  },
  TextInput: {
    backgroundColor: "grey",
    width: "100%",
    height: 40,
    margin: 5,
    borderRadius: 5,
    fontSize: 20,
  },
  modal_btn_view: {
    width: "100%",
    flexDirection: 'row', // 혹은 'column'
    justifyContent: 'space-between',
  },
  modal_btn_chk_id: {
    justifyContent: 'center',
    width: "20%",
    height: 40,
    backgroundColor: '#D0CECE',
    position: 'absolute',
    top:  50,
    right: -7,
    margin: 30,
    borderRadius: 5,
  },

});