// 查询链上请求
import {
  makeHex,
  parseRequestParams,
  parseResponseParams,
} from "@/plugin/utils/index.js";

async function chainBlockCallRequest(_this, option) {
  if (!option.data || !option.data.param) {
    throw new Error("lack field param");
  }
  if (!option.data || !option.data.returnsType) {
    throw new Error("lack field returnsType");
  }
  if (!option.method) {
    throw new Error("lack field method");
  }
  if (!option.target) {
    throw new Error("lack field target");
  }
  // 判断是否是multicall的情况
  if (option.method == "multicall") {
    return multiCall(_this, option);
  }
  // 复制一份请求信息
  let args = JSON.parse(JSON.stringify(option.data));
  let request = parseRequestParams(args.param);
  let responseHex = await callContract(
    _this,
    option,
    request.paramType,
    request.paramValue,
  );
  let response = parseResponseParams(responseHex, args.returnsType);
  return { status: _this.statusSuccess, message: response };
}

// 真正的上链请求
async function callContract(_this, option, paramType, param) {
  let dataHex = makeHex(option.method, paramType, param);
  return _this.chaninBlockCallProvider.call({
    to: option.target,
    data: dataHex,
  });
}

// multicall 多查询
async function multiCall(_this, option) {
  if (!option.data || !option.data.contracts) {
    throw new Error("lack field contracts");
  }
  if (!Array.isArray(option.data.contracts)) {
    throw new Error("field contracts must be array");
  }
  if (!Array.isArray(option.data.param)) {
    throw new Error("field param must be array");
  }
  if (!Array.isArray(option.data.returnsType)) {
    throw new Error("field returnsType must be array");
  }
  let param = {};
  let hexList = [];
  param["address[]"] = option.data.contracts;
  for (let i = 0; i < option.data.length; i++) {
    let dataHex = "";
    if (option.data.parseMode) {
      if (!option.data.param[i].param) {
        throw new Error("lack field param");
      }
      if (!option.data.param[i].func) {
        throw new Error("lack field func");
      }
      let request = parseRequestParams(option.data.param[i].param);
      dataHex = makeHex(
        option.data.param[i].func,
        request.paramType,
        request.paramValue,
      );
    } else {
      dataHex = option.data.param[i];
    }

    hexList.push(dataHex);
  }
  param["bytes[]"] = hexList;

  //正式解析上链请求
  let request2 = parseRequestParams(param);
  let realParam = makeHex(
    option.method,
    request2.paramType,
    request2.paramValue,
  );
  let result = await _this.chainBlockCallProvider.call({
    to: option.target,
    data: realParam,
  });
  let returnsType = { "bytes[]": "multResult" };
  let response = parseResponseParams(result, returnsType);
  let responseList = [];
  for (let i = 0; i < option.data.returnsType.length; i++) {
    let realResponse = parseResponseParams(
      response.multResult[i],
      option.data.returnsType[i],
    );
    responseList.push(realResponse);
  }
  return { status: _this.statusSuccess, message: responseList };
}

export { chainBlockCallRequest };
