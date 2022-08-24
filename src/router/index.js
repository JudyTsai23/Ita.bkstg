import Vue from "vue";
import Router from "vue-router";

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

Vue.use(Router);

export default new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/dashboard",
      name: "首頁",
      component: () => import("@/containers/TheContainer"),
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: () => import("@/views/Dashboard"),
        },
      ],
    },
    {
      path: "/mngt",
      redirect: "/meal",
      name: "內容管理",
      component: () => import("@/containers/TheContainer"),
      children: [
        {
          path: "meal",
          name: "餐點管理",
          component: () => import("@/views/Management/Meal/Meal.vue"),
        },
        {
          path: "meal/create",
          name: "餐點-新增",
          component: () => import("@/views/Management/Meal/MealEdit.vue"),
        },
        {
          path: "meal/edit/:id",
          name: "餐點-修改",
          component: () => import("@/views/Management/Meal/MealEdit.vue"),
        },
        {
          path: "meal/cate",
          name: "餐點類別管理",
          component: () => import("@/views/Management/MealCategory/MealCategory.vue"),
        },
        {
          path: "meal/cate/create",
          name: "餐點類別-新增",
          component: () => import("@/views/Management/MealCategory/MealCateEdit.vue"),
        },
        {
          path: "meal/cate/edit/:id",
          name: "餐點類別-修改",
          component: () => import("@/views/Management/MealCategory/MealCateEdit.vue"),
        },
        {
          path: "news",
          name: "訊息管理",
          component: () => import("@/views/Management/News/News.vue"),
        },
      ],
    },
    {
      path: "/st",
      redirect: "/basic",
      name: "設定",
      component: () => import("@/containers/TheContainer"),
      children: [
        {
          path: "basic",
          name: "基本設定",
          component: () => import("@/views/Settings/Basic/Basic.vue"),
        },
      ],
    },
    {
      path: "/anly",
      redirect: "/feedback",
      name: "圖表分析",
      component: () => import("@/containers/TheContainer"),
      children: [
        {
          path: "feedback",
          name: "回饋分析",
          component: () => import("@/views/Analysis/Feedback/Feedback.vue"),
        },
      ],
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render(c) {
          return c("router-view");
        },
      },
      children: [
        {
          path: "colors",
          name: "Color Reference",
          component: () => import("@/containers/TheContainer"),
          children: [
            {
              path: "",
              component: () => import("@/views/pages/Color.vue"),
            },
          ],
        },
        {
          path: "404",
          name: "Page404",
          component: Page404,
        },
        {
          path: "500",
          name: "Page500",
          component: Page500,
        },
        {
          path: "login",
          name: "Login",
          component: Login,
        },
        {
          path: "register",
          name: "Register",
          component: Register,
        },
      ],
    },
  ];
}
