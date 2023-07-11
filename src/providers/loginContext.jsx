import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = React.createContext({});

export const LoginProvider = (props) => {
    const [user, setUser] = useState({})
    

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}