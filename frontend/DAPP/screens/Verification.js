import React, {
    useState,
    useEffect,
} from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    Pressable,
    Dimensions,
    Image,
   } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { HOSTNAME } from "@env";
import verification_icon from './image/verification_icon.png';

import res_def from './image/logo_nbg.png'
import res_false from './image/false.png'
import res_true from './image/true.png'


const Width = Dimensions.get('window').width;    //스크린 너비 초기화

function Verification({navigation}) {
    console.log(HOSTNAME);
    const [ vrf_res, set_vrf_res] = useState("Push the contract");
    const [ res_img, set_res_img] = useState(res_def);
    const [ res_bg_color, set_res_bg_color] = useState("white");

    const postDocument = async(param) => {
      console.log("파일 전송 및 결과 반환")
      const url = HOSTNAME+"/upload_pdf";
      const fileUri = param.uri;
      const formData = new FormData();
      formData.append('file', param);
      const options = {
          method: 'POST',
          body: formData,
          headers: {
            Accept: 'application/pdf',
            'Content-Type': 'multipart/form-data',
          },
      };
      const res = await fetch(url, options).catch((error) => console.log(error));
      const data = await res.json();
      console.log(HOSTNAME);
      console.log(data.hash);
      compare_hash(data.hash);
    };

    const pickDocument = async () => {
      console.log("pdf 파일 불러오기")
      console.log("변경 후")
      let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true })
      .then(response => {
        if (response.type == 'success') {          
          let { name, size, uri } = response;
          let nameParts = name.split('.');
          let fileType = nameParts[nameParts.length - 1];
          var fileToUpload = {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType
          };
          return fileToUpload;
        } 
      })
      .then(res => {
        postDocument(res);
      })
    };

    const compare_hash = (hash_value) => {
      // 임시 hash value 
      const origin_hash_value = 'dc5fa883dad7fe0be63c0d43f5f40ef77385512c';
      if(hash_value === origin_hash_value){
        //alert("일치 -> 정상적인 계약서")
        set_res_img(res_true);
        set_res_bg_color("#32BA7C");
        set_vrf_res("일치: 유효한 계약으로 Blocer에서 계약서의 법적 효력을 보장합니다.");
      }
      else{
        //alert("불일치 -> Blocker에서 지원하지 계약서 또는 변조된 계약서")
        set_res_img(res_false);
        set_res_bg_color("#F15249");
        set_vrf_res("불일치: Blocer에서 지원하지 않는 계약서입니다.");
      }
    }

    const resStyle = function(color) {
      return {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color, 
      }
    }
    
    useEffect(() => {
      console.log("계약서(pdf) 검증");
      set_vrf_res("Push the contract");
      set_res_img(res_def);
      set_res_bg_color("white");
    }, []);

    return(
        <View style={resStyle(res_bg_color)}>
            <View style={styles.container_btn}>
                <Pressable 
                    style={[styles.btn_vrf]}
                    onPress={() => {
                    pickDocument()
                }}>
                    <Image source = {verification_icon} style={styles.user_info_img}/>
                </Pressable>
            </View>
            <View style={styles.container_res}>
                <View style= {styles.view_res}>
                    <Image source = {res_img} style={styles.res_img_style}/>
                    <Text style={styles.res_text}>
                        {vrf_res}
                    </Text>
                </View>
                
            </View>
            
        </View>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_btn :{
    height: "40%"
  },
  container_res: {
    height: "60%",
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  view_res: {
    width: Width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_vrf: {
    width: Width*0.5,
    height: Width*0.5,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  user_info_img: {
    width: Width*0.4,
    height: Width*0.4,
  },
  res_img_style: {
    width: Width*0.6,
    height: Width*0.6,
    margin: 20, 
  },
  res_text: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    margin: 10
  }
});

export default Verification;