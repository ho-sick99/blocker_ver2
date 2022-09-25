import React, {useContext} from 'react';
import { View, Text } from "react-native";
import LoginContext from '../context/LoginContext';

function MyPage() {
  const {login_data} = useContext(LoginContext);
  return (
    <View>

      {/* <Text>{login_data.name}, {login_data.id}, {login_data.login_state}</Text> */}
      {/* 이렇게 사용할 수 있음! */}
      <Text>{login_data.name}님의 계정</Text>
    </View>
    
  );
}

export default MyPage;