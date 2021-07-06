/* 脚手架基础配置项 */
const path = require("path");
const paths = require("react-scripts/config/paths");
const {
  override,
  disableEsLint,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");
const { getThemeVariables } = require("antd/dist/theme");

const resolve = (dir) => path.join(__dirname, dir);

// build构建打包
const appBuild = () => (config) => {
  if (config.mode === "production") {
    console.log("evn is production, change build path...");
    // 关闭sourceMap
    config.devtool = false;
    // 配置打包后的文件位置
    paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
    config.output.path = path.join(path.dirname(config.output.path), "dist");
  }

  return config;
};

// 跨域配置
const devServerConfig = () => (config) => {
  return {
    ...config,
    proxy: {
      "/api": {
        target: process.env.REACT_APP_API,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  };
};

module.exports = {
  // do stuff with the webpack config...
  webpack: override(
    // antd样式按需加载
    fixBabelImports("import", {
      libraryName: "antd",
      libraryDirectory: "es",
      style: true
    }),
    fixBabelImports("lodash", {
      libraryDirectory: "",
      camel2DashComponentName: false
    }),
    // 使用less-loader对源码中的less的变量进行重新指定
    addLessLoader({
      lessOptions: {
        modifyVars: getThemeVariables({
          dark: true,
          compact: true
        }),
        javascriptEnabled: true,
        localIdentName: "[path][name]__[local]--[hash:base64:5]"
      }
    }),
    // 配置路径别名
    addWebpackAlias({
      "@": resolve("src"),
      "~components": resolve("src/components"),
      "~packages": resolve("src/packages"),
      "~hooks": resolve("src/hooks"),
      "~utils": resolve("src/utils")
    }),
    disableEsLint(),
    appBuild()
  ),
  devServer: overrideDevServer(devServerConfig())
};
