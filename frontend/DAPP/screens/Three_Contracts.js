import React, { 
  useState, 
  useEffect,
  useContext,
 } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import Icon from "@expo/vector-icons/Ionicons";
import { HOSTNAME } from "@env";
import { useIsFocused } from '@react-navigation/native';
import Axios from 'axios';
import LoginContext from '../context/LoginContext';
import { LinearGradient } from 'expo-linear-gradient'

const Tab = createBottomTabNavigator();

const Width = Dimensions.get("window").width; //스크린 너비 초기화
const Height = Dimensions.get("window").height; //스크린 높이 초기화

const icon_color = "#000000";
const icon_color2 = "#000000";
const icon_color3 = "#ffffff";
const icon_size = 50;
const main_color = "#0DF9FF";

function Three_Contracts() {
  // React.useEffect(
  //   () => navigation.addListener('focus', () => alert('Screen was focused')),
  //   []
  // );
  return (
    <Tab.Navigator
      initialRouteName="N_Signed"
      screenOptions={{
        tabBarActiveTintColor: "#0DF9FF",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="N_Signed"
        component={N_Signed}
        options={{
          title: "미체결",
          tabBarIcon: ({ color, size }) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#025CFC",
        }}
      />
      <Tab.Screen
        name="Proceeding"
        component={Proceeding}
        options={{
          title: "진행중",
          tabBarIcon: ({ color, size }) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: "white",
        }}
      />
      <Tab.Screen
        name="Signed"
        component={Signed}
        options={{
          title: "체결",

          tabBarIcon: ({ color, size }) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#FD8016",
        }}
      />
    </Tab.Navigator>
  );
}

/////////미체결////////////
function N_Signed({ navigation }) {
  const isFocused = useIsFocused() // 리프레쉬
  const [contracts, setContracts] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext);

  const loadContracts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "n_signed",});
    setContracts(result);
  };

  useEffect(() => {
    loadContracts();
  }, [isFocused]); // 리프레쉬 인자 전달6 3u

  //검색입력은 useState사용
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      {/*검색창*/}
      <View style={styles.searchcontainer}>
        {/*import component*/}
        <TextInput
          style={styles.textInput}
          placeholder="미체결 계약서 검색_"
          value={inputText}
          onChangeText={setInputText}
        />
        {/*List of Component */}
        <TouchableOpacity style={styles.searchBtn} onPress>
          <Text style={styles.text_style4}>검색</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.h_text_style}>미체결계약서</Text> */}
      {/* Notice_board->dDrawer.Screen name="Contracts" 상단바 이름 바꾸고싶음*/}

      <View>
        <FlatList
          data={contracts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.view_style}>
              <TouchableOpacity
                style={styles.contract_click_style}
                onPress={() =>
                  navigation.push("N_Signed", {
                    title: item.title,
                    content: item.content,
                    id: item.id,
                    contract_id: item.contract_id,
                  })
                }
              >
                <Icon name="rocket" color={icon_color} size={icon_size} />
                <Text style={styles.text_style}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
        <TouchableOpacity
          style={styles.postBtn1}
          onPress={() => navigation.push("Contract_Create")}
        >
          <Text style={styles.plus_1}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/////////진행중////////////
function Proceeding({ navigation }) {
  const [contracts, setContracts] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext);

  const loadContracts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "signing",});
    setContracts(result);
  };

  useEffect(() => {
    loadContracts();
  }, []);

  //검색입력은 useState사용
  const [inputText, setInputText] = useState("");
  return (
    <View style={styles.container}>
      {/*검색창*/}
      <View style={styles.searchcontainer}>
        {/*import component*/}
        <TextInput
          style={styles.textInput}
          placeholder="진행중 계약서 검색_"
          value={inputText}
          onChangeText={setInputText}
        />
        {/*List of Component */}
        <TouchableOpacity style={styles.searchBtn} onPress>
          <Text style={styles.text_style4}>검색</Text>
        </TouchableOpacity>
      </View>
      {/* <Text style={styles.h_text_style2}>진행중계약서</Text> */}
      <View>
        <FlatList
          data={contracts}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <LinearGradient style={styles.view_style2} colors={['#025CFC', '#FD8016']} start={[0, 1]} end={[1, 0]}>
              <TouchableOpacity
                style={styles.contract_click_style}
                onPress={() =>
                  navigation.push("Proceeding", {
                    title: item.title,
                    content: item.content,
                    contractors: item.contractors,
                  })
                }
              >
                <Icon name="rocket" color={icon_color2} size={icon_size} />
                <Text style={styles.text_style2}>{item.title}</Text>
              </TouchableOpacity>
            </LinearGradient>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

/////////체결////////////
function Signed({ navigation }) {
  const [contracts, setContracts] = useState([]); // 계약서 배열
  const {login_data} = useContext(LoginContext);
  const loadContracts = async () => {
    const { data: result } = await Axios.post(HOSTNAME + '/contract_load', { id: login_data.id, contract_type: "signed",});
    setContracts(result);
  };

  useEffect(() => {
    loadContracts();
  }, []);

  //검색입력은 useState사용
  const [inputText, setInputText] = useState("");
  return (
    <View style={styles.container}>
      {/*검색창*/}
      <View style={styles.searchcontainer}>
        {/*import component*/}
        <TextInput
          style={styles.textInput}
          placeholder="체결 계약서 검색_"
          value={inputText}
          onChangeText={setInputText}
        />
        {/*List of Component */}
        <TouchableOpacity style={styles.searchBtn} onPress>
          <Text style={styles.text_style4}>검색</Text>
        </TouchableOpacity>
      </View>

      {/* <Text style={styles.h_text_style3}>체결계약서</Text> */}
      <View>
        <FlatList
          data={contracts}
          showsVerticalScrollIndicator={false}
          keyExtractor={contracts.contract_id} 
          renderItem={({ item }) => (
            <View style={styles.view_style3}>
              <TouchableOpacity
                style={styles.contract_click_style}
                onPress={() =>
                  navigation.push("Signed", {
                    title: item.title,
                    content: item.content,
                    contractors: item.contractors,
                  })
                }
              >
                <Icon name="rocket" color={icon_color3} size={icon_size} />
                <Text style={styles.text_style3}>{item.title}</Text>
              </TouchableOpacity>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
}

export default Three_Contracts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
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
  h_text_style2: {
    backgroundColor: "#000000",
    width: 390,
    height: 30,
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    color: "#ffffff",
  },
  h_text_style3: {
    backgroundColor: "#000000",
    width: 390,
    height: 30,
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    color: "#ffffff",
  },
  view_style: {
    backgroundColor: "#025CFC",
    borderRadius: 10,
    width: "100%",
    height: 80,
    marginVertical: 4,
    color: "#ffffff",
    justifyContent: "center",
  },
  view_style2: {
    backgroundColor: "#00A7E8",
    borderRadius: 10,
    width: "100%",
    height: 80,
    marginVertical: 4,
    color: "#ffffff",
    justifyContent: "center",
  },
  view_style3: {
    backgroundColor: "#FD8016",
    borderRadius: 10,
    width: "100%",
    height: 80,
    marginVertical: 4,
    color: "#ffffff",
    justifyContent: "center",
  },
  contract_click_style: {
    padding: 4,
    marginLeft: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  text_style: {
    width: 370,
    height: 80,
    fontSize: 20,
    marginLeft: 65,
    marginTop: 55,
    color: "#ffffff",
    fontWeight: "bold",
  },
  text_style2: {
    width: 370,
    height: 80,
    fontSize: 20,
    marginLeft: 65,
    marginTop: 55,
    color: "#ffffff",
    fontWeight: "bold",
  },
  text_style3: {
    width: 370,
    height: 80,
    fontSize: 20,
    marginLeft: 70,
    marginTop: 55,
    color: "#ffffff",
    fontWeight: "bold",
  },
  text_style4: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 9,
  },
  searchcontainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  textInput: {
    fontSize: 20,
    textAlign: "right",
    paddingRight: 20,
    marginRight: 2,
    width: "80%",
    height: 40,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: "#ffffff",
    marginTop: 40,
    flexGrow: 1,
  },
  searchBtn: {
    width: "18%",
    height: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "gray",
    marginTop: 40,
  },

  contract_pdf_convert_style: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
  },

  plus_1: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
  },

  postBtn1: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "17.2%",
    height: "10%",
    top: "77%",
    left: "75%",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 5,
    backgroundColor: "white",
  },
});
