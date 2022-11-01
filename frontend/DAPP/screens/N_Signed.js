import React, {
  useState,
  useEffect,
  useContext,  
} from 'react';
import {
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Dimensions, 
} from 'react-native';
import LoginContext from '../context/LoginContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { HOSTNAME } from "@env";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화


function N_Signed({navigation, route}) {
  const {login_data} = useContext(LoginContext);
  const [contarct_info, setContract] = useState([]); // 계약서 배열
  const [contract_title, setTitle] = useState(); // 타이틀
  const [contract_content, setContent] = useState(); // 컨텐트
  const [contract_id, setContractId] = useState(); // 컨텐트

  const loadContract = async () => {
    console.log("계약 내용 불러오기:");
    const { data: result } = await Axios.post(HOSTNAME + '/contract_view', { contract_id: route.params.contract_id })
    console.log(result);
    setContract(result);
    setTitle(result.title)
    setContent(result.content)
    setContractId(result.contract_id)
  };

  const del_my_contract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_del', { contract_id: contract_id, contract_type: "n_signed"});
  }

  useEffect(() => {
    loadContract();
  }, []);
  
  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container_contract}>
        
        <View style={styles.textbox_fix}>
          <Text style={styles.textframe}>아아디: {login_data.id}</Text>      
          <Text style={styles.textframe}>계약서 ID: {contract_id}</Text>
        </View>
          <Text style={styles.textframe}>계약서: {contract_title}</Text>
          <Text style={styles.textframe}>계약내용</Text>
          <Text style={styles.textbox}>{contract_content}</Text>
          <Text style={styles.textframe}></Text>

        </View>
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.button_of_del} onPress={() => {
          del_my_contract();
          navigation.pop(); 
        }}>
          <Text style={styles.textStyle_btn}>DEL</Text>
        </TouchableOpacity>  
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.replace("Contract_Edit", {
                      title: contarct_info.title,
                      id: contarct_info.id,
                      content: contarct_info.content,
                      contract_id: contarct_info.contract_id,
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