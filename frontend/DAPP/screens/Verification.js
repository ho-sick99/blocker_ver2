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
   } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import { HOSTNAME } from "@env";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화

function Verification({navigation}) {
    const [ vrf_res, set_vrf_res] = useState("Push the contract");

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
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
      };
      const res = await fetch(url, options).catch((error) => console.log(error));
      const data = await res.json();
      console.log(data.hash);
      set_vrf_res(data.hash);
    };

    const pickDocument = async () => {
      console.log("pdf 파일 불러오기")
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

    useEffect(() => {
      console.log("계약서(pdf) 검증");
      set_vrf_res("Push the contract");

    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.container_btn}>
                <Pressable 
                    style={[styles.btn_vrf]}
                    onPress={() => {
                    pickDocument()
                }}>
                    <Text>
                        Verification
                    </Text>
                </Pressable>
            </View>
            <View style={styles.container_res}>
                <View style= {styles.view_res}>
                    <Text>
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
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_btn :{
    height: "50%"
  },
  container_res: {
    height: "50%",
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginTop: 50,
  },
});

export default Verification;