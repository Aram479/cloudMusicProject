import ZPRequest from "./request/https";
import { BASE_URL, TIME_OUT } from "./request/config";
//创建接口实例
const zpRequest = new ZPRequest({
  baseURL: BASE_URL, //默认地址
  timeout: TIME_OUT, //默认请求时间
  interceptors: {
    requestInterceptor: (config) => {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});
export default zpRequest;
