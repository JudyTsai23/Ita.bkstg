import Vue from "vue";
import Vuex from "vuex";
import MenuCategory from "@/classes/MenuCategory";
import AjaxService from "@/services/ajaxService.js";
Vue.use(Vuex);

const state = {
  sidebarShow: "responsive",
  sidebarMinimize: false,
  globalLoading: false,
  menuCategory: null,
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
    state.menuCategory = new MenuCategory(dataList);
  },
};

const actions = {
  queryMenuCategory(context) {
    if (!context.menuCategory) {
      new Promise((resolve, reject) => {
        AjaxService.get(
          "/server/mealCate/cate",
          (successResp) => {
            if (successResp.restData) {
              resolve(successResp.restData);
              console.log("查詢所有餐點類別成功");
            }
          },
          (errorResp) => {
            reject(errorResp);
            console.log("查詢所有餐點類別失敗");
          }
        );
      })
        .then((category) => {
          return new Promise((resolve, reject) => {
            AjaxService.get(
              "/server/mealCate/sub",
              (successResp) => {
                if (successResp.restData) {
                  let subCategory = successResp.restData;
                  context.commit("initMenuCategory", [category, subCategory]);
                  console.log("查詢所有餐點子類別成功");
                }
              },
              (errorResp) => {
                reject(errorResp);
                console.log("查詢所有餐點子類別失敗");
              }
            );
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
