import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Proceeding({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
 
        <TouchableOpacity style={styles.button_of_edit} onPress={() => alert("재계약")}>
          <Text style={styles.edit}>RE-CONTRACT</Text>
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
  button_of_edit: {
    backgroundColor:'#007376',
    width: 310,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:23,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Proceeding;