import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PostView({navigation, route}) {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text>{route.params.id}</Text>
        <TouchableOpacity style={styles.button_of_edit} onPress={() => navigation.push('Notice_board')}>
          <Text style={styles.edit}>ADD BOOK MARK</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFFFFF',
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
    backgroundColor:'#FFFFFF',
    width: 310,
    height: 50,
    borderRadius:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    fontSize:23,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default PostView;