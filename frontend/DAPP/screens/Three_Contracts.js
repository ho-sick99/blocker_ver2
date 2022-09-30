import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from "@expo/vector-icons/Ionicons";

//각 옆텝 화면 가져오기
import N_Signed from './N_Signed';
import Proceeding from './Proceeding';
import Signed from './Signed';


const Tab = createBottomTabNavigator();

//https://eunbin00.tistory.com/42
//https://jeffgukang.github.io/react-native-tutorial/docs/router-tutorial/02-react-navigation-tab/react-navigation-tab-kr.html
function Three_Contracts() {
  return (
    <NavigationContainer independent={true}>
      
      <Tab.Navigator initialRouteName="N_Signed" screenOptions={({ route }) => ({
                tabBarIcon: props => {},tabBarStyle: {
                    backgroundColor: '#000000',
                },
                tabBarActiveTintColor: '#0DF9FF',
            })}>

        <Tab.Screen name="N_Signed" component={N_Signed} options={{title: '미체결', tabBarIcon: ({color, size}) => (
                <Icon name="rocket" color={color} size={size}  />),}} >
        </Tab.Screen>
        
        <Tab.Screen name="Proceeding" component={Proceeding} options={{title: '진행중', tabBarIcon: ({color, size}) => (
                <Icon name="rocket" color={color} size={size}  />),}} >
        </Tab.Screen>

        <Tab.Screen name="Signed" component={Signed} options={{title: '체결', tabBarIcon: ({color, size}) => (
                <Icon name="rocket" color={color} size={size}  />),}} >
        </Tab.Screen>
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Three_Contracts;