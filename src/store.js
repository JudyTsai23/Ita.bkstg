import Vue from "vue";
import Vuex from "vuex";
import AjaxService from "@/services/ajaxService.js";
Vue.use(Vuex);

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  globalLoading: false,
};

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarOpened ? false : "responsive";
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, "responsive"].includes(state.sidebarShow);
    state.sidebarShow = sidebarClosed ? true : "responsive";
  },
  set(state, [variable, value]) {
    state[variable] = value;
  },
  // 初始化餐點類別
  initMenuCategory(state, dataList) {
    state.menuCategory.init(dataList);
  },
};

const actions = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
