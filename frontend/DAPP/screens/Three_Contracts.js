import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Button, Text,FlatList,TouchableOpacity} from 'react-native';
import Icon from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

//벡엔드는 여기서 진행하면 됨
const DATA1 = [ '미체결계약서_1','미체결계약서_2','미체결계약서_3','미체결계약서_4','미체결계약서_5','미체결계약서_6','미체결계약서_7','미체결계약서_8','미체결계약서_9','미체결계약서_10']
const DATA2 = [ '진행중계약서_1','진행중계약서_2','진행중계약서_3','진행중계약서_4','진행중계약서_5','진행중계약서_6','진행중계약서_7','진행중계약서_8','진행중계약서_9','진행중계약서_10']
const DATA3 = [ '체결계약서_1','체결계약서_2','체결계약서_3','체결계약서_4','체결계약서_5','체결계약서_6','체결계약서_7','체결계약서_8','체결계약서_9','체결계약서_10']
const icon_color = '#000000';
const icon_color2 = '#000000';
const icon_color3 = '#ffffff';
const icon_size = "50";
const main_color = "#0DF9FF";

function Three_Contracts() {
  return (
    <Tab.Navigator
      initialRouteName="N_Signed"
      screenOptions={{
        tabBarActiveTintColor: "#0DF9FF",
        headerShown:false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          
        }
      }}
      >
      <Tab.Screen
        name="N_Signed"
        component={N_Signed}
        options={{
          title: '미체결',
          tabBarIcon: ({color, size}) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#FFFFFF",
        }}
      />
      <Tab.Screen
        name="Proceeding"
        component={Proceeding}
        options={{
          title: '진행중',
          tabBarIcon: ({color, size}) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: "#0DF9FF",
        }}
      />
      <Tab.Screen
        name="Signed"
        component={Signed}
        options={{
          title: '체결',
          
          tabBarIcon: ({color, size}) => (
            <Icon name="rocket" color={color} size={size} />
          ),
          tabBarActiveTintColor: '#007376',
        }}
      />
    </Tab.Navigator>
  );
}

/////////
function N_Signed({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.h_text_style}>미체결계약서</Text>
      <FlatList data={DATA1} showsVerticalScrollIndicator={false} renderItem={({item}) => (   
        <View style={styles.view_style}>   
          <TouchableOpacity style={styles.contract_click_style} onPress={() => navigation.push('N_Signed')}> 
            <Icon name="rocket" color={icon_color} size={icon_size}/>
            <Text style={styles.text_style}>{item}</Text>
          </TouchableOpacity> 
        </View>    
      )}>
      </FlatList>
    </View>
  );
}

function Proceeding({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.h_text_style2}>진행중계약서</Text>
      <FlatList data={DATA2} showsVerticalScrollIndicator={false} renderItem={({item}) => (   
        <View style={styles.view_style2}>   
          <TouchableOpacity style={styles.contract_click_style} onPress={() => navigation.push('Proceeding')}> 
            <Icon name="rocket" color={icon_color2} size={icon_size}/>
            <Text style={styles.text_style2}>{item}</Text>
          </TouchableOpacity> 
        </View>    
      )}>
      </FlatList>
    </View>
  );
}

function Signed({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.h_text_style3}>체결계약서</Text>
      <FlatList data={DATA3} showsVerticalScrollIndicator={false} renderItem={({item}) => (   
        <View style={styles.view_style3}>   
          <TouchableOpacity style={styles.contract_click_style} onPress={() => navigation.push('Signed')}> 
            <Icon name="rocket" color={icon_color3} size={icon_size}/>
            <Text style={styles.text_style3}>{item}</Text>
          </TouchableOpacity> 
        </View>    
      )}>
      </FlatList>
    </View>
  );
}


export default Three_Contracts;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  h_text_style: {
    backgroundColor: '#000000',
    width: 390,
    height:30,
    color: '#ffffff',
    fontSize:15,
    textAlign:'center',
    color: '#ffffff',
  },
  h_text_style2: {
    backgroundColor: '#000000',
    width: 390,
    height:30,
    color: '#ffffff',
    fontSize:15,
    textAlign:'center',
    color: '#ffffff',
  },
  h_text_style3: {
    backgroundColor: '#000000',
    width: 390,
    height:30,
    color: '#ffffff',
    fontSize:15,
    textAlign:'center',
    color: '#ffffff',
  },
  view_style: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: 380,
    height:80,
    marginVertical: 4,
    color: '#ffffff',
    justifyContent : 'center',
    borderColor: '#ffffff',
    borderWidth:5,
  },
  view_style2: {
    backgroundColor: "#0DF9FF",
    borderRadius: 10,
    width: 380,
    height:80,
    marginVertical: 4,
    color: '#ffffff',
    justifyContent : 'center',
    borderColor: "#0DF9FF",
    borderWidth:5,
  },
  view_style3: {
    backgroundColor: '#007376',
    borderRadius: 10,
    width: 380,
    height:80,
    marginVertical: 4,
    color: '#ffffff',
    justifyContent : 'center',
    borderColor: '#007376',
    borderWidth:5,
  },
  contract_click_style: {
    padding:4,
    marginLeft:10,
    alignItems: 'center',
    flexDirection:'row',
  },
  text_style: {
    width: 370,
    height:80,
    fontSize:20,
    marginLeft:65,
    marginTop: 55,
    color: 'black',
    fontWeight: 'bold',
  },
  text_style2: {
    width: 370,
    height:80,
    fontSize:20,
    marginLeft:65,
    marginTop: 55,
    color: 'black',
    fontWeight: 'bold',
  },
  text_style3: {
    width: 370,
    height:80,
    fontSize:20,
    marginLeft:70,
    marginTop: 55,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});