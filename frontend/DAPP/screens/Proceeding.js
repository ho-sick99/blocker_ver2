import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Proceeding({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity style={styles.button_of_del} onPress={() => alert("삭제")}>
          <Text style={styles.del}>DEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.space}></TouchableOpacity>    
        <TouchableOpacity style={styles.button_of_edit} onPress={() => alert("수정")}>
          <Text style={styles.edit}>EDIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flexDirection:'row',
    width: 310,
    height: 50,
    marginTop:500,
  },
  button_of_del: {
    backgroundColor:"#0DF9FF",
    width: 130,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  del: {
    fontSize:23,
    color: 'black',
    fontWeight: 'bold',
  },
  space: {
    width: 50,
    height: 50,
  },
  button_of_edit: {
    backgroundColor:"#0DF9FF",
    width: 130,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:23,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Proceeding;