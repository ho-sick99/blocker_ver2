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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Axios from 'axios';
import { HOSTNAME } from "@env";
import LoginContext from '../context/LoginContext';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function PostEdit({navigation, route}) {
  const {login_data} = useContext(LoginContext);
  const [post_info, setPost] = useState([]);
  const [post_title, setTitle] = useState(); // 타이틀
  const [post_content, setContent] = useState(); // 컨텐트
  const [contract_id, setContractId] = useState(); // 컨텐트
  const [modalVisible_my_contract, setMyContracttViewModalVisible] = useState(false);
  const [contracts, setContracts] = useState([]); // 계약서 배열
  const loadContracts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "n_signed",});
    setContracts(result);
  };

  const _handleedit_title_Change = text => {
    setTitle(text);
  }

  const _handleedit_content_Change = text => {
    setContent(text);
  }

  const loadPost = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/post_view', { post_id: route.params.post_id })
    setPost(result)
    setTitle(result.post_title)
    setContent(result.post_content)
    setContractId(result.contract_id)
  };

  const editPost = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/post_upd', {
        post_title: post_title, 
        post_content: post_content,
        contract_id: contract_id,
        post_id: post_info.post_id, // 게시글의 post_id는 변하지 않음 
    }); 
    console.log(result);
  };

  useEffect(() => {
    loadPost();
    loadContracts(); 
  }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.container_post}>
        <Pressable onPress={() => {
                setMyContracttViewModalVisible(true);
            }}>
            <Text style={styles.textbox}>계약서 ID : {contract_id}</Text>
        </Pressable>
        
        <Text style={styles.textframe}>게시글 제목</Text>
        <TextInput style={styles.textbox} value={post_title} onChangeText={_handleedit_title_Change}></TextInput>
        <Text style={styles.textframe}></Text>


        <Text style={styles.textframe}>게시글 내용</Text>       
        <TextInput style={styles.textbox} value={post_content} onChangeText={_handleedit_content_Change}></TextInput>
        <Text style={styles.textframe}></Text>

      </View>
      
      <View style={styles.container_button}>
        <TouchableOpacity style={styles.btn_contract_view}
                onPress={() => navigation.pop()}>
            <Text style={styles.textStyle_btn}>CANCLE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn_add_bmark} 
                onPress={() => {
                    editPost(); 
                    navigation.pop()
                }}>
            <Text style={styles.textStyle_btn}>SAVE</Text>
        </TouchableOpacity>
      </View>

        {/* 계약서 모달 뷰  */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_my_contract}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setMyContracttViewModalVisible(!modalVisible_my_contract);
        }}
      >
        <View style={styles.modal_view}>
            <FlatList
                data={contracts}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                <View style={styles.falt_list_item}>
                    <TouchableOpacity
                    style = {styles.falt_list_item_container}
                    onPress={() =>{
                        setMyContracttViewModalVisible(!modalVisible_my_contract);
                        setContractId(item.contract_id); 
                    }}>
                        <Text style={styles.text_style}>{item.contract_id}: {item.title}</Text>
                    </TouchableOpacity>
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
    backgroundColor:'#E7E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_post: {
    backgroundColor:'white',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"94%",
    height: "87%",
    margin: "3%",
    borderRadius:10,
  },
  container_button:{
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
  btn_contract_view: {
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_add_bmark:{
    width: Width* 0.45,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
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
  modal_view: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    marginTop: "50%",
    borderColor: "#2196F3",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  button_modal: {
    width: "28%",
    margin: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  textStyle_4: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
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

export default PostEdit;