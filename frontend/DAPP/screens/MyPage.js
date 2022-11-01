import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import LoginContext from '../context/LoginContext';
import user_info_img_d from './image/user_info_img_d.png'; 
import del_img from './image/del_img.png'; 
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  FlatList, 
  Icon,
  Dimensions,
  Alert, 
 } from "react-native";
 import Axios from 'axios';
 import { HOSTNAME } from "@env";
 import Signature from 'react-native-canvas-signature';
 import { block } from 'react-native-reanimated';
 
const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function MyPage({navigation}) {

  const {login_data} = useContext(LoginContext);
  const [user_name, set_user_name] = useState(login_data.name);

  const [user_bmark, set_user_bmark] = useState(0);
  const [user_bmark_lst, set_user_bmark_lst] = useState(0);

  const [user_post, set_user_post] = useState(0);
  const [user_post_lst, set_user_post_lst] = useState(0);

  const [user_save_contracts, set_user_save_contracts] = useState(0);
  const [user_save_contracts_lst, set_user_save_contracts_lst] = useState(0);
  const [user_ing_contracts, set_user_ing_contracts] = useState(0);
  const [user_ing_contracts_lst, set_user_ing_contracts_lst] = useState(0);
  const [user_ed_contracts, set_user_ed_contracts] = useState(0);
  const [user_ed_contracts_lst, set_user_ed_contracts_lst] = useState(0);

  const [modalVisible_sign_view, setSignViewModalVisible] = useState(false);
  const [modalVisible_sign_edit_view, setSignEditViewModalVisible] = useState(false);
  const [sign_img_data, setSignImgData] = useState("");
  const [SignImgBase64, setSignImgBase64] = useState(0);

  const [modalVisible_mypost_view, setMyPostViewModalVisible] = useState(false);
  const [modalVisible_bookmark_view, setBookmarkViewModalVisible] = useState(false);


  const ref = useRef();

  const my_bookmark = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/bookmark', { id: login_data.id})
    set_user_bmark(result.length);
    set_user_bmark_lst(result.data);
    console.log(user_bmark_lst);
    console.log("길아: " + user_bmark);
  }

  const my_post = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/mypost_load', { id: login_data.id});
    set_user_post(result.length);
    set_user_post_lst(result);
  }

  const my_contract = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/my_contract', { id: login_data.id})
    set_user_save_contracts(result.contract_length);
    set_user_save_contracts_lst(result.contract_lst);
    set_user_ing_contracts(result.signing_contract_length);
    set_user_ing_contracts_lst(result.signing_contract_lst);
    set_user_ed_contracts(result.signed_contract_length);
    set_user_ed_contracts_lst(result.signed_contract_lst);
  }

  const my_sign = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/get_sign_info', { id: login_data.id})
    setSignImgBase64(result);
  }

  const edit_my_sign = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/set_sign_info', { id: login_data.id, sign: sign_img_data})
    my_sign();
  }

  const set_user_info = () => {
    my_contract()
    my_post();
    my_bookmark();
  }

  const edit_my_bookmark = async () => {
    let edit_user_bmark_lst = "[";
    for(let i=0; i<user_bmark_lst.length; i++){
      edit_user_bmark_lst += "[" + user_bmark_lst[i][0] + ",\"" +user_bmark_lst[i][1]+ "\"],"
    }
    if(!(edit_user_bmark_lst.length === 1)){
      edit_user_bmark_lst = edit_user_bmark_lst.slice(0, -1);
    }
    edit_user_bmark_lst += ']';
    const { data: res } = await Axios.post(HOSTNAME + '/edit_bookmark', { id: login_data.id, bookmark: {data: edit_user_bmark_lst, length: user_bmark_lst.length} });
    return res;
  }

  const edit_my_post = async () => {
    let edit_user_post_lst = "[";
    for(let i=0; i<user_post_lst.length; i++){
      edit_user_post_lst += "[" + user_post_lst[i][0] + ",\"" +user_post_lst[i][1]+ "\"],"
    }
    edit_user_post_lst = edit_user_post_lst.slice(0, -1);
    edit_user_post_lst += ']';
    const { data: res } = await Axios.post(HOSTNAME + '/edit_my_post', { id: login_data.id, mypost: {data: edit_user_post_lst, length: user_post_lst.length} });
    return res;
  }

  const del_my_post = async (input_post_id) => {
    const { data: result } = await Axios.post(HOSTNAME + '/post_del', { post_id: input_post_id});
    my_post();
  }

  useEffect(() => {
    console.log("마이 페이지 데이터 불러오기");
    set_user_info();
  }, []);
  
  return (
    <View style={styles.mypage_container}>
      {/* <Text>{login_data.name}, {login_data.id}, {login_data.login_state}</Text> */}
      {/* 이렇게 사용할 수 있음! */}

      {/* 상단 유저 간략 정보  */}
      <View style={styles.user_info}> 
        <Image source = {user_info_img_d} style={styles.user_info_img}/>
        <View style={styles.user_info_text}>
          <Text style={styles.use_user_info_text_name}> 
            {user_name}님의 계정
          </Text>
          <Text style={styles.use_user_info_text_info}> 
            현재 체결된 계약 {user_ed_contracts}
          </Text>
        </View>
          <Pressable 
          style={styles.btn_log_out}
          onPress={() => 
            navigation.navigate("Login")
          }
        >
          <Text style={styles.textStyle}>
            Logout
            </Text>
        </Pressable>
      </View>

      {/* 하단 상세 유저 정보 리스트*/}
      <View style={styles.setting_list}>

        {/* 계약서 */}
          <View style={styles.setting_item}>
            <Text style={styles.textStyle_2}>Contract</Text>
            <View style={styles.contracts_bar}>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>미체결</Text>
                <Text style={styles.textStyle_3}>{user_save_contracts}</Text>
              </View>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>진행중</Text>
                <Text style={styles.textStyle_3}>{user_ing_contracts}</Text>
              </View>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>체결</Text>
                <Text style={styles.textStyle_3}>{user_ed_contracts}</Text>
              </View>
            </View>
          </View>

        {/* 게시글 */}
          <View style={styles.setting_item}>
            <Text style={styles.textStyle_2}>Post </Text>
            <View style={styles.contracts_bar}>
              <View style={styles.contracts_bar_item}> 
                <Pressable onPress={() => {
                  setMyPostViewModalVisible(true);
                  }}>
                  <Text style={styles.textStyle_3}>작성 게시글</Text>
                  <Text style={styles.textStyle_3}>{user_post}</Text>
                </Pressable>
              </View>
              
              <View style={styles.contracts_bar_item}> 
                  <Pressable onPress={() => {
                    my_bookmark();
                    setBookmarkViewModalVisible(true);
                  }}>
                  <Text style={styles.textStyle_3}>즐겨찾기</Text>
                  <Text style={styles.textStyle_3}>{user_bmark}</Text>
                  </Pressable>
              </View>
            </View>
          </View>
          {/* 서명 */}
          <View style={styles.setting_item}>
            <Text style={styles.textStyle_2}>Sign </Text>
            <View style={styles.contracts_bar}>
              <View style={styles.contracts_bar_item}> 
                <TouchableOpacity style={[styles.btn_sign, styles.textStyle_3]} onPress={() => {
                  my_sign();
                  setSignViewModalVisible(true)
                  }}>
                  <Text style={styles.textStyle_3} >서명 보기</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.contracts_bar_item}> 
                <TouchableOpacity style={[styles.btn_sign, styles.textStyle_3]} onPress={() => setSignEditViewModalVisible(true)}>
                  <Text style={styles.textStyle_3} >서명 수정</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

      </View>

      {/* 서명 확인 모달  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_sign_view}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSignViewModalVisible(!modalVisible_sign_view);
        }}
      >
        <View style={styles.sign_view_container}>
          <Image source = {{uri: SignImgBase64}} style={styles.user_sign_img}/>          
          <Pressable
            style={[styles.button_modal]}
            onPress={() => setSignViewModalVisible(!modalVisible_sign_view)}
            >
            <Text style={styles.textStyle_4}>Close</Text>
          </Pressable>
        </View>
      </Modal> 

      {/* 서명 편집 모달  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_sign_edit_view}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setSignEditViewModalVisible(!modalVisible_sign_edit_view);
        }}
      >
        <View style={styles.sign_view_container}>   
          <View style={[styles.sign_edit_view_container]}>
            <Signature
              containerStyle = {[styles.sign_canvas_container]}
              ref={ref}
              lineWidth={3}
              lineColor="blue"
              canvasStyle={{ 
                borderWidth: 1, 
                borderColor: 'grey',
                width: "100%",
                height: "100%",
                borderRadius: 10, 
              }}
              onBegin={() => console.log('begin')}
              onEnd={() => console.log('end')}
              onChange={(signature) =>{
                console.log(signature)
                setSignImgData(signature)
              }}
            />
          </View>   
          <View style={[styles.sign_edit_btn_view]}>
            <Pressable
              style={[styles.button_modal]}
              onPress={() => {
                // alert(sign_img_data)
                setSignEditViewModalVisible(!modalVisible_sign_edit_view)
                setSignImgBase64(sign_img_data)
                edit_my_sign()
              }}
              >
              <Text style={styles.textStyle_4}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.button_modal]}
              onPress={() => ref.current?.clearSignature?.()}
              >
              <Text style={styles.textStyle_4}>Clear</Text>
            </Pressable>
            
            <Pressable
              style={[styles.button_modal]}
              onPress={() => setSignEditViewModalVisible(!modalVisible_sign_edit_view)}
              >
              <Text style={styles.textStyle_4}>Close</Text>
            </Pressable>
          </View>
          
        </View>
      </Modal> 

      {/* 작성글 모달 뷰  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_mypost_view}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setMyPostViewModalVisible(!modalVisible_mypost_view);
        }}
      >
        <View style={styles.post_view_container}>
        <FlatList
            data={user_post_lst}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.falt_list_item}>
                <TouchableOpacity
                style = {styles.falt_list_item_container}>
                  <Text>{item.post_title}</Text>
                  <Pressable style={styles.del_btn_container} onPress={ async() => {{
                          Alert.alert(
                            "작성 게시글",
                            "보기, 편집 및 삭제",
                            [
                              { text: "보기", onPress: () =>{
                                setMyPostViewModalVisible(!modalVisible_mypost_view)
                                navigation.push("PostView", {
                                  post_id: item.post_id
                                })

                              }},
                              { text: "편집", onPress: () =>{
                                setMyPostViewModalVisible(!modalVisible_mypost_view)
                                navigation.push("PostEdit", {
                                  post_id: item.post_id
                                })
                              }},
                              { text: "삭제", onPress: async () => {
                                del_my_post(item.post_id);
                              }},
                            ],
                            { cancelable: false }
                          );

                    }
                  }}>
                  </Pressable>
                </TouchableOpacity>
              </View>
            )}

          ></FlatList>
          <Pressable
            style={[styles.button_modal]}
            onPress={() => setMyPostViewModalVisible(!modalVisible_mypost_view)}
            >
            <Text style={styles.textStyle_4}>Close</Text>
          </Pressable>
        </View>
      </Modal> 

      {/* 관심목록 모달 뷰  */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible_bookmark_view}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setBookmarkViewModalVisible(!modalVisible_bookmark_view);
        }}
      >
        <View style={styles.post_view_container}>
        <FlatList
            data={user_bmark_lst}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.falt_list_item}>
                <TouchableOpacity
                style = {styles.falt_list_item_container}
                onPress={() =>{
                  setBookmarkViewModalVisible(!modalVisible_bookmark_view)
                  navigation.push("PostView", {
                    id: item
                  })
                }}>
                  <Text>{item[0]}</Text>
                  <Text>{item[1]}</Text>
                  <Pressable style={styles.del_btn_container} onPress={ async() => {{
                    Alert.alert(
                      "관심 목록",
                      "보기, 삭제",
                      [
                        { text: "보기", onPress: () =>{
                          setBookmarkViewModalVisible(!modalVisible_bookmark_view)
                          navigation.push("PostView", {
                            post_id: item[0]
                          })

                        }},
                        { text: "삭제", onPress: async () => {
                          for(let i =0; i< user_bmark_lst.length; i++){
                            if(user_bmark_lst[i][0] === item[0]){
                              user_bmark_lst.splice(i,1);
                              console.log(user_bmark);
                              break;
                            }
                          }
                          const edit_my_bmark_Res = await edit_my_bookmark()
                          if(edit_my_bmark_Res.success){
                            alert("삭제 성공");
                            set_user_info();
                          }
                          else{
                            alert("삭제 실패");
                          }
                        }},
                      ],
                      { cancelable: false }
                    );
                    }
                  }}>
                  </Pressable>
                </TouchableOpacity>
              </View>
            )}

          ></FlatList>
          <Pressable
            style={[styles.button_modal]}
            onPress={() => setBookmarkViewModalVisible(!modalVisible_bookmark_view)}
            >
            <Text style={styles.textStyle_4}>Close</Text>
          </Pressable>
        </View>
      </Modal>             

    </View>
  );
}

const styles = StyleSheet.create({

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textStyle_2: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    margin: 10,
  },
  textStyle_3: {
    fontSize: 15,
    color: "grey",
    fontWeight: "bold",
    textAlign: "center",
    padding: 7,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textStyle_4: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  mypage_container:{
    flex: 1,
    alignItems: 'center',
  },
  user_info: {
    backgroundColor: '#D9D9D9',
    marginTop: 10,
    width: "90%",
    height: "20%",
    borderRadius: 10, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection:'row',
    alignItems: 'center',
  },
  user_info_text: {
    margin: '5%',
    flexDirection:'column',
  },
  use_user_info_text_name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  use_user_info_text_info: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  user_info_img: {
    width: 75,
    height: 75,
    borderRadius: 100, 
    borderColor: "#939393",
    borderWidth: 3,
    marginLeft: 10,
  },
  btn_log_out:{
    position: 'absolute',
    top: 5,
    right: 5,
    width: "20%",
    height: "20%",
    backgroundColor: '#939393',
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
  },

  setting_list:{
    backgroundColor: '#D9D9D9',
    width: "100%",
    height: "85%",
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    
  },
  contracts_bar:{
    flexDirection:'row',
    margin: 10,
    borderRadius: 10, 
    backgroundColor: 'white',
    height: '60%',
    justifyContent: 'space-between',
  },
  contracts_bar_item:{

  },
  setting_item:{
    padding: 10,
    height: "30%",
  },
  btn_sign:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  
  modalView: {
    margin: 20,
    width: "95%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 0
  },

  modal_btn_view: {
    width: "100%",
    flexDirection: 'row', // 혹은 'column'
    justifyContent: 'space-between',
  },
  sign_view_container: {
    width: "100%",
    height: "35%",
    alignItems: "center",
    marginTop: "50%",
    borderColor: "#2196F3",
    borderWidth: 3,
    backgroundColor: "white",
    borderRadius: 10,
  },
  post_view_container: {
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
  user_sign_img : {
    width: "95%",
    height: "60%",
    borderRadius: 10, 
    borderColor: "#939393",
    borderWidth: 1,
    margin: 10,
    backgroundColor: "white",
  },
  sign_edit_view_container: {
    width: "95%",
    height: "60%",
    margin: 10,
    alignItems: "center",
    borderColor: "#939393",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  sign_edit_btn_view: {
    width: "100%",
    flexDirection: 'row', // 혹은 'column'
    justifyContent: 'space-between',
  },
  sign_canvas_container: {
    width: "100%",
    height: "100%"
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
  del_btn_container: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    justifyContent: 'center',
  }, 
  del_img_style: {
    width: Height*0.05,
    height: Height*0.05,
    position: 'absolute',
    right: 10, 
  }
});

export default MyPage;