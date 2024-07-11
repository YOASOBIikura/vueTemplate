// 基于fetch版本的http请求
async function httpRequest(_this, option) {
  // 初始化各个请求参数
  let url = "";
  let request_method = "";
  let request_headers = new Headers();
  let request_body = null;
  let response = null;
  // 基础条件判断
  if (!option.method) {
    throw new Error("lack field method!");
  }
  if (!option.target) {
    //判断是否传入请求API url
    throw new Error("lack field target!");
  }

  // 请求前处理请求url
  if (option.httpUrl) {
    url = `${option.httpUrl}${option.target}`;
  } else {
    url = `${_this.httpUrl}${option.target}`;
  }

  // 处理请求方法
  if (option.method == "get" || option.method == "delete") {
    let data = handleParams(option.data);
    if (data && data != "") {
      url = `${url}?${data}`;
    }
    request_method = option.method.toUpperCase();
  } else if (option.method == "post" || option.method == "put") {
    request_body = JSON.stringify(option.data);
    request_method = option.method.toUpperCase();
  } else {
    throw new Error("method error!");
  }

  // 处理请求头
  for (let key in option.headers) {
    if (option.method == "get" || option.method == "delete") {
      // 避免Authorization验证被转义
      if (key.toString() != "Authorization") {
        request_headers.append(
          encodeURIComponent(key),
          encodeURIComponent(option.headers[key]),
        );
      } else {
        request_headers.append(key, option.headers[key]);
      }
    } else {
      request_headers.append(key, option.headers[key]);
    }
  }

  // 发送请求
  try {
    response = await fetch(url, {
      method: request_method,
      headers: request_headers,
      body: request_body,
    });
  } catch (error) {
    // 处理网络错误的情况
    throw new Error(error);
  }

  // 兼容处理
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.json());
    } else {
      // 处理请求错误请况
      reject(new Error("http request failed!"));
    }
  });
}

function handleParams(param) {
  let data = "";
  // 拼接请求url参数
  for (let key in param) {
    data += `${key}=${param[key]}&`;
  }
  return data.substring(0, data.length - 1);
}

export { httpRequest };
