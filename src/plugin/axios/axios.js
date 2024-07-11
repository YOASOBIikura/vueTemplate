/**
 Axios({
 mode:"chainBlockCall", //chainBlockCall  http  chainBlockSend  sign  unSign
 target:"" ,// chainBlock 时是合约地址   http时是url
 headers:{

 },//请求头
 loop:5,//填5 尝试5次   infinite 无限
 method:"get" //请求方式  http时 填get   rpc 填方法
 data:{  //http请求
 param:{}
 },
 data2:{  //rpc请求
 safeBlock:5,//安全块
 param:[to,value],
 paramType:["address","uint256"],
 returnsType:["bool"]
 }
 data3:{
 safeBlock:5,//安全块
 paramType:["address","uint256"],
 returnsType:{
 name:"bool",
 job:"string"
 }
 }
 })
 */
import Interceptor from "@/plugin/axios/Interceptor.js";
import Requester from "@/plugin/axios/request.js";

class Axios {
  constructor(config) {
    this.wallet = config.wallet || "";
    this.httpUrl = config.httpUrl; // 管http
    this.chainBlockCallProvider = config.chainBlockCallProvider; //管查询
    this.chainBlockSendProvider = config.chainBlockSendProvider; //钱包provider
    this.safeBlock = config.safeBlock || 5;
    this.loop = config.loop || 0;
    this.headers = {};
    this.statusSuccess = true;
    this.statusFail = false;
    this.delayTime = 500;
    this.interceptors = {
      request: new Interceptor(),
      response: new Interceptor(),
    };
    this.requester = new Requester(this);

    // 初始化请求头
    for (let k in config.headers) {
      this.headers[k] = config.headers[k];
    }
    let axios = this;
    this.proxy = new Proxy(this.requester?.request, {
      /**
       * 当使用Axios() 拦截此函数
       * */
      apply(target, thisArgs, args) {
        return axios.request(...args);
      },
      get(target, key) {
        // 需要返回Axios本身的属性
        return axios[key];
      },
      set(target, key, val) {
        // 需要设置的值全部设置到Axios本身这个对象上
        axios[key] = val;
        return true;
      },
    });
    return this.proxy;
  }

  // 睡眠阻塞器
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async request(option) {
    option.internalData = {
      request: "",
      currentLoop: 0,
    };
    // 请求拦截器
    let list = this.interceptors.request.list;
    for (let i = 0; i < list.length; i++) {
      let interceptorResult = await list[i](this, option);
      if (typeof interceptorResult == "boolean" && interceptorResult) {
        continue;
      }
      if (!interceptorResult.status) {
        return new Promise((resolve) => {
          resolve(interceptorResult);
        });
      }
    }
    // 处理请求头
    for (let k in this.headers) {
      if (!option.headers) {
        option.headers = {};
      }
      if (!option.headers[k]) {
        option.headers[k] = this.headers[k];
      }
    }

    // 处理循环请求次数
    if (!option.loop) {
      option.loop = option.loop > this.loop ? option.loop : this.loop;
    }

    // 处理安全块
    if (option.data && option.mode == "chainBlockSend") {
      if (!option.data.safeBlock || this.safeBlock > option.data.safeBlock) {
        option.data.safeBlock = this.safeBlock;
      }
    }
    return this.handleRequest(option);
  }

  handleRequest(option) {
    return new Promise((resolve) => {
      // 循环请求，并存储resolve返回方法
      if (option.internalData.currentLoop == 0) {
        option.internalData.request = resolve;
      }
      option.internalData.currentLoop += 1;
      if (
        (option.mode == "chainBlockCall" ||
          option.mode == "http" ||
          option.mode == "chainBlockNormal") &&
        option.loop != 0 &&
        option.internalData.currentLoop > option.loop &&
        option.loop != "infinite"
      ) {
        console.error("request fail", option);
        throw new Error("request fail");
      }
      this.requester.request(option).then(
        (response) => {
          // 获取响应拦截器
          let list = this.interceptors.response.list;
          list.forEach((fn) => {
            response = fn(response, option, this);
          });
          option.internalData.request(response);
        },
        async (error) => {
          if (String(error).includes("lack field")) {
            console.error(error, option);
            return;
          }
          if (
            option.mode == "chainBlockCall" ||
            option.mode == "http" ||
            option.mode == "chainBlockNormal"
          ) {
            if (option.loop > 0) {
              // 每间隔0.5s再请求
              await this.sleep(this.delayTime);
              await this.handleRequest(option);
            }
          } else {
            console.error(error, option);
          }
        },
      );
    });
  }
}

export default Axios;
