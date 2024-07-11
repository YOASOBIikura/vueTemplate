import { makeHex, parseRequestParams } from "@/plugin/utils/index.js";
import { ethers, BigNumber } from "ethers";

async function chainBlockSendRequest(_this, option) {
  if ((!option.data || !option.data.param) && !option.data.value) {
    throw new Error("lack field param");
  }
  if (!option.method && !option.data.value) {
    throw new Error("lack field method");
  }

  // 复制请求
  let args = JSON.parse(JSON.stringify(option.data));
  let request = parseRequestParams(args.param);
  let receipt = await sendContractTransaction(
    _this,
    option,
    request.paramType,
    request.paramValue,
  );
  switch (receipt.txStatus) {
    case 1:
      return {
        status: _this.statusSuccess,
        txStatus: "success",
        message: receipt.hash,
      };
    case 2:
      return {
        status: _this.statusFail,
        txStatus: "fail",
        hash: receipt.hash,
      };
    case 3:
      return {
        status: _this.statusFail,
        txStatus: "error",
        hash: receipt.message,
      };
  }
}

// 发送交易
async function sendContractTransaction(_this, option, paramType, paramValue) {
  if (!option.target) {
    throw new Error("lack field target");
  }
  let dataHex = "0x";
  // 如果method有值，则调用合约处理合约数据
  if (option.method != "" && option.method) {
    dataHex = makeHex(option.method, paramType, paramValue);
  }
  let tx = {
    from: _this.wallet,
    to: option.target,
    data: dataHex,
    value: option.data.value ? option.data.value.toHexString() : 0,
  };
  // 判断是否预估gas
  if (option.estimateGas) {
    let estimateGas = await estimateGasTx(_this, tx);
    tx["gasLimit"] = estimateGas.toString();
  }
  let hash;
  try {
    let provider = new ethers.provides.Web3Provider(
      _this.chainBlockSendProvider,
    );
    let result = await provider.getSigner().sendTransaction(tx);
    hash = result.hash;
  } catch (error) {
    return {
      txStatus: 3,
      message: error,
    };
  }
  console.log("<Transaction Hash>", hash);
  let receipt = await _this.chainBlockSendProvider.waitForTransaction(
    hash,
    option.data.safeBlock,
  );
  if (receipt.status == 1) {
    return {
      txStatus: 1,
      hash: hash,
    };
  } else {
    return {
      txStatus: 2,
      hash: hash,
    };
  }
}

// 预估交易消耗gas
async function estimateGasTx(_this, tx) {
  // 初始化provider
  let provider = new ethers.providers.Web3Provider(
    _this.chainBlockSendProvider,
  );
  // 获取执行该交易所需的Gas总量
  let result = await provider.estimateGas(tx);
  // gas * 15 / 10 (?) ==> gas * 1.5 变相将预估的gas增加1.5倍
  result = result.mul(BigNumber.from("15")).div(BigNumber.from("10"));
  console.log("estimateGasTx", result);
  return result;
}

export { chainBlockSendRequest };
