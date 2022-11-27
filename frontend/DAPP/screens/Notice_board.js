import React, { useState, useEffect, useContext } from "react";
import { createDrawerNavigator, DrawerActions } from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/Ionicons";import 
{ AntDesign, FontAwesome5, MaterialCommunityIcons  } from '@expo/vector-icons';
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
  Image,
  ScrollView
} from "react-native";
import { HOSTNAME } from "@env";
import { useIsFocused } from '@react-navigation/native';
import LoginContext from '../context/LoginContext';
import { SliderBox } from "react-native-image-slider-box";
import banner1 from './image/banner1.png'; 
import banner2 from './image/banner2.png'; 
import banner3 from './image/banner3.png'; 
import banner4 from './image/banner4.png'; 

const icon_color = "#000000";
const icon_size = 50;

const Width = Dimensions.get("window").width; //스크린 너비 초기화
const Height = Dimensions.get("window").height; //스크린 높이 초기화

function Main({ navigation }) {
  console.log(HOSTNAME);
  console.log(HOSTNAME);
  console.log(HOSTNAME);
  console.log(HOSTNAME);
  console.log(HOSTNAME);
  //검색입력은 useState사용
  const isFocused = useIsFocused() // 리프레쉬
  const [posts, setPosts] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext); //로그인정보
  const loadPosts = async () => {
    const { data: result } = await Axios.get(HOSTNAME + '/post_load');
    setPosts(result);
  };
  useEffect(() => {
    loadPosts();
  }, [isFocused]); // 리프레쉬 인자 전달6 3u

  const [inputText, setInputText] = useState("");
  return (
    <View style={styles.container}>
    <ScrollView>
            {/* 이미지 슬라이더 */}
        <View style={styles.container_image_slider}>
          <SliderBox
            images={[
              banner1,
              banner2,
              banner3,
              banner4,
            ]}
            ImageComponentStyle={{borderRadius: 10, width: '95%', height: "100%" }}
            onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
            paginationBoxStyle={{
              position: "absolute",
              bottom: 0,
              padding: 0,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              paddingVertical: 10
            }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 0,
              padding: 0,
              margin: 0,
              backgroundColor: "rgba(128, 128, 128, 0.92)"
            }}
            dotColor="#2196F3"
            inactiveDotColor="#90A4AE"
            paginationBoxVerticalPadding={20}
            resizeMethod={'resize'}
            resizeMode={'cover'}
            autoplay
            circleLoop
          />
        </View>
        <FlatList
          data={posts}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.view_style} columnWrapperStyle={styles.row}>
              <TouchableOpacity
                style={styles.contract_click_style}
                onPress={() => navigation.push("PostView", { 
                     post_id: item.post_id
                })}
              >
                {/* 아이콘 말고 게시글 제목 + 작성자 + 작성일자 보여줄 것 */}
                <AntDesign name="filetext1" color={icon_color} size={icon_size} />
                <Text style={styles.post_txt}>{item.post_title}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </ScrollView>

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

      <TouchableOpacity
          style={styles.postBtn}
          onPress={() => navigation.push("PostWrite")}
        >
          <Text style={styles.text_style2}>+</Text>
        </TouchableOpacity>
    </View>
  );
}


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
            <FontAwesome5 name="file-signature" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyPage"
        component={MyPage}
        options={{
          drawerIcon: ({ color, size, focused }) => ( 
            <MaterialCommunityIcons name="face-man" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verification"
        component={Verification}
        options={{
          drawerIcon: ({ color, size, focused }) => (
          <MaterialCommunityIcons name="check-network-outline" size={size} color={color} />
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
    position: "absolute",
    display: "flex",
    width: "100%",
    top: "-7.2%",
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
  },
  text_style4: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 9,
  },
  postBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "18%",
    height: "10%",
    top: "80%",
    left: "75%",
    borderRadius: 20,
    backgroundColor: "#2196F3",
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
  container_image_slider:{
    width: "100%",
    height: Width * 0.5,
    marginTop: "11%"
  },
  post_txt: {
    margin:5, 
  }
});
