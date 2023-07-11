import axios from "axios";

const BASE_URL =`${import.meta.env.VITE_API_URL}`

function transacao(body,config){
    const promise = axios.post(BASE_URL+'/transacao',body, config)
    return promise
}

export default transacao