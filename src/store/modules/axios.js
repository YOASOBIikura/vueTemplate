import { defineStore } from "pinia";
import { BigNumber, ethers } from "ethers";
import Axios from "@/plugin/axios/axios.js";
import { polygon } from "@/config/chainBlock/polygon.js";
import { arbitrum } from "@/config/chainBlock/arbitrum.js";
import {
  handleMethod,
  handleMode,
  isConnect,
} from "@/plugin/interceptor/requestInterceptor.js";
import { handleError } from "@/plugin/interceptor/responseInterceptor.js";

export const useAxiosStore = defineStore("axios", {
  state: () => ({
    axios: null,
    chainId: -1,
    currentAccount: ethers.constants.AddressZero,
    isConnect: 1, // 是否连接钱包 1完成未链接 2只有在交易时才链接 3完全链接
    currentContractData: {}, //存储钱包中所链接网络的项目合约
    bundleUrl: "", //存储链接网络的bundlerUrl
    currentProvider: null, //当前钱包的provider
    currentTokens: [], // 当前tokenList
    remark: {}, // 辅助额外信息
    optionBusiness: {}, //
    chainInfo: {}, // 当前链信息
    // 触发钱包相关事件
    isWalletChange: 1,
    vaultSalt: BigNumber.from("1"), // vault的默认下标
    requestToken: ""
  }),
  getters: {},
  actions: {
    // 第一次初始化
    initAxios(chainBlockCallProvider, chainBlockSendProvider, wallet) {
      this.axios = new Axios({
        httpUrl: import.meta.env.VITE_APP_API_URL,
        chainBlockCallProvider: chainBlockCallProvider,
        chainBlockSendProvider: chainBlockSendProvider,
        safeBlock: 6,
        loop: 5, // 循环请求次数
        headers: {
          "Content-Type": "application/json",
        },
        wallet: wallet,
      });
      // 调用设置拦截器
      setInterceptors(this.axios);
    },
    initProvider(chainBlockCallProvider, chainBlockSendProvider, wallet) {
      this.axios.currentProvider = chainBlockCallProvider;
      this.axios.chainBlockSendProvider = chainBlockSendProvider;
      this.axios.wallet = wallet;
    },
    setChainId(chainId) {
      this.chainId = chainId;
      switch (Number(chainId)) {
        case 137: {
          this.currentContractData = polygon.contractData;
          this.bundlerUrl = import.meta.env.VITE_POLYGAN_BUNDLER_URL;
          this.currentTokens = polygon.tokens;
          this.remark = polygon.remark;
          this.optionBusiness = polygon.optionBusiness;
          this.chainInfo = polygon.chainInfo;
          this.axios.safeBlock = polygon.remark.safeBlock;
          this.axios.loop = polygon.remark.loop;
          break;
        }
        case 42161: {
          this.currentContractData = arbitrum.contractData;
          this.bundlerUrl = import.meta.env.VITE_ARBITRUM_BUNDLER_URL;
          this.currentTokens = arbitrum.tokens;
          this.remark = arbitrum.remark;
          this.optionBusiness = arbitrum.optionBusiness;
          this.chainInfo = arbitrum.chainInfo;
          this.axios.safeBlock = arbitrum.remark.safeBlock;
          this.axios.loop = arbitrum.remark.loop;
          break;
        }
      }
    },
    setCurrentAccount(newAccount) {
      this.currentAccount = newAccount;
    },
    setIsConnect(isConnect) {
      this.isConnect = isConnect;
    },
    setCurrentProvider(provider) {
      this.currentProvider = provider;
    },
    setIsWalletChange(newVal) {
      this.isWalletChange += newVal;
    },
    setRequestToken(){
      let token = localStorage.getItem("Auth")
      if (token){
        this.requestToken = "Bearer%20" + token
        this.axios.headers["Authorization"] = decodeURIComponent(this.requestToken)
      }
    },
    // 业务辅助
    getTokenByName(name) {
      let token = {};
      this.currentTokens.forEach((item) => {
        if (item.name == name) {
          token = item;
        }
      });
      return token;
    },
    getTokenByAddress(address) {
      let token = {};
      this.currentTokens.forEach((item) => {
        if (
          String(item.address).toLocaleLowerCase() ==
          String(address).toLocaleLowerCase()
        ) {
          token = item;
        }
      });
      return token;
    },
  },
});

// 设值拦截器
function setInterceptors(axios) {
  addRequestInterceptor(axios);
  addResponseInterceptor(axios);
}

function addRequestInterceptor(axios) {
  // 判断钱包是否登录
  axios.interceptors.request.use(isConnect);

  // 拦截区块链信息
  axios.interceptors.request.use(handleMode);

  // 拦截http请求信息
  axios.interceptors.request.use(handleMethod);
}

function addResponseInterceptor(axios) {
  // 拦截响应信息
  axios.interceptors.response.use(handleError);
}
