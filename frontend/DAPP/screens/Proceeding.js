import React, {
  useContext,
  useState, 
  useEffect, 
} from 'react';
import LoginContext from '../context/LoginContext';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Pressable,
  ScrollView, 
  Image, 
} from 'react-native';
import Axios from 'axios';
import { HOSTNAME } from "@env";
import del_img from './image/del_img.png'; 

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Proceeding({navigation, route}) {
  const isFocused = useIsFocused() // 리프레쉬
  const {login_data} = useContext(LoginContext);

  const [sign_img_data_0, setSignImgData_0] = useState("");
  const [sign_img_data_1, setSignImgData_1] = useState("");
  const [sign_img_data_2, setSignImgData_2] = useState("");
  const [sign_img_data_3, setSignImgData_3] = useState("");

  const [sign0, setSign0] = useState("");
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [sign3, setSign3] = useState("");

  const [user_name0, setUserName0] = useState("");
  const [user_name1, setUserName1] = useState("");
  const [user_name2, setUserName2] = useState("");
  const [user_name3, setUserName3] = useState("");

  const contractors = JSON.parse(route.params.contractors); 
  const sigend_info = JSON.parse(route.params.signed); 
  console.log(HOSTNAME);

  const get_info = async (contractor_id, idx) => {
    const { data: result } = await Axios.post(HOSTNAME + '/get_sign_info', { id: contractor_id})
    const { data: result_name } = await Axios.post(HOSTNAME + '/get_user_name', { id: contractor_id})
    if(idx === 0){
      if(sigend_info.includes(contractor_id)){
        setSignImgData_0(result); 
      }
      setUserName0(result_name);
    }
    else if(idx === 1){
      if(sigend_info.includes(contractor_id)){
        setSignImgData_1(result); 
      }
      setUserName1(result_name);
    }
    else if(idx === 2){
      if(sigend_info.includes(contractor_id)){
        setSignImgData_2(result); 
      }
      setUserName2(result_name);
    }
    else if(idx === 3){
      if(sigend_info.includes(contractor_id)){
        setSignImgData_3(result); 
      }
      setUserName3(result_name);
    }
  }
  const get_contractor_info = async () => {
    for(let i=0; i<contractors.id.length; i++){
      get_info(contractors.id[i], i); 
    }
  }

  const sign_on_contract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/check_sign',{ id: login_data.id, contract_id: route.params.contract_id})
    if(result.success){
      if(result.contract_bool){
        alert("모두 사인 완료")
        // 시간 넣어서 같이 계약서에 표시되도록 
        if(route.params.avoidance > 0){
          const { data: result } = await Axios.post(HOSTNAME + '/set_singed_avoidance',{ contract_id: route.params.avoidance, avoidance: route.params.avoidance});
        }
        const { data: result } = await Axios.post(HOSTNAME + '/progress_contract',{ contract_id: route.params.contract_id})
        if(result.success){
          navigation.pop()
        }
      }
      else{
        alert("계약서에 서명했습니다.");
      }
    }
    else{
      alert(result.msg);
    }
    // 서명 후 계약 진행 확인 
  }

  const cancle_contract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/cancle_progress_contract',{contract_id: route.params.contract_id})
    if(result.success){
      alert("진행중인 계약이 취소되었습니다.");
    }
    else{
      alert(result.msg);
    }
  }

  useEffect(() => {
    get_contractor_info(); 
  }, [isFocused]); // 리프레쉬 인자 전달6 3u



  return (
    <View style={styles.container}>
      <View style={styles.container_contract}>
        <View>
          <Text style={styles.textTitle}>{route.params.title}</Text>
        </View>

        <View>
          <Text style={styles.textWriter}>작성자: {route.params.id}</Text>     
        </View>
        
        <View style={styles.textContractors}>
          <Text>{user_name0}</Text>
          <Text>{user_name1}</Text>
          <Text>{user_name2}</Text>
          <Text>{user_name3}</Text>
        </View>

        <ScrollView style={styles.containerContent}>
          <Text style={styles.textContent}>{route.params.content}</Text>
        </ScrollView>
        
        <View style={styles.containerSign}>
          <Image source = {{uri: sign_img_data_0}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_1}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_2}} style={styles.imgSign}/>
          <Image source = {{uri: sign_img_data_3}} style={styles.imgSign}/>
        </View> 
        
      </View>

      <View style={styles.container_button}>
        <Pressable style={styles.btn_contract_1} 
        onPress={() => {
          cancle_contract(); 
          navigation.pop()
         }}>
          <Text style={styles.textStyle_btn}>CANCLE</Text>
        </Pressable> 
        <Pressable style={styles.btn_contract_3} 
        onPress={() => {
          sign_on_contract(); 
          }}>
          <Text style={styles.textStyle_btn}>SIGN</Text>
        </Pressable>
        <Pressable style={styles.btn_contract_2} 
        onPress={() => {
          alert("수정")
          }}>
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </Pressable>
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
  container_contract: {
    flexDirection:'column',
    justifyContent:'flex-start',
    padding:"5%",
    width:"94%",
    height:"87%",
    margin: "3%",
    borderRadius:10,
    backgroundColor:"#FFFFFF",
  },
  container_button: {
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
  btn_contract_1: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_contract_2: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    marginRight: 10, 
    justifyContent : 'center',
    alignItems: 'center', 
  },
  btn_contract_3: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  },
  textTitle: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 25, 
  },
  textWriter: {
    textAlign: 'right', 
    marginTop: 5
  },
  textContractors: {
    marginTop: 5, 
    flexDirection: "row",
    justifyContent: 'space-between',
    textAlign: 'center', 
    marginBottom: 20, 
    borderRadius: 5, 
    borderColor: "#2196F3",
    borderWidth: 3,
    padding: 3, 
  },
  containerContent:{
    backgroundColor:'#E7E6E6',
    borderRadius: 5, 
    padding: 5, 
  },
  containerSign:{
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "100%", 
    height: Height* 0.05,
  },
  imgSign:{
    backgroundColor: "white", 
    width: Width * 0.2,
    height: Width* 0.1,
    borderRadius: 5, 
    borderColor: "#939393",
    borderWidth: 1,
    marginTop: 5
  }
});

export default Proceeding;