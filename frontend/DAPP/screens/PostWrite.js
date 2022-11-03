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
    Modal,
    FlatList, 
  } from 'react-native';
  import { HOSTNAME } from "@env";
import LoginContext from '../context/LoginContext';
import Axios from 'axios';
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function PostWrite({navigation, route}){
  console.log(HOSTNAME);
    const {login_data} = useContext(LoginContext);
    const [post_title, setTitle] = useState(); // 타이틀
    const [post_content, setContent] = useState(); // 컨텐트
    const [contract_id, setContractId] = useState(); // 계약서
    const [contract_title, setContractTitle] = useState("계약서 불러오기..."); // 계약서 타이틀
    const [modalVisible_my_contract, setMyContracttViewModalVisible] = useState(false);
    const [contracts, setContracts] = useState([]); // 계약서 배열
    const [user_post, set_user_post] = useState(0);
    const [user_post_lst, set_user_post_lst] = useState(0);
  
    const _handleedit_title_Change = text => {
      setTitle(text);
    }
  
    const _handleedit_content_Change = text => {
      setContent(text);
    }
  
    const loadContracts = async () => {
        console.log("계약서 목록 불러오기"); 
        const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "n_signed",});
        setContracts(result);
      };
      
      
    const my_post = async () => {
        const { data: result } = await Axios.post(HOSTNAME + '/my_post', { id: login_data.id})
        set_user_post(result.length);
        set_user_post_lst(result.data);
    }

    const edit_my_post = async () => {
        let edit_user_post_lst = "[";
        for(let i=0; i<user_post_lst.length; i++){
        edit_user_post_lst += "[" + user_post_lst[i][0] + ",\"" +user_post_lst[i][1]+ "\"],"
        }
        edit_user_post_lst += "[]"
        edit_user_post_lst += ']';
        const { data: res } = await Axios.post(HOSTNAME + '/edit_my_post', { id: login_data.id, mypost: {data: edit_user_post_lst, length: user_post_lst.length} });
        return res;
    }
    
    const addPost = async () => {
      const { data: result } = await Axios.post(HOSTNAME + '/post_add', {
        post_title: post_title, 
        post_content: post_content,
        id: login_data.id, 
        contract_id: contract_id
      }); 

      if(result.success){

        alert("게시글 등록 성공"); 
      }


    };
  
    useEffect(() => {
        loadContracts();
      }, []);
  
    return ( // 'route.params.파라미터'로 접근 가능. ex) route.params.title //title, content, id, contract_id
        <View style={styles.container}>
            <View style={styles.container_post}>
                <View style={styles.container_title}>
                    <Text>게시글 제목: </Text>
                    <TextInput style={styles.textbox} value={post_title} onChangeText={_handleedit_title_Change}></TextInput>
                </View>
                <View style={styles.container_btn_cnt}>
                    <Pressable style={styles.btn_load_contract} onPress={() => {
                        setMyContracttViewModalVisible(true); 
                    }}>
                        <Text>미체결 계약서 목록</Text>
                    </Pressable>
                    <View style={styles.view_contract_title}>
                        <Text>{contract_title} </Text>
                    </View>
                </View>
                <View style={styles.container_content}>
                    <Text>게시글 내용 </Text>
                    <TextInput style={styles.textbox} value={post_content} onChangeText={_handleedit_content_Change}></TextInput>

                </View>
            </View>

            <View style={styles.container_button}>
                <Pressable style={styles.btn_create} onPress={() => {
                    addPost(); 
                    navigation.pop(); 
                    }}>
                    <Text style={styles.text_btn}>CREATE</Text>
                </Pressable>
            </View>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible_my_contract}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setMyContracttViewModalVisible(!modalVisible_my_contract);
            }}
        >
            <View style={styles.contract_modal_container}>
            <FlatList
                data={contracts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                <View style={styles.falt_list_item}>
                    <Pressable
                        style = {styles.falt_list_item_container}
                        onPress={() => {
                            setContractTitle(item.title);
                            setContractId(item.contract_id); 
                            setMyContracttViewModalVisible(!modalVisible_my_contract);
                        }}>
                    <Text>{item.title}</Text>
                    </Pressable>
                </View>
                )}

            ></FlatList>
            <Pressable
                style={[styles.button_modal]}
                onPress={() => setMyContracttViewModalVisible(!modalVisible_my_contract)}
                >
                <Text style={styles.textStyle_4}>Close</Text>
            </Pressable>
            </View>
        </Modal> 
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
    container_post:{
      flex: 1,
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
    btn_load_contract: {
      backgroundColor:"#04B45F",
      width: Width* 0.35,
      height: Height* 0.05,
      borderRadius:5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn_create: {
      backgroundColor:"#04B45F",
      width: Width* 0.94,
      height: Height* 0.07,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contarer_title: {
        flexDirection:'row',
        
    }, 
    container_btn_cnt: {
      flexDirection:'row',
      backgroundColor: "#E7E6E6",
      width: Width* 0.84,
    }, 
    container_content: {

    },
    text_btn: {
        fontSize:20,
        color: 'black',
        fontWeight: 'bold',
    },
    view_contract_title: {
        //backgroundColor:"#04B45F",
        width: Width* 0.5,
        height: Height* 0.05,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
  contract_modal_container: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    marginTop: "50%",
    borderColor: "#2196F3",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  falt_list_item: {
    width: Width* 0.9,
    height: Height*0.1,
    backgroundColor: "#939393",
    borderRadius: 10, 
    margin: 10, 
    fontWeight: "bold",
    textAlign: "center",
    padding: 5
  },
  falt_list_item_container: {
    width: "100%",
    height: "100%",
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
  
export default PostWrite;