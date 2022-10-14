import React, {
  useState,
  useEffect,
} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HOSTNAME } from "@env";


function Contract_Eidt({ navigation, route }) {
  const [data, setData] = useState({});
  const [title, setTitle] = useState(route.params.title); // 타이틀
  const [content, setcontent] = useState(route.params.content); // 컨텐트
  const [contract_id, setcontract_id] = useState(route.params.contract_id); // 컨텐트
  
  const _handleedit_title_Change = text => {
    setTitle(text);
  }

  const _handleedit_content_Change = text => {
    setcontent(text);
  }
  const _handleedit_contract_id_Change = text => {
    setcontract_id(text);
  }

  const editContracts = async () => {
    setData({
      title: title, //
      content: content,//
      contract_id: "1",
    })
    console.log(setData);
    // 계약서 데이터 로드함수
    try {
      const res = await (
        await fetch(HOSTNAME + "/contract_upd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
      ).json()
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.container3}>
        <Text style={styles.textframe}>★타이틀★</Text>
        <TextInput style={styles.textbox} value={title} onChangeText={_handleedit_title_Change}></TextInput>
        <Text style={styles.textframe}></Text>

        <Text style={styles.textframe}>★아아디★</Text>       
        <TextInput style={styles.textbox}>{route.params.id}</TextInput>
        <Text style={styles.textframe}></Text>

        <Text style={styles.textframe}>★콘텐츠★</Text>       
        <TextInput style={styles.textbox} value={content} onChangeText={_handleedit_content_Change}></TextInput>
        <Text style={styles.textframe}></Text>

        <Text style={styles.textframe}>★계약서 ID★</Text>
        <Text style={styles.textbox} value={contract_id} onChangeText={_handleedit_contract_id_Change}>{route.params.contract_id}</Text>
        <Text style={styles.textframe}></Text>

      </View>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.space}></TouchableOpacity>
        <TouchableOpacity style={styles.button_of_edit} onPress={async () => {
                    navigation.replace("N_Signed", {
                      title: title,
                      id: route.params.id,
                      content: content,
                      contract_id: route.params.contract_id,
                      })
        }}>
          <Text style={styles.edit}>COMPLETION</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button_of_edit} onPress={() => editContracts()}>
          <Text style={styles.edit}>저장-두번클릭</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.space}></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "100%",
    height: "20%",
    backgroundColor: "#000000"
  },
  container3: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: "5%",
    padding: "10%",
    width: "100%",
    height: "80%",
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
  textbox: {
    margin: "5%",
    fontsize: 23,
    fontWeight: 'bold',
    borderColor: "#FFAF00",
  },
  button_of_del: {
    backgroundColor: "#FFFFFF",
    width: 130,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  del: {
    fontSize: 23,
    color: 'black',
    fontWeight: 'bold',
  },
  space: {
    width: 50,
    height: 50,
  },
  button_of_edit: {
    backgroundColor: "#04B45F",
    width: 130,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Contract_Eidt;