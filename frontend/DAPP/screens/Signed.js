import React, {
  useContext,
  useState, 
  useEffect, 
}from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Pressable,
  Dimensions,
  Platform,
  ScrollView, 
  Image, 
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Axios from 'axios';
import { HOSTNAME } from "@env";
import LoginContext from '../context/LoginContext';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Signed({navigation, route}) {
  const isFocused = useIsFocused() // 리프레쉬
  const {login_data} = useContext(LoginContext);
  console.log(HOSTNAME);

  const contractors = JSON.parse(route.params.contractors); 
  const [sign_img_data_0, setSignImgData_0] = useState("");
  const [sign_img_data_1, setSignImgData_1] = useState("");
  const [sign_img_data_2, setSignImgData_2] = useState("");
  const [sign_img_data_3, setSignImgData_3] = useState("");

  const [user_name0, setUserName0] = useState("");
  const [user_name1, setUserName1] = useState("");
  const [user_name2, setUserName2] = useState("");
  const [user_name3, setUserName3] = useState("");

  const get_info = async (contractor_id, idx) => {
    const { data: result } = await Axios.post(HOSTNAME + '/get_sign_info', { id: contractor_id})
    const { data: result_name } = await Axios.post(HOSTNAME + '/get_user_name', { id: contractor_id})
    if(idx === 0){
      setSignImgData_0(result); 
      setUserName0(result_name);
    }
    else if(idx === 1){
      setSignImgData_1(result); 
      setUserName1(result_name);
    }
    else if(idx === 2){
      setSignImgData_2(result); 
      setUserName2(result_name);
    }
    else if(idx === 3){
      setSignImgData_3(result); 
      setUserName3(result_name);
    }
  }

  const get_contractor_info = async() => {
    for(let i=0; i<contractors.id.length; i++){
      get_info(contractors.id[i], i); 
    }
  }

 avoidance = async() => {
    alert("계약파기")
    let sigend_value = "[\"" + login_data.id + "\"]";
    let contractors_value= "{\"id\": [";
    for(let i=0; i<contractors.length; i++){
      contractors_value += "\"" + contractors[i] + "\","
    }
    contractors_value = contractors_value.slice(0, -1);
    contractors_value +="], \"length\": " + contractors.length +"}"
    
    const { data: result } = await Axios.post(HOSTNAME + '/signing_contract_add', { 
      title: "파기 계약서",
      content: "계약서는 ",
      id: login_data.id,
      contractors: contractors_value, 
      signed: sigend_value
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
    get_contractor_info(); 
  }, [isFocused]); // 리프레쉬 인자 전달6 3u

  const html = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>계약서 양식</title>
          <style>
            .centered { display: table; margin-left: auto; margin-right: auto; text-align: center; }
            .contract_writer { text-align: right; }
            .contract_date { text-align: left; }
            .contract_content { text-align: left; }
          </style>
      </head>
      <body class="centered">
          <H1>
               ${route.params.title}
          </H1>
          <H3 class="contract_date">
              계약 체결일: ${route.params.contract_date}
          </H3>
          <H3 class="contract_writer">
              작성자: ${login_data.name}(${route.params.id})
          </H3>
          <hr>
          <div>
              계약 참여자
              <table border="1">
                  <tbody>
                    <tr>
                          <td>${user_name0}</td>
                          <td>${user_name1}</td>
                          <td>${user_name2}</td>
                          <td>${user_name3}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <hr>
            계약 내용
            <br>
            <div>
              ${route.params.content}
            </div>
          <hr>
          <div>
              서명란
              <table border="1">
                  <thead>
                    <tr><th>${contractors.id[0]}</th><th>${contractors.id[1]}</th><th>${contractors.id[2]}</th><th>${contractors.id[3]}</th></tr>
                  </thead>
                  <tobdy>
                    <tr>
                      <td>${user_name0}</td><td><img src=${sign_img_data_0}></td>
                      <td>${user_name1}</td><td><img src=${sign_img_data_1}></td>
                      </tr>
                    <tr>
                      <td>${user_name2}</td><td><img src=${sign_img_data_2}></td>
                      <td>${user_name3}</td><td><img src=${sign_img_data_3}></td>
                    </tr>
                  </tobdy>
              </table>
          </div>
      </body>
  </html>
`;

  let generatePdf = async () => {
    //console.log(htmldata);
    const file = await printToFileAsync({
      html: html,
      base64 : true
    });
    //console.log(file);
    if(Platform.OS === "ios"){
      // ios인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
    else{
      // 안드로이드인 경우 
      await shareAsync(file.uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_contract}>
        <View>
          <Text style={styles.textTitle}>{route.params.title}</Text>
        </View>
        <View style={styles.container_top}>
          <Text style={styles.textDate}>계약 체결일: {route.params.contract_date}</Text>
          <Text style={styles.textWriter}>작성자: {login_data.name}({route.params.id})</Text>     
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
        <Pressable
              style={[styles.btn_contract_1]}
              onPress={() => {
                generatePdf()
              }}
              >
          <Text style={styles.textStyle_btn}>PDF</Text>
        </Pressable>
        <Pressable
              style={[styles.btn_contract_2]}
              onPress={() =>{
                avoidance(); 
              }}
              >
          <Text style={styles.textStyle_btn}>AVOIDANCE</Text>
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
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_contract_2: {
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
  },
  textTitle: {
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 25, 
  },
  textWriter: {
    textAlign: 'right', 
  },
  textContractors: {
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
    padding: 3, 
  },
  containerSign:{
    flexDirection: "row",
    justifyContent: 'space-between',
    width: "100%", 
    height: Height* 0.05,
  },
  imgSign:{
    width: Width * 0.2,
    height: Width* 0.1,
    borderRadius: 10, 
    borderColor: "#939393",
    borderWidth: 1,
    marginTop: 5
  },
  textDate:{
    textAlignL: "left", 
    marginBottom: 3, 
  },
  container_top:{
    borderRadius: 5, 
    borderColor: "#939393",
    borderWidth: 1,
    padding: 5, 
    marginBottom: 3, 
  }
});

export default Signed;