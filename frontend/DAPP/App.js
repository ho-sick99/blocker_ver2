import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "./screens/Login";
import Notice_board from "./screens/Notice_board";
import Three_Contracts from "./screens/Three_Contracts";
import Axios from "axios";

// 환경 변수
import { HOSTNAME } from "@env";

const Stack = createNativeStackNavigator();

const local_host = HOSTNAME; // 로컬 주소 변경해야할 수 도

// 연동 테스트 함수
const test = async () => {
  console.log("testing ...");
  await Axios.get(local_host + "/")
    .then((res) => {
      console.log(
        "id: " + "%s" + " pw: " + "%s",
        res.data[0].id,
        res.data[0].pw
      );
    })
    .catch((error) => console.log(error));
};

const test1 = async () => {
  console.log("testing ...");
  await Axios.post(local_host + "/login", { id: "master1", pw: "1234" })
    .then((res) => {
      console.log(res.data.success);
    })
    .catch((error) => console.log(error));
};

const test2 = async () => {
  console.log("testing ...");
  await Axios.post(local_host + "/register", {
    id: "master1",
    pw: "1234",
    name: "admin",
  })
    .then((res) => {
      console.log(res.data.success);
    })
    .catch((error) => console.log(error));
};

// 준호 api 테스트
const test_j = async () => {
  // 성공
  const res = await (await fetch(local_host + "/")).json();
  console.log(res);
};

const login_j = async () => {
  console.log("로그인 시도");
  // 성공
  const res = await (
    await fetch(local_host + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "master",
        pw: "1234",
      }),
    })
  ).json();
  console.log(res);
};

const register_j = async () => {
  console.log("회원가입 시도");
  // 데이터는 전달되나 db 테이블 접근 거부당함
  const res = await (
    await fetch(local_host + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "junojuno",
        pw: "1234",
        name: "juno",
      }),
    })
  ).json();
  console.log(res);
};

export default function App() {
  // 렌더링 시 콘솔로 출력시켜서 확인
  useEffect(() => {
    login_j();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notice_board"
          component={Notice_board}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Three_Contracts"
          component={Three_Contracts}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
