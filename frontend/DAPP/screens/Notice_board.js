import React, { useEffect } from "react";
import { createDrawerNavigator,DrawerActions } from "@react-navigation/drawer";
import Icon from "@expo/vector-icons/Ionicons";
import Three_Contracts from "./Three_Contracts";
import MyPage from "./MyPage";
import { 
  View, 
  Text, 
  StyleSheet , 
  FlatList, 
  TouchableOpacity,
  Dimensions,
} from "react-native";

const Drawer = createDrawerNavigator();

const DATA = [ '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
const icon_color = '#000000';
const icon_size = 50;

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화


function Main({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.h_text_style}>Contracts</Text>
        <View>
          <FlatList data={DATA}  numColumns={2}  showsVerticalScrollIndicator={false} renderItem={({item}) => (   
            <View style={styles.view_style} columnWrapperStyle={styles.row}>   
              <TouchableOpacity style={styles.contract_click_style} onPress={() => navigation.push('PostView', {id : item})}> 
                <Icon name="rocket" color={icon_color} size={icon_size}/>
                <Text style={styles.text_style}>{item}</Text>
              </TouchableOpacity> 
              
            </View>    
          )}>
        
          </FlatList>
        <TouchableOpacity style={styles.postBtn} onPress={() => navigation.push('PostWrite')}> 
          <Text style={styles.text_style2}>POST</Text>
        </TouchableOpacity> 
        </View>
        
    </View>
  );
}


const Notice_board = () => {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerStyle: { height: 110, backgroundColor: "black", shadowOpacity:0},
        headerTitleStyle: { color: "white", fontSize: 25 ,},
        drawerPosition:'left',
        headerTintColor:"white",
        drawerActiveBackgroundColor: "#0DF9FF",
        drawerInactiveTintColor:"white",
        drawerActiveTintColor: "black",
        drawerStyle:{backgroundColor:'black',width:200,},
      }}
    >
      <Drawer.Screen name="Notice Board" component={Main} options={{drawerIcon:({color,size,focuced})=>( 
          <Icon
            name={"home"}
            size={size}
            color={color}
          />),}} />
      <Drawer.Screen name="Contracts" component={Three_Contracts} options={{drawerIcon:({color,size,focuced})=>( 
          <Icon
            name={"rocket"}
            size={size}
            color={color}
          />),}} />
      <Drawer.Screen name="MyPage" component={MyPage} options={{drawerIcon:({color,size,focuced})=>( 
          <Icon
            name={"pause"}
            size={size}
            color={color}
          />),}} />
    </Drawer.Navigator>
  );
}

export default Notice_board;

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
  view_style: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: Width*0.45,
    height:  Width*0.45,
    marginVertical: 9,
    color: '#ffffff',
    justifyContent : 'center',
    borderColor: '#ffffff',
    borderWidth:10,
    margin: 9,
  },
  row: {
    flex: 1,
    justifyContent: "space-around"
  },
  contract_click_style: {
    padding:4,
    alignItems: 'center',
    flexDirection:"column",
    flex:1,
    marginTop: 30,
  },
  text_style: {
    width: 370,
    height:80,
    fontSize:20,
    marginTop: 25,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 355,
  },
  text_style2:{
    color:"#000000",
    fontSize:30,
    fontWeight:"bold",
  },
  postBtn:{
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    width:"30%",
    height:"8%",
    top:"80%",
    left:"35%",
    borderRadius:10,
    borderColor:"black",
    borderStyle:"dotted",
    borderWidth:5,
    backgroundColor:"#0DF9FF",
  }
});