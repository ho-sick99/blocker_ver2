import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function N_Signed() {
  return <Text>미체결</Text>;
}

function Proceeding() {
  return <Text>진행중</Text>;
}

function Signed() {
  return <Text>체결</Text>;
}

function Three_Contracts() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator initialRouteName="N_Signed">
        <Tab.Screen
          name="N_Signed"
          component={N_Signed}
          options={{
            title: '미체결',
            tabBarIcon: ({color, size}) => (
                <Icon name="message" color={color} size={size} />
              ),
          }}
        />
        <Tab.Screen
          name="Proceeding"
          component={Proceeding}
          options={{
            title: '진행중',
            tabBarIcon: ({color, size}) => (
                <Icon name="message" color={color} size={size} />
              ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={Signed}
          options={{
            title: '체결',
            tabBarIcon: ({color, size}) => (
              <Icon name="message" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Three_Contracts;