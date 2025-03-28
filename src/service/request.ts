import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosHeaders,
} from "axios";

// 创建一个 AbortController 的全局存储
const abortControllerMap = new Map<string, AbortController>();

// 创建 axios 实例
const instance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 全局参数：暂时为所有的接口都添加language参数
    const commonParams = {
      lang: localStorage.getItem("i18nextLng") || "en",
    };
    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...commonParams,
        ...config.params,
      }
    } else {
      // POST/PUT/DELETE 请求，将参数添加到data中
      if (config.data) {
        // 如果 data 是FormData，则需进行特殊处理
        if (config.data instanceof FormData) {
          for(const [key, value] of Object.entries(commonParams)) {
            config.data.append(key, value);
          }
        } else {
          // 普通的 JSON 数据
          config.data = {
            ...commonParams,
            ...(typeof config.data === 'string' ? JSON.parse(config.data) : config.data)
          };
        }
      } else {
        // 如果没有 data，则创建一个空对象
        config.data = commonParams;
      }
    }

    // 生成请求唯一标识
    const requestKey = `${config.url}-${config.method}`;

    // 如果已经存在 AbortController，则取消之前的请求
    if (abortControllerMap.has(requestKey)) {
      abortControllerMap.get(requestKey)?.abort();
    }

    // 创建新的 AbortController 实例并存储
    const abortController = new AbortController();
    abortControllerMap.set(requestKey, abortController);

    // 将 signal 添加到请求配置中
    config.signal = abortController.signal;

    // 例如：添加 Authorization 头信息
    const token = localStorage.getItem("token");
    if (token) {
      // Ensure headers is initialized as an object of type AxiosHeaders
      config.headers = config.headers || new AxiosHeaders();
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log("Request:", config, config.params, config.data);
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 请求成功后，移除对应的 AbortController
    const requestKey = `${response.config.url}-${response.config.method}`;
    abortControllerMap.delete(requestKey);

    // 对响应数据做点什么
    return response;
  },
  (error: AxiosError) => {
    // 请求失败后，移除对应的 AbortController
    if (error.config) {
      const requestKey = `${error.config.url}-${error.config.method}`;
      abortControllerMap.delete(requestKey);
    }

    // 对响应错误做点什么
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 错误处理
          console.log("Unauthorized: ", error.response.data);
          break;
        case 403:
          // 403 错误处理
          console.log("Forbidden: ", error.response.data);
          break;
        case 404:
          // 404 错误处理
          console.log("Not Found: ", error.response.data);
          break;
        default:
          console.log("Error: ", error.response.status, error.response.data);
          break;
      }
    } else {
      console.error("Error: ", error.message);
    }

    return Promise.reject(error);
  }
);

// 封装 request 函数
export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await instance(config);
    return response.data;
  } catch (error) {
    console.error("Request Error: ", error);
    throw error; // 抛出错误，由调用处处理
  }
};

export default instance;
