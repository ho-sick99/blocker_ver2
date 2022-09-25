import { createContext } from "react";
import Login from "../screens/Login";

// 로그인을 관리할 Context 
const LoginContext = createContext({
    login_data : {
        id: 'Not login',
        name: 'Not login test',
        login_state: 0, 
    },
    set_login_data: () => {}
})

export default LoginContext;