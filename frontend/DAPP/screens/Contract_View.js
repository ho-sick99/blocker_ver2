import React, {
    useState,
    useEffect,
  } from 'react';
  import {
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    Dimensions, 
  } from 'react-native';
  import { TouchableOpacity } from 'react-native-gesture-handler';
  import Axios from 'axios';
  import { HOSTNAME } from "@env";
  
  const Width = Dimensions.get('window').width;    //스크린 너비 초기화
  const Height = Dimensions.get('window').height;  //스크린 높이 초기화
  
  
  function Contract_View({navigation, route}) {
    console.log(HOSTNAME);
    console.log(HOSTNAME);
    console.log(HOSTNAME);
    const [contarct_info, setContract] = useState([]); // 계약서 배열
  
    const loadContract = async () => {
      const { data: result } = await Axios.post(HOSTNAME + '/contract_view', { contract_id: route.params.contract_id })
      setContract(result);
    };
    useEffect(() => {
      loadContract();
    }, []);
    return ( 
        <View style={styles.container}>
          <View style={styles.container_contract}>
            <View style={styles.container_title}>
              <Text style={styles.textTitle}>{contarct_info.title}</Text>
              <Text style={styles.textWriter}>작성자: {contarct_info.id}</Text>      
            </View>
            <ScrollView style={styles.container_content}>
                  <Text style={styles.textbox}>{contarct_info.content}</Text>
            </ScrollView>
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
    container_button: {
      flexDirection: 'row',
      width: "100%",
      height: "10%",
      justifyContent: 'space-between',
    },
    container_contract:{
      flexDirection:'column',
      justifyContent:'flex-start',
      padding:"4%",
      width:"94%",
      height:"95%",
      margin: "3%",
      borderRadius:10,
      backgroundColor:'white',
    },
    textframe:{
      margin:"2%",
      fontsize:50,
      fontWeight: 'bold',
      borderColor:"#FFAF00",
    },
    container_title: {
      width: Width* 0.86,
      borderColor:"#2196F3",
      borderWidth: 3,
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: 'center', 
      padding: 5, 
    },
    textbox:{
      margin:"5%",
      fontsize:23,
    },
    button_of_del: {
      backgroundColor: "#2196F3",
      width: Width* 0.45,
      height: Height* 0.07,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 10, 
    },
    textStyle_btn : {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white', 
    },
    button_of_edit: {
      backgroundColor: "#2196F3",
      width: Width* 0.45,
      height: Height* 0.07,
      borderRadius:10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10, 
    },
    textTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    textWriter:{
      fontSize: 15,
      fontWeight: 'bold',
    },
    container_content: {
      borderColor:"black",
      borderWidth: 1,
      borderRadius: 5,
      padding: 5, 
      marginTop: 10, 
    }

  });
  
  export default Contract_View;