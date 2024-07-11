import { useAxiosStore } from "@/store/modules/axios.js";
import { useWeb3ModalState } from "@web3modal/ethers5/vue";

//睡眠阻塞器
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function isConnect(axios, option) {
  let axiosStore = useAxiosStore();
  if (
    option.mode == "chainBlockSend" ||
    option.mode == "sign" ||
    option.mode == "sign712" ||
    option.mode == "unSign" ||
    option.mode == "switchChain" ||
    option.mode == "bundler"
  ) {
    if (
      !axiosStore.chainBlockCallProvider ||
      !axiosStore.chainBlockSendProvider ||
      axiosStore.isConnect != 3
    ) {
      while (axiosStore.isConnect != 3 && !axiosStore.currentProvider) {
        // 链接钱包
        var { open } = useWeb3ModalState();
        open({ view: "Networks" });
      }
      // 每2.5秒检测一下是否登录
      await sleep(2500);
    }
  }
  return true;
}

async function handleMode(axios, option) {
  // 兼容各条链的适配
  if (option.mode == "chainBlockCall" || option.mode == "chainBlockSend") {
    let axiosStore = useAxiosStore();
    // 修改target
    let target = option.target;
    let contractName = String(target).split("@")[1];

    if (contractName) {
      option.target = axiosStore.currentContractData[contractName];
    }
    // 修改在multiCall情况下 contracts字段
    if (option.method && option.method == "multiCall") {
      let contracts = option.data.contracts;
      for (let i = 0; i < contracts.length; i++) {
        let contractsKey = String(contracts[i]).split("@")[1];
        if (contractsKey) {
          contracts[i] = axiosStore.currentContractData[contractsKey];
        }
      }
    }
  }
  return true;
}

async function handleMethod(axios, option) {
  let axiosStore = useAxiosStore();
  axiosStore.setRequestToken();
  if (option.mode == "http" && option.httpUrl == "bundler") {
    option.httpUrl = axiosStore.bundleUrl;
  }
  return true;
}

export { isConnect, handleMode, handleMethod };
