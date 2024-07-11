class Interceptor {
  constructor() {
    this.list = [];
  }

  use(interceptor) {
    this.list.push(interceptor);
  }

  getInterceptors() {
    return this.list;
  }
}

export default Interceptor;
