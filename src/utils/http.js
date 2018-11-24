import axios from 'axios'
import API from '../api'

//封装请求的配置参数便于复用
export default function http({url,method,data}){
    let options = {
        url: url,
        method: method,
        baseURL:API.HOST,
        timeout: 2000
    }
    if(options.method == 'POST'){
        options.data = data;
    }else if(options.method == 'GET'){
        options.params = data;
    }
    return axios(options);
}