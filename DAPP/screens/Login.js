import React from "react";
import { Image } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

function Login({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require("./image/Logo.png")}
        style={{ position: 'absolute', width: 130, height: 130, top: 250 }}>
      </Image>

      <TouchableOpacity style={styles.button_1} onPress={() => navigation.navigate("Notice_board")}>
        <Text style={styles.title_1} >로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button_2} onPress={() => Alert.alert("준비중")}>
        <Text style={styles.title_2}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button_1: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0DF9FF',
    width: 280,
    height: 40,
    top: 470,
    borderRadius: 10,
  },

  title_1: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  button_2: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 280,
    height: 40,
    top: 530,
    borderRadius: 10,
  },

  title_2: {
    fontSize: 15,
    color: "#0DF9FF",
    fontWeight: "bold",

  },
});