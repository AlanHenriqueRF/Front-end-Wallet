import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginContext = React.createContext({});

export const LoginProvider = (props) => {
    const lsUser = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState(lsUser !== null ? lsUser:{})
    const Navigate = useNavigate()

    useEffect(()=>{
        if (!lsUser){
            Navigate('/')
        } else{
            Navigate('/home')
        }
    },[])

    return (
        <LoginContext.Provider value={{ user, setUser }}>
            {props.children}
        </LoginContext.Provider>
    )
}