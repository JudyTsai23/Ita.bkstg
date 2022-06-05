export default [
  {
    _name: "CSidebarNav",
    _children: [
      {
        _name: "CSidebarNavItem",
        name: "Dashboard",
        to: "/dashboard",
        icon: "cil-speedometer",
        badge: {
          color: "primary",
          text: "NEW",
        },
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Components"],
      },
      {
        _name: "CSidebarNavDropdown",
        name: "Base",
        route: "/base",
        icon: "cil-puzzle",
        items: [
          {
            name: "Breadcrumbs",
            to: "/base/breadcrumbs",
          },
        ],
      },
      {
        _name: "CSidebarNavItem",
        name: "Charts",
        to: "/charts",
        icon: "cil-chart-pie",
      },
      {
        _name: "CSidebarNavItem",
        name: "Widgets",
        to: "/widgets",
        icon: "cil-calculator",
        badge: {
          color: "primary",
          text: "NEW",
          shape: "pill",
        },
      },
      {
        _name: "CSidebarNavDivider",
        _class: "m-2",
      },
      {
        _name: "CSidebarNavTitle",
        _children: ["Extras"],
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
      {
        _name: "CSidebarNavItem",
        name: "Download CoreUI",
        href: "http://coreui.io/vue/",
        icon: { name: "cil-cloud-download", class: "text-white" },
        _class: "bg-success text-white",
        target: "_blank",
      },
    ],
  },
];
