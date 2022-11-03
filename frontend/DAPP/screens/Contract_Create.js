import React, { 
  useState, 
  useEffect,
  useContext,  
} from "react";
import {
  StyleSheet, 
  Text,
  View, 
  TextInput,
  Dimensions,
  Pressable,
} from 'react-native';
import { HOSTNAME } from "@env";
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginContext from '../context/LoginContext';
import Axios from 'axios';
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Contract_Create({navigation, route}) {
  console.log(HOSTNAME);
  const {login_data} = useContext(LoginContext);
  const [contract_title, setTitle] = useState(); // 타이틀
  const [contract_content, setContent] = useState(); // 컨텐트
  const [contract_id, setContractId] = useState(); // 컨텐트
  const [modalVisible_my_contract, setMyContracttViewModalVisible] = useState(false);
  const [contracts, setContracts] = useState([]); // 계약서 배열

  const _handleedit_title_Change = text => {
    setTitle(text);
  }

  const _handleedit_content_Change = text => {
    setContent(text);
  }

  const addContract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_add', {
      title: contract_title, 
      content: contract_content,
      id: login_data.id, 
    }); 
    console.log(result);
  };


  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container_contract}>
          <Text style={styles.textframe}>계약서</Text>
        <TextInput style={styles.textbox} value={contract_title} onChangeText={_handleedit_title_Change}></TextInput>
          <Text style={styles.textframe}>계약내용</Text>
        <TextInput style={styles.textbox} value={contract_content} onChangeText={_handleedit_content_Change}></TextInput>
        </View>
      <View style={styles.container_button}>
        <Pressable style={styles.btn_create} onPress={() => {
          addContract(); 
          navigation.pop(); 
          }}>
          <Text style={styles.edit}>CREATE</Text>
        </Pressable>
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