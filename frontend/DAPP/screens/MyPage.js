import React, {
  useContext,
  useEffect,
} from 'react';
import LoginContext from '../context/LoginContext';
import user_info_img_d from './image/user_info_img_d.png'
import { 
  StyleSheet, 
  View,
  Text,
  Image,
  Pressable,
 } from "react-native";
function MyPage({navigation}) {

  const {login_data} = useContext(LoginContext);
  
  const user_info = {
    user_name: 'name',
    user_save_contracts: 0,
    user_ing_contracts: 0,
    user_ed_contracts: 0,
    user_post: 0,
    user_bmark: 0
  }

  const set_user_info = () => {
    // 아이디 중복 확인
    const my_bookmark = async (id_input) => {
    const { data: result } = await Axios.post(local_host + '/bookmark', { id: id_input})
    console.log(result);
    return result;
  }
    console.log(my_bookmark);
  
    user_info.user_name = login_data.name;
    user_info.user_save_contracts = 1;
    user_info.user_ing_contracts = 1;
    user_info.user_ed_contracts = 1;
    user_info.user_post = 1;
    user_info.user_bmark = 1;
  }

  set_user_info();

  return (
    <View style={styles.mypage_container}>
      {/* <Text>{login_data.name}, {login_data.id}, {login_data.login_state}</Text> */}
      {/* 이렇게 사용할 수 있음! */}

      {/* 상단 유저 간략 정보  */}
      <View style={styles.user_info}> 
        <Image source = {user_info_img_d} style={styles.user_info_img}/>
        <View style={styles.user_info_text}>
          <Text style={styles.use_user_info_text_name}> 
            {user_info.name}님의 계정
          </Text>
          <Text style={styles.use_user_info_text_info}> 
            현재 체결된 계약 {user_info.user_ed_contracts}
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
            <Text style={styles.textStyle_2}>계약서</Text>
            <View style={styles.contracts_bar}>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>미체결</Text>
                <Text style={styles.textStyle_3}>{user_info.user_save_contracts}</Text>
              </View>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>진행중</Text>
                <Text style={styles.textStyle_3}>{user_info.user_ing_contracts}</Text>
              </View>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>체결</Text>
                <Text style={styles.textStyle_3}>{user_info.user_ed_contracts}</Text>
              </View>
            </View>
          </View>

        {/* 게시글 */}
          <View style={styles.setting_item}>
            <Text style={styles.textStyle_2}>게시글</Text>
            <View style={styles.contracts_bar}>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>작성 게시글</Text>
                <Text style={styles.textStyle_3}>{user_info.user_post}</Text>
              </View>
              <View style={styles.contracts_bar_item}> 
                <Text style={styles.textStyle_3}>즐겨찾기</Text>
                <Text style={styles.textStyle_3}>{user_info.user_bmark}</Text>
              </View>
            </View>
          </View>




      </View>
    
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
    flexDirection:'col',
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
    height: '33%',
    justifyContent: 'space-between',
  },
  contracts_bar_item:{

  },
  setting_item:{
    padding: 10,
  }
});

export default MyPage;