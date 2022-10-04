import React, { useState } from "react";

const LoginProvider = ({children}) => {
    const set_login_data = (input_id, input_name, state) => {
            set_data(prevState => {
              return {
                ...prevState,
                login_data: {
                    id: input_id,
                    name: input_name,
                    login_state: state
                }
              };
            });
          };
        
    const initialState = {
        login_data : {
            id: 'Not login',
            name: 'Not login test',
            login_state: 0
        },
        set_login_data
    };
    const [login_data, set_data] = useState(initialState);
        
    return (  
        <LoginContext.Provider value={login_data}>
            {children}
        </LoginContext.Provider>
    );
};
        
 export default LoginProvider;