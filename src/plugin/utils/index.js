import { ethers } from "ethers";

// 解析参数
function parseRequestParams(params) {
  let paramType = [];
  let paramValue = [];
  for (let key in params) {
    let tempKey = key.split(":");
    switch (tempKey[0]) {
      case "tuple": {
        let resultTuple = recursionTuple(params[key]);
        paramType.push(resultTuple["key"]);
        paramValue.push(resultTuple["value"]);
        break;
      }
      case "tuple[]": {
        let resultArray = recursionArray(params[key]);
        paramType.push(resultArray["key"]);
        paramValue.push(resultArray["value"]);
        break;
      }
      default: {
        let currentKey = key.split(":");
        paramType.push(currentKey[0]);
        paramValue.push(params[key]);
      }
    }
  }
  return {
    paramType,
    paramValue,
  };
}

function recursionTuple(params) {
  let tupleKey = "(";
  let tupleValue = [];
  for (let key in params) {
    let tempKey = key.split(":");
    switch (tempKey[0]) {
      case "tuple": {
        let resultTuple = recursionTuple(params[key]);
        tupleKey += `${resultTuple["key"]},`;
        tupleValue.push(resultTuple["value"]);
        break;
      }
      case "tuple[]": {
        let resultArray = recursionArray(params[key]);
        tupleKey += `${resultArray["key"]},`;
        tupleValue.push(resultArray["value"]);
        break;
      }
      default: {
        let currentKey = key.split(":");
        tupleKey += `${currentKey[0]},`;
        tupleValue.push(params[key]);
      }
    }
  }
  tupleKey = tupleKey.slice(0, -1) + ")";
  return {
    key: tupleKey,
    value: tupleValue,
  };
}

function recursionArray(params) {
  let tupleKey = "";
  let tupleValue = [];
  for (let i = 0; i < params.length; i++) {
    let temp = [];
    let result = recursionTuple(params[i]);
    if (i == 0) {
      let tempKey = String(result["key"]).split(":");
      tupleKey += tempKey[0];
    }
    temp.push(result["value"]);
    tupleValue.push(temp);
  }
  tupleKey = tupleKey.slice(0, -1) + ")[]";
  return {
    key: tupleKey,
    value: tupleValue,
  };
}

// 解析返回参数
function parseResponseParams(response, returnsType) {
  let paramType = [];
  let paramValue = [];
  for (let key in returnsType) {
    let tempKey = key.split(":");
    switch (tempKey[0]) {
      case "tuple": {
        let resultTuple = recursionTuple(returnsType[key]);
        paramType.push(resultTuple["key"]);
        paramValue.push(resultTuple["value"]);
        break;
      }
      case "tuple[]": {
        let resultArray = recursionArray(returnsType[key]);
        paramType.push(resultArray["key"]);
        paramValue.push(resultArray["value"]);
        break;
      }
      default: {
        let tempKey2 = key.split(":");
        paramType.push(tempKey2[0]);
        paramValue.push(response[key]);
      }
    }
  }

  // 解析链上返回结果
  let returnData = ethers.utils.defaultAbiCoder.decode(paramType, response);
  let responseData = {};

  Object.keys(returnsType).forEach((key, index) => {
    let tempkey = key.split(":");
    switch (tempkey[0]) {
      case "tuple": {
        responseData[tempkey[1]] = recursionTupleResponse(
          returnsType[key],
          returnData[index],
        );
        break;
      }
      case "tuple[]": {
        responseData[tempkey[1]] = recursionArrayResponse(
          returnsType[key],
          returnData[index],
        );
        break;
      }
      default: {
        responseData[returnsType[key]] = returnData[index];
      }
    }
  });
  return responseData;
}

// 处理返回结果是tuple的请求
function recursionTupleResponse(params, response) {
  let obj = {};
  Object.keys(params).forEach((key, index) => {
    let tempKey = key.split(":");
    switch (tempKey[0]) {
      case "tuple": {
        let resultObj = recursionTupleResponse(params[key], response[index]);
        obj[tempKey[1]] = resultObj;
        break;
      }
      case "tuple[]": {
        let resultArrObj = recursionArrayResponse(params[key], response[index]);
        obj[tempKey[1]] = resultArrObj;
        break;
      }
      default: {
        obj[params[key]] = response[index];
      }
    }
  });
  return obj;
}

// 处理返回结果是tuple[]的请求
function recursionArrayResponse(params, response) {
  let temp = [];
  for (let i = 0; i < response.length; i++) {
    let resultObj = recursionTupleResponse(params[0], response[i]);
    temp.push(resultObj);
  }
  return temp;
}

// 组装方法于参数
function makeHex(method, paramType, param) {
  // 拼接调用合约方法和参数类型的字符串
  let methodName = method + "(";
  paramType.forEach((item, index) => {
    if (index + 1 == paramType.length) {
      methodName += item;
    } else {
      methodName += item + ",";
    }
  });
  methodName += ")";
  // 对方法进行哈希，然后截取函数选择器
  let methodHex = ethers.utils.hexDataSlice(ethers.utils.id(methodName), 0, 4);
  // 对参数进行编码
  let paramHex = ethers.utils.defaultAbiCoder.encode(paramType, param);
  // 拼接函数选择器和参数编码的十六进制字符串
  return ethers.utils.hexConcat([methodHex, paramHex]);
}

export { parseRequestParams, parseResponseParams, makeHex };
