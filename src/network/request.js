//引用axios
import axios from "axios";

export function request(config) {
  //1.声明一个axios实例
  const axiosInstance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //2.axios的请求拦截器
  axiosInstance.interceptors.request.use(config => {
    return config; //必须返回，否则不会进行下一步
  }, error => {
    console.log(error);
  })
  //3.2axios的请求拦截器
  axiosInstance.interceptors.response.use(res => {
    return res.data;
  }, error => {
    console.log(error);
  })
  //返回axiosInstance实例
  return axiosInstance(config);

}



