module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
      symlinks: false,
    },
  },
  devServer: {
    host: "localhost",
    port: 8082,
    // https: true,
    proxy: {
      "/server": {
        target: "http://localhost:8080/ita/",
        pathRewrite: { "^/server": "" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  transpileDependencies: ["@coreui/utils", "@coreui/vue"],
};
