import axios from "axios";

const BASE_URL =`${import.meta.env.VITE_API_URL}`

function posttransacao(body,config){
    const promise = axios.post(BASE_URL+'/transacao',body, config)
    return promise
}
function gettransacao(config){
    const promise = axios.get(BASE_URL+'/transacao',config)
    return promise 
}

const Apitransacao = {posttransacao,gettransacao}
export default Apitransacao