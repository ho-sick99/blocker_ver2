import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "./screens/Login";
import Notice_board from "./screens/Notice_board";
import Three_Contracts from "./screens/Three_Contracts";
import MyPage from "./screens/MyPage";
import LoginProvider from "./context/LoginProvider";  // <LoginProvider>가져오고 

import N_Signed from './screens/N_Signed';
import Proceeding from './screens/Proceeding';
import Signed from './screens/Signed';

import PostView from './screens/PostView';
const Stack = createNativeStackNavigator();


export default function App() {
  return (
      <LoginProvider> 
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
            <Stack.Screen
              name="MyPage"
              component={MyPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="N_Signed"
              component={N_Signed}
              options={{title: '미체결', headerStyle: { backgroundColor: "black"}, 
              headerTitleStyle: { color: "white", fontSize: 23 ,},
              headerTintColor:"white",
              headerBackTitle:"",
            }}
            />
            <Stack.Screen
              name="Proceeding"
              component={Proceeding}
              options={{title: '진행중', headerStyle: { backgroundColor: "black"}, 
              headerTitleStyle: { color: "white", fontSize: 23 ,},
              headerTintColor:"white",
              headerBackTitle:"",
            }}
            />
            <Stack.Screen
              name="Signed"
              component={Signed}
              options={{title: '체결', headerStyle: { backgroundColor: "black"}, 
              headerTitleStyle: { color: "white", fontSize: 23 ,},
              headerTintColor:"white",
              headerBackTitle:"",
            }}
            />
            <Stack.Screen
              name="PostView"
              component={PostView}
              options={{title: 'POSTVIEW', headerStyle: { backgroundColor: "black"}, 
              headerTitleStyle: { color: "white", fontSize: 23 ,},
              headerTintColor:"white",
              headerBackTitle:"",
              headerBackVisible: false,
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoginProvider>
  );
}
