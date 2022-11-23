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
  Pressable, 
  Modal, 
  ScrollView, 
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
  const [modalVisible_contractors, setContractorsList] = useState(false);
  
  const [contractor1, setContractor1] = useState();
  const [contractor2, setContractor2] = useState();
  const [contractor3, setContractor3] = useState();
  const [contractors, setContractors] = useState([login_data.id]);

  const [bool_contractor1, setBoolContractor1] = useState(true);
  const [bool_contractor2, setBoolContractor2] = useState(true);
  const [bool_contractor3, setBoolContractor3] = useState(true);


  const _handleedit_contractor1_Change = text => {
    setContractor1(text);
  }
  const _handleedit_contractor2_Change = text => {
    setContractor2(text);
  }
  const _handleedit_contractor3_Change = text => {
    setContractor3(text);
  }

  const loadContract = async () => {
    console.log("계약 내용 불러오기:");
    const { data: result } = await Axios.post(HOSTNAME + '/contract_view', { contract_id: route.params.contract_id })
    setContract(result);
    setTitle(result.title)
    setContent(result.content)
    setContractId(result.contract_id)
  };

  const del_my_contract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_del', { contract_id: contract_id, contract_type: "n_signed"});
  }

  // 아이디 중복 확인
  const chk_id = async (id_input) => {
    const { data: result } = await Axios.post(HOSTNAME + '/chk_id', { id: id_input})
    return result;
  }
  
  const progress_contract = async () => {
    let sigend_value = "[\"" + login_data.id + "\"]";
    let contractors_value= "{\"id\": [";
    for(let i=0; i<contractors.length; i++){
      contractors_value += "\"" + contractors[i] + "\","
    }
    contractors_value = contractors_value.slice(0, -1);
    contractors_value +="], \"length\": " + contractors.length +"}"
    
    const { data: result } = await Axios.post(HOSTNAME + '/signing_contract_add', { 
      title: contract_title,
      content: contract_content,
      id: login_data.id,
      contractors: contractors_value, 
      signed: sigend_value,
      avoidance: 0, 
    })
    
    if(result.success){
      alert("계약 진행"); 
      navigation.pop(); 
    }
    else{
      alert(result.msg); 
    }
  }
  useEffect(() => {
    loadContract();
  }, []);
  
  return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
      <View style={styles.container}>
        <View style={styles.container_contract}>
          <View style={styles.textbox_fix}>
            <Text style={styles.textframe}>{contract_title}</Text>
            <Text style={styles.textframe}>작성자: {login_data.id}</Text>     
          </View>
        
          <ScrollView style={styles.container_content}>
            <Text style={styles.text_content}>{contract_content}</Text>
          </ScrollView>
        

        </View>
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.button_of_del} onPress={() => {
          del_my_contract();
          navigation.pop(); 
        }}>
          <Text style={styles.textStyle_btn}>DEL</Text>
        </TouchableOpacity>  
        <Pressable style={styles.button_of_prc} onPress={() => {
          setContractorsList(true); 
        }}>
          <Text style={styles.textStyle_btn}>Proceed</Text>
        </Pressable>  
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.replace("Contract_Edit", {
                      title: contarct_info.title,
                      id: contarct_info.id,
                      content: contarct_info.content,
                      contract_id: contarct_info.contract_id,
        })}>
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_contractors}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setContractorsList(!modalVisible_contractors);
        }}
      >
        <View style={styles.container_contractors_lst}>
          <View style={styles.container_contracts}>
            <View style={styles.container_contractor_id}>
              <TextInput style={styles.textbox} value={contractor1} onChangeText={_handleedit_contractor1_Change}></TextInput>
              <Pressable
                  style={styles.btn_chk_id}
                  onPress={async () => {
                    const chk_id_res = await chk_id(contractor1);
                    if(chk_id_res.is_signin){
                      alert("해당 ID는 존재하지 않습니다.");
                      setBoolContractor1(false); 
                    }
                    else{
                      alert("계약 참여자 ID 확인");
                      setBoolContractor1(true); 
                      contractors.push(contractor1); 
                      console.log(contractors)
                    }
                  }}
                >
                  <Text style={styles.textStyle}>CHK ID</Text>
              </Pressable>
            </View>
            
            <View style={styles.container_contractor_id}>
            <TextInput style={styles.textbox} value={contractor2} onChangeText={_handleedit_contractor2_Change}></TextInput>
            <Pressable
                  style={styles.btn_chk_id}
                  onPress={async () => {
                    const chk_id_res = await chk_id(contractor2);
                    if(chk_id_res.is_signin){
                      alert("해당 ID는 존재하지 않습니다.");
                      setBoolContractor2(false); 
                    }
                    else{
                      alert("계약 참여자 ID 확인");
                      setBoolContractor2(true); 
                      contractors.push(contractor2); 
                      console.log(contractors)
                    }
                  }}
                >
                  <Text style={styles.textStyle}>CHK ID</Text>
              </Pressable>
            </View>
        
            <View style={styles.container_contractor_id}>
              <TextInput style={styles.textbox} value={contractor3} onChangeText={_handleedit_contractor3_Change}></TextInput>
              <Pressable
                    style={styles.btn_chk_id}
                    onPress={async () => {
                      const chk_id_res = await chk_id(contractor3);
                      if(chk_id_res.is_signin){
                        alert("해당 ID는 존재하지 않습니다.");
                        setBoolContractor3(false); 
                      }
                      else{
                        alert("계약 참여자 ID 확인");
                        setBoolContractor3(true); 
                        contractors.push(contractor3); 
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>CHK ID</Text>
              </Pressable>
            </View>
          </View>
        

          <View style={styles.container_modal_btn}>
            <Pressable
                style={[styles.button_modal]}
                onPress={() => setContractorsList(!modalVisible_contractors)}
                >
                <Text style={styles.textStyle_4}>Close</Text>
            </Pressable>
            <Pressable
                style={[styles.button_modal]}
                onPress={() => {
                  if(bool_contractor1 && bool_contractor2 && bool_contractor3){
                   progress_contract();
                  }
                  else{
                    alert("계약 진행 불가"); 
                  }
                  setContractorsList(!modalVisible_contractors)
                }}
                >
                <Text style={styles.textStyle_4}>Proceed</Text>
            </Pressable>
          </View>
        </View>
      </Modal> 

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
    width: Width* 0.3,
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
    width: Width* 0.3,
    height: Height* 0.07,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  button_of_prc: {
    backgroundColor: "#2196F3",
    width: Width* 0.3,
    height: Height* 0.07,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_contractors_lst: {
    width: "100%",
    alignItems: "center",
    marginTop: "50%",
    borderColor: "#2196F3",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button_modal: {
    width: "45%",
    margin: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  container_modal_btn:{
    flexDirection: "row",
    justifyContent: 'space-between',
  }, 
  textStyle_4: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  container_contracts:{
    padding: 10, 
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
  container_contractor_id:{
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  btn_chk_id:{
    width: Width* 0.2,
    position: 'absolute',
    borderRadius: 5, 
    backgroundColor: "#7A8C98", 
    right: "-%",
  },
  textStyle:{
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 5, 
  },
  container_content: {
    width: Width* 0.84,
    borderColor:"black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5, 
    marginTop: 10, 
  },
  text_content:{
    fontsize:23,
    margin: 5
  }
  
});

export default N_Signed;