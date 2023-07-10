import axios from "axios";

const BASE_URL =`${import.meta.env.VITE_API_URL}`

function login(body){
    const promise = axios.post(BASE_URL+'/login',body)
    return promise
}

function cadastro(body){
    const promise = axios.post(BASE_URL+'/cadastro',body)
    return promise
}
const Apiperfil = {cadastro,login}
export default Apiperfil