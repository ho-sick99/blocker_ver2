import React, { useContext, useState, useEffect } from "react";
import LoginContext from "../context/LoginContext";
import { useIsFocused } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import Axios from "axios";
import { HOSTNAME } from "@env";
import {printToFileAsync} from 'expo-print';
import { shareAsync } from 'expo-sharing';

const Width = Dimensions.get("window").width; //스크린 너비 초기화
const Height = Dimensions.get("window").height; //스크린 높이 초기화

function Proceeding({ navigation, route }) {
  const isFocused = useIsFocused(); // 리프레쉬
  const { login_data } = useContext(LoginContext);

  const [sign_img_data_0, setSignImgData_0] = useState("");
  const [sign_img_data_1, setSignImgData_1] = useState("");
  const [sign_img_data_2, setSignImgData_2] = useState("");
  const [sign_img_data_3, setSignImgData_3] = useState("");

  const [sign0, setSign0] = useState("");
  const [sign1, setSign1] = useState("");
  const [sign2, setSign2] = useState("");
  const [sign3, setSign3] = useState("");

  const [user_name0, setUserName0] = useState("");
  const [user_name1, setUserName1] = useState("");
  const [user_name2, setUserName2] = useState("");
  const [user_name3, setUserName3] = useState("");

  const contractors = JSON.parse(route.params.contractors); 
  const sigend_info = JSON.parse(route.params.signed); 

  const get_info = async (contractor_id, idx) => {
    const { data: result } = await Axios.post(HOSTNAME + "/get_sign_info", {
      id: contractor_id,
    });
    const { data: result_name } = await Axios.post(
      HOSTNAME + "/get_user_name",
      { id: contractor_id }
    );
    if (idx === 0) {
      if (sigend_info.includes(contractor_id)) {
        setSignImgData_0(result);
      }
      setUserName0(result_name);
    } else if (idx === 1) {
      if (sigend_info.includes(contractor_id)) {
        setSignImgData_1(result);
      }
      setUserName1(result_name);
    } else if (idx === 2) {
      if (sigend_info.includes(contractor_id)) {
        setSignImgData_2(result);
      }
      setUserName2(result_name);
    } else if (idx === 3) {
      if (sigend_info.includes(contractor_id)) {
        setSignImgData_3(result);
      }
      setUserName3(result_name);
    }
  };
  const get_contractor_info = async () => {
    for (let i = 0; i < contractors.id.length; i++) {
      get_info(contractors.id[i], i);
    }
  };

  const convert_contract_to_html = (data) => {
    const html = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>계약서 양식</title>
          <style>
            .centered { display: table; margin-left: auto; margin-right: auto; text-align: center; }
            .contract_writer { text-align: right; }
            .contract_date { text-align: left; }
            .contract_content { text-align: left; }
          </style>
      </head>
      <body class="centered">
          <H1>
               ${data.title}
          </H1>
          <H3 class="contract_date">
              계약 체결일: ${data.contract_date}
          </H3>
          <H3 class="contract_writer">
              작성자: ${login_data.name}(${data.id})
          </H3>
          <hr>
          <div>
              계약 참여자
              <table border="1">
                  <tbody>
                    <tr>
                          <td>${user_name0}</td>
                          <td>${user_name1}</td>
                          <td>${user_name2}</td>
                          <td>${user_name3}</td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <hr>
            계약 내용
            <br>
            <div>
              ${data.content}
            </div>
          <hr>
          <div>
              서명란
              <table border="1">
                  <thead>
                    <tr><th>${contractors.id[0]}</th><th>${contractors.id[1]}</th><th>${contractors.id[2]}</th><th>${contractors.id[3]}</th></tr>
                  </thead>
                  <tobdy>
                    <tr>
                      <td>${user_name0}</td><td><img src=${sign_img_data_0}></td>
                      <td>${user_name1}</td><td><img src=${sign_img_data_1}></td>
                      </tr>
                    <tr>
                      <td>${user_name2}</td><td><img src=${sign_img_data_2}></td>
                      <td>${user_name3}</td><td><img src=${sign_img_data_3}></td>
                    </tr>
                  </tobdy>
              </table>
          </div>
      </body>
  </html>
`;
    return html;
  };

  const convert_html_to_pdf = (html) => {
    conversion({ html }, (err, pdf) => {
      console.log(pdf);
    });
    console.log();
  };
  const sign_on_contract = async () => {
    // 사인 버튼 누를 시
    const { data: result } = await Axios.post(HOSTNAME + "/check_sign", {
      // 현재 id 사인함
      id: login_data.id,
      contract_id: route.params.contract_id,
    });
    if (result.success) {
      // 사인 성공
      if (result.contract_bool) {
        // 모두 서명 완료
        alert("모두 사인 완료");
        // 시간 넣어서 같이 계약서에 표시되도록

        // 파기 계약 성립
        if (route.params.avoidance > 0) {
          // 블록체인 네트워크 동작 시나리오 //
          // 먼저 파기하고자 하는 계약서의 데이터 받아와서 html 형식으로 만들고, 이를 pdf 형식으로 변환한다.
          // 이후 해당 pdf를 encode하여 server로 전송하고, 해시값을 반환받는다.
          // 파기 계약서 역시 동일한 방식으로 진행한다.
          // 2개의 해시값 + 계약자들 정보 + 현재 시각을 인수로 블록체인 파기 메서드를 호출한다.

          // 파기하고자 하는 계약서의 contract_id는 avoidance
          // 해당 체결 계약서의 데이터들을 받아옴
          const { data } = await Axios.post(
            HOSTNAME + "/signed_contract_load",
            { contract_id: route.params.avoidance }
          );

          const htmlData = convert_contract_to_html(data); // 계약서 데이터 html 폼으로 패키징
          convert_html_to_pdf(htmlData); // html 폼을 pdf 형식으로 변환
          // 이후에 pdf를 base 64형태로 변환
          // 다음 해당 데이터를 해시화 요청

          // console.log("파일 전송 및 결과 반환")
          // const url = HOSTNAME+"/upload_pdf";
          // const fileUri = param.uri;
          // const formData = new FormData();
          // formData.append('file', param); // name, value
          // const options = {
          //     method: 'POST',
          //     body: formData, // 
          //     headers: {
          //       Accept: 'application/pdf',
          //       'Content-Type': 'multipart/form-data',
          //     },
          // };
          // const res = await fetch(url, options).catch((error) => console.log(error));
          // const data = await res.json();
          // console.log(HOSTNAME);
          // console.log(data.hash);
          // compare_hash(data.hash);

          // 파기 계약서를 작성하여 동일한 과정 수행
          // 이후 Object로 패키징하여 블록체인의 계약 파기 메서드 호출하면 끝

          const { data: result } = await Axios.post(
            // 해당 체결 계약서가 파기되었음을 의미
            HOSTNAME + "/set_singed_avoidance",
            {
              contract_id: route.params.avoidance,
              avoidance: route.params.avoidance, // 체결 계약서의 contract_id와 avoidance를 일치시킴을 통해 해당 체결 계약서가 파기됨를 나타냄
            }
          );
        }
        const { data: result } = await Axios.post(HOSTNAME + '/progress_contract',{ contract_id: route.params.contract_id})
        if(result.success){
          generatePdf(); 
        }
      } else {
        // 사인은 성공했으나 모든 서명 기입 아님
        alert("계약서에 서명했습니다.");
      }
    } else {
      alert(result.msg);
    }
    // 서명 후 계약 진행 확인
  };

  const cancle_contract = async () => {
    const { data: result } = await Axios.post(
      HOSTNAME + "/cancle_progress_contract",
      { contract_id: route.params.contract_id }
    );
    if (result.success) {
      alert("진행중인 계약이 취소되었습니다.");
    } else {
      alert(result.msg);
    }
  };

  let generatePdf = async () => {
    const { data: result } = await Axios.get(HOSTNAME + '/get_last_contractid')
    const { data: writer_name } = await Axios.post(HOSTNAME + '/get_user_name',{ id : result[0].id})
    const contractors = JSON.parse(result[0].contractors); 
    const file = await printToFileAsync({
      html: `
      <!DOCTYPE html>
      <html>
          <head>
              <title>계약서 양식</title>
              <style>
                .centered { display: table; margin-left: auto; margin-right: auto; text-align: center; }
                .contract_writer { text-align: right; }
                .contract_date { text-align: left; }
                .contract_content { text-align: left; }
              </style>
          </head>
          <body class="centered">
              <H1>
                   ${result[0].title}
              </H1>
              <H3 class="contract_date">
                  계약 체결일: ${result[0].contract_date}
              </H3>
              <H3 class="contract_writer">
                  작성자: ${writer_name}(${result[0].id})
              </H3>
              <hr>
              <div>
                  계약 참여자
                  <table border="1">
                      <tbody>
                        <tr>
                              <td>${user_name0}</td>
                              <td>${user_name1}</td>
                              <td>${user_name2}</td>
                              <td>${user_name3}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
              <hr>
                계약 내용
                <br>
                <div>
                  ${result[0].content}
                </div>
              <hr>
              <div>
                  서명란
                  <table border="1">
                      <thead>
                        <tr><th>${contractors.id[0]}</th><th>${contractors.id[1]}</th><th>${contractors.id[2]}</th><th>${contractors.id[3]}</th></tr>
                      </thead>
                      <tobdy>
                        <tr>
                          <td>${user_name0}</td><td><img src=${sign_img_data_0}></td>
                          <td>${user_name1}</td><td><img src=${sign_img_data_1}></td>
                          </tr>
                        <tr>
                          <td>${user_name2}</td><td><img src=${sign_img_data_2}></td>
                          <td>${user_name3}</td><td><img src=${sign_img_data_3}></td>
                        </tr>
                      </tobdy>
                  </table>
              </div>
          </body>
      </html>
    `,
      base64 : true
    });
    console.log("파일 전송 및 결과 반환")
    const url = HOSTNAME+"/upload_pdf";
    const fileUri = file.uri;
    const formData = new FormData();
    formData.append('file', {
      name: "temppdf",
      size: file.base64.length,
      uri: fileUri,
      type: "application/pdf"
    });
    const options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/pdf',
          'Content-Type': 'multipart/form-data',
        },
    };
    const res = await fetch(url, options).catch((error) => console.log(error));
    const data = await res.json();
    console.log(data.hash);

    //블록체인 네트워크 원장에 기록 
    if(route.params.avoidance > 0){
      console.log("파기 계약서 원본 가져오기")
      // 1. avoidance가 가리키는 계약서 내용 가져옴 
      const { data: cancle_result } = await Axios.post(HOSTNAME + '/signed_contract_view',{ contract_id : route.params.avoidance})
      const { data: cancle_writer_name } = await Axios.post(HOSTNAME + '/get_user_name',{ id : cancle_result.id})
      console.log(cancle_result); 
      console.log(writer_name); 
      // 2. 계약서 내용을 기반으로 html 파일 생성
      const cancle_file = await printToFileAsync({
          html: `
          <!DOCTYPE html>
          <html>
              <head>
                  <title>계약서 양식</title>
                  <style>
                    .centered { display: table; margin-left: auto; margin-right: auto; text-align: center; }
                    .contract_writer { text-align: right; }
                    .contract_date { text-align: left; }
                    .contract_content { text-align: left; }
                  </style>
              </head>
              <body class="centered">
                  <H1>
                      ${cancle_result.title}
                  </H1>
                  <H3 class="contract_date">
                      계약 체결일: ${cancle_result.contract_date}
                  </H3>
                  <H3 class="contract_writer">
                      작성자: ${cancle_writer_name}(${cancle_result.id})
                  </H3>
                  <hr>
                  <div>
                      계약 참여자
                      <table border="1">
                          <tbody>
                            <tr>
                                  <td>${user_name0}</td>
                                  <td>${user_name1}</td>
                                  <td>${user_name2}</td>
                                  <td>${user_name3}</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <hr> 
                    계약 내용
                    <br>
                    <div>
                      ${cancle_result.content}
                    </div>
                  <hr>
                  <div>
                      서명란
                      <table border="1">
                          <thead>
                            <tr><th>${contractors.id[0]}</th><th>${contractors.id[1]}</th><th>${contractors.id[2]}</th><th>${contractors.id[3]}</th></tr>
                          </thead>
                          <tobdy>
                            <tr>
                              <td>${user_name0}</td><td><img src=${sign_img_data_0}></td>
                              <td>${user_name1}</td><td><img src=${sign_img_data_1}></td>
                              </tr>
                            <tr>
                              <td>${user_name2}</td><td><img src=${sign_img_data_2}></td>
                              <td>${user_name3}</td><td><img src=${sign_img_data_3}></td>
                            </tr>
                          </tobdy>
                      </table>
                  </div>
              </body>
          </html>
        `,
        base64 : true
      });
      console.log("파일 전송 및 결과 반환")
      const cancle_url = HOSTNAME+"/upload_pdf";
      const cancle_fileUri = cancle_file.uri;
      const cancle_formData = new FormData();
      cancle_formData.append('file', {
        name: "temppdf",
        size: cancle_file.base64.length,
        uri: cancle_fileUri,
        type: "application/pdf"
      });
      const cancle_options = {
          method: 'POST',
          body: cancle_formData,
          headers: {
            Accept: 'application/pdf',
            'Content-Type': 'multipart/form-data',
          },
      };

      // 3. 해당 pdf를 기반으로 hash값 생성 
      const cancle_res = await fetch(cancle_url, cancle_options).catch((error) => console.log(error));
      const cancledata = await cancle_res.json();
      console.log(cancledata.hash);

      // 4. 체인코드 호출: 파기 계약 체결 
      const { data: b_res } = await Axios.post(HOSTNAME + '/canclecontract', { hash: data.hash, canclehash: cancledata.hash, contractors: result[0].contractors, date: result[0].contract_date}); 
      alert(b_res.msg);
    }
    else{
      // 체인코드 호출:  계약 체결 
      const { data: b_res } = await Axios.post(HOSTNAME + '/contract', { hash: data.hash, contractors: result[0].contractors, date: result[0].contract_date}); 
      alert(b_res.msg);
    }

  }

  useEffect(() => {
    get_contractor_info();
  }, [isFocused]); // 리프레쉬 인자 전달6 3u

  return (
    <View style={styles.container}>
      <View style={styles.container_contract}>
        <View>
          <Text style={styles.textTitle}>{route.params.title}</Text>
        </View>

        <View>
          <Text style={styles.textWriter}>작성자: {route.params.id}</Text>
        </View>

        <View style={styles.textContractors}>
          <Text>{user_name0}</Text>
          <Text>{user_name1}</Text>
          <Text>{user_name2}</Text>
          <Text>{user_name3}</Text>
        </View>

        <ScrollView style={styles.containerContent}>
          <Text style={styles.textContent}>{route.params.content}</Text>
        </ScrollView>

        <View style={styles.containerSign}>
          <Image source={{ uri: sign_img_data_0 }} style={styles.imgSign} />
          <Image source={{ uri: sign_img_data_1 }} style={styles.imgSign} />
          <Image source={{ uri: sign_img_data_2 }} style={styles.imgSign} />
          <Image source={{ uri: sign_img_data_3 }} style={styles.imgSign} />
        </View>
      </View>

      <View style={styles.container_button}>
        <Pressable
          style={styles.btn_contract_1}
          onPress={() => {
            cancle_contract();
            navigation.pop();
          }}
        >
          <Text style={styles.textStyle_btn}>CANCLE</Text>
        </Pressable>
        <Pressable
          style={styles.btn_contract_3}
          onPress={() => {
            sign_on_contract();
          }}
        >
          <Text style={styles.textStyle_btn}>SIGN</Text>
        </Pressable>
        <Pressable
          style={styles.btn_contract_2}
          onPress={() => {
            alert("수정");
          }}
        >
          <Text style={styles.textStyle_btn}>EDIT</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7E6E6",
    justifyContent: "center",
    alignItems: "center",
  },
  container_contract: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "5%",
    width: "94%",
    height: "87%",
    margin: "3%",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  container_button: {
    width: "100%",
    height: "10%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textStyle_btn: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  btn_contract_1: {
    width: Width * 0.3,
    height: Height * 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  btn_contract_2: {
    width: Width * 0.3,
    height: Height * 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_contract_3: {
    width: Width * 0.3,
    height: Height * 0.07,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 25,
  },
  textWriter: {
    textAlign: "right",
    marginTop: 5,
  },
  textContractors: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 5,
    borderColor: "#2196F3",
    borderWidth: 3,
    padding: 3,
  },
  containerContent: {
    backgroundColor: "#E7E6E6",
    borderRadius: 5,
    padding: 5,
  },
  containerSign: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: Height * 0.05,
  },
  imgSign: {
    backgroundColor: "white",
    width: Width * 0.2,
    height: Width * 0.1,
    borderRadius: 5,
    borderColor: "#939393",
    borderWidth: 1,
    marginTop: 5,
  },
});

export default Proceeding;
