const path = require("path");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  publicPath: "./", //以打包，记得改为/
  outputDir: "./build",
  configureWebpack: {
    devtool:'source-map',   //添加source-map
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", path.resolve(__dirname, "src"))
      .set("components", "@/components");
  },
  devServer: {
    hotOnly: true, // 热更新
    proxy: {
      /* 添加多个跨域请求：/admin、/api... */
      "^/api": {
        target: `https://cloud-music-api-psi.vercel.app`, //访问的服务器地址
        changeOrigin: true, //开启代理
        ws: true, //启用websockets
        pathRewrite: {
          //重写路径
          "^/api": "", //替换规则， 如果你的真实的api路径中没有/admin这一个路径，把这句加上，如果本来就有/admin这一路径的话，这句一定要去掉，要不然会导致域名找不到的
        },
      },
    },
  },
};
