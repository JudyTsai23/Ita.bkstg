export default [
  {
    _name: "CSidebarNav",
    _children: [
      // {
      //   _name: "CSidebarNavItem",
      //   name: "Dashboard",
      //   to: "/dashboard",
      //   icon: "cil-speedometer",
      //   badge: {
      //     color: "primary",
      //     text: "NEW",
      //   },
      // },
      {
        _name: "CSidebarNavTitle",
        _children: ["內容管理"],
      },
      // {
      //   _name: "CSidebarNavDropdown",
      //   name: "Base",
      //   route: "/base",
      //   icon: "cil-puzzle",
      //   items: [
      //     {
      //       name: "Breadcrumbs",
      //       to: "/base/breadcrumbs",
      //     },
      //   ],
      // },
      {
        _name: "CSidebarNavItem",
        name: "餐點管理",
        to: "/mngt/meal",
        icon: "cilRestaurant",
      },
      {
        _name: "CSidebarNavItem",
        name: "餐點類別管理",
        to: "/mngt/meal/cate",
        icon: "cilListNumbered",
      },
      {
        _name: "CSidebarNavItem",
        name: "訊息管理",
        to: "/mngt/news",
        icon: "cilBullhorn",
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["設定"],
      },
      {
        _name: "CSidebarNavItem",
        name: "基本設定",
        to: "/st/basic",
        icon: "cilLeaf",
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["圖表分析"],
      },
      {
        _name: "CSidebarNavItem",
        name: "回饋分析",
        to: "/anly/feedback",
        icon: "cil-chart-pie",
      },
      {
        _name: "CSidebarNavDivider",
        _class: "m-2",
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["測試參考用"],
      },
      {
        _name: "CSidebarNavItem",
        name: "Color Reference",
        to: "/pages/colors",
        icon: "cil-bell",
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Pages",
        route: "/pages",
        icon: "cil-star",
        items: [
          {
            name: "Login",
            to: "/pages/login",
          },
          {
            name: "Register",
            to: "/pages/register",
          },
          {
            name: "Error 404",
            to: "/pages/404",
          },
          {
            name: "Error 500",
            to: "/pages/500",
          },
        ],
      },
      // {
      //   _name: "CSidebarNavItem",
      //   name: "Download CoreUI",
      //   href: "http://coreui.io/vue/",
      //   icon: { name: "cil-cloud-download", class: "text-white" },
      //   _class: "bg-success text-white",
      //   target: "_blank",
      // },
    ],
  },
];
