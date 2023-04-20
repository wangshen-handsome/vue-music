import axios,{type AxiosRequestConfig} from 'axios'
import qs from 'querystring'

axios.defaults.baseURL = '/api'
// axios.defaults.baseURL = localStorage.getItem('BASE_URL')?.toString();
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true

axios.interceptors.request.use(
    (config: AxiosRequestConfig | any) => {

        config.params = {
            ...config.params,
            t: Date.now(),
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
/* 
  二次封装get方法
  url：指调取的接口地址
  params：数据参数对象
*/
const get = (url:string, params = {}) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          resolve(err.data);
        });
    });
  };
  
  /* 
      二次封装post方法
      url：指调取的接口地址
      params：数据参数对象
      isFile：是否有上传文件，默认不上传文件
    */
const post = (url:string, params:any = {}, isFile:boolean = false) => {
    let data:any;
    if (isFile) {
      // 有文件上传
      data = new FormData();
      for (let attr in params) {
        data.append(attr, params[attr]);
      }
    } else {
      // 没有文件上传，则把数据拼成查询字符串
      data = qs.stringify(params);
    }
  
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          resolve(err.data);
        });
    });
  };

  export default {
    get,
    post
  }