import React, {
    useState,
} from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    Pressable,
    Dimensions,
   } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Buffer } from "buffer";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화

function Verification({navigation}) {
    const [ vrf_res, set_vrf_res_] = useState("Push the contract");

    const ensureDirExists = async (file_path) => {
        const dir = file_path;
        const dirInfo = await FileSystem.getInfoAsync(dir);
        if (!dirInfo.exists) {
          console.log("directory doesn't exist, creating...");
          await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        } else {
          console.log("directory alreay exists");
        }
    }

    function atob(data) { return new Buffer(data, "base64").toString("binary"); }

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);
    
        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);
    
        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }
        return new Blob([out], { type: 'application/pdf' });
    };
    

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result.uri);
        // ensureDirExists(result.uri)
        // .then(() =>
        // FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
        //   .then((contents) => {
        //     console.log("Read Success");
        //     //console.log(contents);
        //     const blob = base64toBlob(contents);
        //     console.log(blob);
        //   })
        //   .catch((e) => console.log(e))
        // )
        // .catch((e) => console.log(e));



      };


    return(
        <View style={styles.container}>
            <View style={styles.container_btn}>
                <Pressable 
                    style={[styles.btn_vrf]}
                    onPress={() => {
                    pickDocument();
                    set_vrf_res_("fake")
                }}>
                    <Text>
                        Verification
                    </Text>
                </Pressable>
            </View>
            <View style={styles.container_res}>
                <View style= {styles.view_res}>
                    <Text>
                        {vrf_res}
                    </Text>
                </View>
                
            </View>
            
        </View>

    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_btn :{
    height: "50%"
  },
  container_res: {
    height: "50%",
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  view_res: {
    width: Width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_vrf: {
    width: Width*0.5,
    height: Width*0.5,
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    marginTop: 50,
  },
});

export default Verification;