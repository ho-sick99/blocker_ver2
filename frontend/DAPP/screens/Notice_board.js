import React, { useState, useEffect,useContext } from "react";
import { createDrawerNavigator, DrawerActions } from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/Ionicons";
import Three_Contracts from "./Three_Contracts";
import MyPage from "./MyPage";
import Verification from "./Verification";
import Axios from 'axios';
import {
  StyleSheet,
  View,
  Button,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { HOSTNAME } from "@env";
import { useIsFocused } from '@react-navigation/native';
import LoginContext from '../context/LoginContext';
import { LinearGradient } from 'expo-linear-gradient'


const DATA = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
];
const icon_color = "#000000";
const icon_size = 50;

const Width = Dimensions.get("window").width; //스크린 너비 초기화
const Height = Dimensions.get("window").height; //스크린 높이 초기화

function Main({ navigation }) {
  //검색입력은 useState사용
  const isFocused = useIsFocused() // 리프레쉬
  const [posts, setPosts] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext); //로그인정보
  const loadPosts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "n_signed",});
    setPosts(result);
    console.log("@@@@@@@@@@@@@@@@@@@");
    console.log(posts);
    console.log("@@@@@@@@@@@@@@@@@@@");
  };
  useEffect(() => {
    loadPosts();
  }, [isFocused]); // 리프레쉬 인자 전달6 3u

  const [inputText, setInputText] = useState("");
  // console.log("ㅆㅆㅅ123"); 
  // console.log(contracts);
  // console.log("$$$$")
  return (
    <View style={styles.container}>
      {/*검색창*/}
      <View style={styles.searchcontainer}>
        {/*import component*/}
        <TextInput
          style={styles.textInput}
          placeholder="게시글 검색_"
          value={inputText}
          onChangeText={setInputText}
        />
        {/*List of Component */}
        <TouchableOpacity style={styles.searchBtn} onPress>
          <Text style={styles.text_style4}>검색</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.h_text_style}>notice board search section</Text> */}
      <View>
        <FlatList
          data={posts} //contracts가 배열이 아니라서 안된다함. 배열 안뜰거면 한개만 하라는데 
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // item????????????????????
          //??????????
          renderItem={({ item }) => (
            <View style={styles.view_style} columnWrapperStyle={styles.row}>
              <TouchableOpacity
                style={styles.contract_click_style}
                onPress={() => navigation.push("PostView", { 
                     title: item.title,
                      content: item.content,
                      id: item.id,
                      contract_id: item.contract_id, 
                })}
              >
                {/* 아이콘 말고 게시글 제목 + 작성자 + 작성일자 보여줄 것 */}
                <Icon name="rocket" color={icon_color} size={icon_size} />
                <Text style={styles.text_style}>A{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
        
        <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigation.push("PostWrite")}
        >
          <Text style={styles.text_style2}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

///////게시글 ////
// function PostList({ navigation }) {
//   //const[postMessage, setPosts]; // 게시판 배열 (왜 필요한가?)
//   const loadPosts = async () => {
//     try {
//       setPosts(
//         // 현재 유저정보 기반으로 계약서 검색(POST)으로 수정해야함 !!!@!@
//         await (
//           await fetch(HOSTNAME + "/contract_load", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               id: "yohan123", //현재 yohan123 아이디로만 설정돼있음. 다른 아이디로 로그인하면 어쩔건지???
//               //post_type : "n_signed"  //왜 필요??
//             }),
//           })
//         ).json()
//       ); // 로드한 게시글들 정보 반영
//     } catch (err) {
//       console.error(err);
//     }
//     console.log(contracts);
//   };
//   useEffect(() => {
//     loadContracts();
//   }, []);

//   //게시판 검색기능부분..검색입력은 useState사용해서 뭔가 해야됨
//   const [inputText, setInputText] = useState("");
//   return (
//     <View style={styles.container}>
//       <View>
//         <FlatList
//           data={contracts}
//           showsVerticalScrollIndicator={false}
//           renderItem={({ item }) => (
//             <View style={styles.view_style}>
//               <TouchableOpacity
//                 style={styles.contract_click_style}
//                 onPress={() =>
//                   navigation.push("PostView", {
//                     title: item.title,
//                     content: item.content,
//                     id: item.id,
//                     contract_id: item.contract_id,
//                   })
//                 }
//               >
//                 <Icon name="rocket" color={icon_color} size={icon_size} />
//                 <Text style={styles.text_style}>{item.title}</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         ></FlatList>
//         <TouchableOpacity
//           style={styles.postBtn1}
//           onPress={() => navigation.push("Contract_Create")}
//         >
//           <Text style={styles.plus_1}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

console.log("hi");

///////좌상단 햄버거버튼 + 상단 바
const Drawer = createDrawerNavigator();
const Notice_board = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerStyle: {
          height: 110,
          backgroundColor: "black",
          shadowOpacity: 0,
        },
        headerTitleStyle: { color: "white", fontSize: 25 },
        drawerPosition: "left",
        headerTintColor: "white",
        drawerActiveBackgroundColor: "#0DF9FF",
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "black",
        drawerStyle: { backgroundColor: "black", width: 200 },
      }}
    >
      <Drawer.Screen
        name="Notice Board"
        component={Main}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name={"home"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contracts"
        component={Three_Contracts}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name={"rocket"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyPage"
        component={MyPage}
        options={{
          drawerIcon: ({ color, size, focused }) => ( //focused 어디있노
            <Icon name={"pause"} size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verification"
        component={Verification}
        options={{
          drawerIcon: ({ color, size, focused }) => (
            <Icon name={"pause"} size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default Notice_board;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  searchcontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  h_text_style: {
    backgroundColor: "#000000",
    width: 390,
    height: 30,
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    color: "#ffffff",
  },
  view_style: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    width: Width * 0.45,
    height: Width * 0.45,
    marginVertical: 9,
    color: "#ffffff",
    justifyContent: "center",
    borderColor: "#ffffff",
    borderWidth: 10,
    margin: 9,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  contract_click_style: {
    padding: 4,
    alignItems: "center",
    flexDirection: "column",
    flex: 1,
    marginTop: 30,
  },
  text_style: {
    width: 370,
    height: 80,
    fontSize: 20,
    marginTop: 25,
    color: "black",
    fontWeight: "bold",
    marginLeft: 355,
  },
  text_style2: {
    color: "#000000",
    fontSize: 45,
    paddingBottom: 4,
    //fontWeight:"bold",
  },
  // text_style3: {
  //   width: 370,
  //   height: 80,
  //   fontSize: 20,
  //   marginLeft: 70,
  //   marginTop: 55,
  //   color: "#ffffff",
  //   fontWeight: "bold",
  // },
  text_style4: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 9,
  },
  postBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "20%",
    height: "10%",
    top: "73%",
    left: "70%",
    borderRadius: 50,
    borderColor: "black",
    borderStyle: "solid",
    borderColor: "#9DC9AC",
    borderWidth: 5,
    backgroundColor: "#0DF9AF",
  },
  textInput: {
    fontSize: 20,
    textAlign: "right",
    paddingRight: 20,
    marginRight: 2,
    width: "80%",
    height: 40,
    top: 3,
    marginBottom: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#ffffff",
    marginTop: 40,
    flexGrow: 1,
  },
  searchBtn: {
    width: "18%",
    height: 40,
    top: 3,
    marginBottom: 6,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "gray",
    marginTop: 40,
  },
});
