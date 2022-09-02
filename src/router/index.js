import Vue from "vue";
import Router from "vue-router";

// Views - Pages
const Page404 = () => import("@/views/pages/Page404");
const Page500 = () => import("@/views/pages/Page500");
const Login = () => import("@/views/pages/Login");
const Register = () => import("@/views/pages/Register");

Vue.use(Router);

const router = new Router({
  mode: "history", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

router.beforeEach((to, from, next) => {
  let isLogin = sessionStorage.getItem("il");
  if ((!isLogin || isLogin === null || isLogin === "null") && to.path !== "/login") {
    // 尚未登入則跳轉至登入頁面
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;

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
      path: "/login",
      name: "登入",
      component: () => import("@/views/Login/Login.vue"),
    },
    {
      path: "/mngt",
      redirect: "/mngt/meal",
      name: "內容管理",
      component: () => import("@/containers/TheContainer"),
      children: [
        {
          path: "meal",
          redirect: "meal", //因為有命名這個父路由，所以點擊breadcrumb時，會導向沒有顯示嵌套路由的這個父路由，因此要redirect重新進入meal頁面
          name: "餐點管理",
          component: {
            //等於直接createElement 產生"router-view"標籤，也就等於" template: `<router-view></router-view>` "
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "", //空的嵌套路由 表示當父路由匹配成功時就會顯示這裡的內容
              // name: "餐點列表", //不想在breadcrumb中出現，所以不命名此路由
              component: () => import("@/views/Management/Meal/Meal.vue"),
            },
            {
              path: "create",
              name: "新增餐點",
              component: () => import("@/views/Management/Meal/MealEdit.vue"),
            },
            {
              path: "edit/:id",
              name: "修改餐點",
              component: () => import("@/views/Management/Meal/MealEdit.vue"),
            },
          ],
        },
        {
          path: "meal/cate",
          redirect: "meal/cate",
          name: "餐點類別管理",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              // name: "餐點類別列表",
              component: () => import("@/views/Management/MealCategory/MealCategory.vue"),
            },
            {
              path: "create",
              name: "新增餐點類別",
              component: () => import("@/views/Management/MealCategory/MealCateEdit.vue"),
            },
            {
              path: "edit/:id",
              name: "修改餐點類別",
              component: () => import("@/views/Management/MealCategory/MealCateEdit.vue"),
            },
          ],
        },
        {
          path: "news",
          redirect: "news",
          name: "訊息管理",
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              // name: "訊息列表",
              component: () => import("@/views/Management/News/News.vue"),
            },
            {
              path: "create",
              name: "新增訊息",
              component: () => import("@/views/Management/News/NewsEdit.vue"),
            },
            {
              path: "edit/:id",
              name: "修改訊息",
              component: () => import("@/views/Management/News/NewsEdit.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/st",
      redirect: "/st/basic",
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
      redirect: "/anly/feedback",
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
