import { defineStore } from "pinia";

export const useRouteStore = defineStore("route", {
  state: () => ({
    // 之前页面的路由
    preRoute: null,
    // 之前页面的路由参数
    preQuery: null,
    // 当前页面的路由
    currentRoute: null,
    // 是否需要显示header、footer的判定标记
    showLayout: true,
    changeRoute: "/",
  }),
  getters: {},
  actions: {
    setCurrentRoute(preRoute, currentRoute) {
      this.currentRoute = currentRoute.path;
      // 设值判定标记
      this.showLayout = !!(currentRoute.meta && currentRoute.meta.showLayout);
      // 缓存历史路由
      if (preRoute.path != "/") {
        this.preRoute = preRoute.path;
        this.preQuery = preRoute.query;
        localStorage.setItem("preRoute", this.preRoute);
        localStorage.setItem("preQuery", this.preQuery);
      } else {
        this.preRoute = localStorage.getItem("preRoute");
        this.preQuery = localStorage.getItem("preQuery");
      }
    },
    setChangeRoute(changeRoute) {
      this.changeRoute = changeRoute;
    },
  },
});
