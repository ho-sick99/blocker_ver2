import React from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  Dimensions,
  Pressable,
} from 'react-native';

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

function Proceeding({navigation, route}) {
  return (
    <View style={styles.container}>

      <View style={styles.container_contract}>
        <Text>contarct view</Text>
        <Text>{route.params.title}</Text>
        <Text>{route.params.content}</Text>
        <Text>{route.params.contractors}</Text>
      </View>

      <View style={styles.container_button}>
        <Pressable style={styles.btn_contract_1} 
        onPress={() => {
          alert("삭제")
         }}>
          <Text style={styles.textStyle_btn}>DEL</Text>
        </Pressable> 
        <Pressable style={styles.btn_contract_2} 
        onPress={() => {
          alert("수정")
          }}>
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </Pressable>
        <Pressable style={styles.btn_contract_3} 
        onPress={() => {
          alert("사인")
          }}>
          <Text style={styles.textStyle_btn}>SIGN</Text>
        </Pressable>
      </View>
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
  container_contract: {
    backgroundColor:'white',
    justifyContent:'flex-start',
    paddingLeft:"5%",
    padding:"10%",
    width:"94%",
    height: "87%",
    margin: "3%",
    borderRadius:10,
  },
  container_button: {
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
  btn_contract_1: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginLeft: 10, 
  },
  btn_contract_2: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
  },
  btn_contract_3: {
    width: Width* 0.3,
    height: Height* 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent : 'center',
    alignItems: 'center', 
    marginRight: 10, 
  },
});

export default Proceeding;