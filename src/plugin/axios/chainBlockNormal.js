async function chainBlockNormal(_this, option) {
  if (!option.data || !option.data.param) {
    throw new Error("lack field param");
  }
  if (!option.data || !option.method) {
    throw new Error("lack field method");
  }
  let result;
  try {
    result = await _this.chainBlockCallProvider[option.method](
      ...option.data.param,
    );
  } catch (error) {
    throw new Error(error);
  }
  return {
    status: _this.statusSuccess,
    message: result,
  };
}

export { chainBlockNormal };
