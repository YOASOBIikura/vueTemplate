function handleError(response, option, axios) {
  // 错误拦截
  if (response.status == axios.statusFail) {
    console.log("错误拦截", response);
  }
  return response;
}

export { handleError };
