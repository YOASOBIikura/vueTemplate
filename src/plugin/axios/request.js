import { chainBlockNormal } from "@/plugin/axios/chainBlockNormal.js";
import { httpRequest } from "@/plugin/axios/httpRequest.js";
import { chainBlockCallRequest } from "@/plugin/axios/chainBlockCallRequest.js";
import { chainBlockSendRequest } from "@/plugin/axios/chainBlockSendRequest.js";
import { sign, signEIP712, unSign } from "@/plugin/axios/signRequest.js";

class Requester {
  constructor(axios) {
    this.axios = axios;
    this.response = null;
  }

  // 请求分流方法
  async request(option) {
    // 清空response
    this.response = null;
    if (!option.mode) {
      throw new Error("mode is required");
    }
    // 请求分流
    switch (option.mode) {
      case "chainBlockNormal": {
        this.response = await chainBlockNormal(this.axios, option);
        break;
      }
      case "http": {
        this.response = await httpRequest(this.axios, option);
        break;
      }
      case "chainBlockCall": {
        this.response = await chainBlockCallRequest(this.axios, option);
        break;
      }
      case "chainBlockSend": {
        this.response = await chainBlockSendRequest(this.axios, option);
        break;
      }
      case "sign": {
        this.response = await sign(this.axios, option);
        break;
      }
      case "sign712": {
        this.response = await signEIP712(this.axios, option);
        break;
      }
      case "unSign": {
        this.response = await unSign(this.axios, option);
        break;
      }
      default: {
        throw new Error("request mode is not support");
      }
    }
    return this.response;
  }
}

export default Requester;
