import React, { useEffect, useState } from "react";

export const LoginContext = React.createContext({});

export const LoginProvider = (props) => {
    const [user, setUser] = useState({})
    

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}