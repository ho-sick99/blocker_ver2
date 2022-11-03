import React, {
  useState,
  useEffect,
} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput,
  Dimensions, 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HOSTNAME } from "@env";
import Axios from 'axios';
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Contract_Eidt({ navigation, route }) {
  console.log(HOSTNAME);
  const [title, setTitle] = useState(route.params.title); // 타이틀
  const [content, setcontent] = useState(route.params.content); // 컨텐트
  
  const _handleedit_title_Change = text => {
    setTitle(text);
  }

  const _handleedit_content_Change = text => {
    setcontent(text);
  }

  const editContracts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_upd', {
      title: title, 
      content: content,
      contract_id: route.params.contract_id,
    })
    console.log(result);
  };


  return (
    <View style={styles.container}>
      <View style={styles.container_contract}>
        
        <View style={styles.textbox_fix}>
          <Text style={styles.textframe}>아아디: {route.params.id}</Text>      
          <Text style={styles.textframe}>계약서 ID: {route.params.contract_id}</Text>
        </View>

        <Text style={styles.textframe}>타이틀</Text>
        <TextInput style={styles.textbox} value={title} onChangeText={_handleedit_title_Change}></TextInput>
        <Text style={styles.textframe}></Text>


        <Text style={styles.textframe}>계약 내용</Text>       
        <TextInput style={styles.textbox} value={content} onChangeText={_handleedit_content_Change}></TextInput>
        <Text style={styles.textframe}></Text>

      </View>
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.button_of_back} onPress={async () => {
                    navigation.replace("N_Signed", {
                      contract_id: route.params.contract_id,
                      })
        }}>
          <Text style={styles.edit}>CANCLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_of_save} onPress={() => {
          editContracts().then(
            navigation.replace("N_Signed", {
              title: title,
              id: route.params.id,
              content: content,
              contract_id: route.params.contract_id,
              })
          )
          }}>
          <Text style={styles.edit}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E6E6", 
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_button: {
    flexDirection: 'row',
    width: "100%",
    height: "10%",
    justifyContent: 'space-between',
  },
  container_contract: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: "5%",
    padding: "10%",
    width: "94%",
    height: "87%",
    margin: "3%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
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
  textbox: {
    fontsize: 23,
    fontWeight: 'bold',
    borderColor: "#FFAF00",
    backgroundColor: "#E7E6E6",
    borderRadius: 5, 
    padding: 5, 
    width: Width* 0.84,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_of_back: {
    backgroundColor: "#04B45F",
    width: Width* 0.45,
    height: Height* 0.07,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10, 
  },
  del: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  button_of_save: {
    backgroundColor: "#04B45F",
    width: Width* 0.45,
    height: Height* 0.07,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  edit: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Contract_Eidt;