//const mockIndexData = require("./mock/index.json");
var mock = require('./mockData')
// 引入nodejs的路径模块
var path = require('path')
var ZipPlugin = require('zip-webpack-plugin')
var packageData = require('./package')
 
module.exports = {
  publicPath: process.env.VUE_APP_STATIC,
  productionSourceMap: true,  // 生产环境下css 分离文件
  configureWebpack: (config) => {
    const pluginsBase = [
      
    ]
    const pluginsPro = [
      new ZipPlugin({
        path: path.join(__dirname,'./dist'),
        pathPrefix: `${packageData.name}`,
        filename: `${packageData.name}.zip`
      })
    ]
    if(process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...pluginsPro]
    }
    config.plugins = [...config.plugins, ...pluginsBase]
  },
  //...  
  devServer: {
    port: 8081,
    before(app) {
      // app.get("/api/index", (req, res) => {
      //   res.json(mockIndexData);
      // });
      // mock request
      app.use(function(req, res, next) {
        console.log('url->', req.url)
        var data = mock(req.url)
        if (data) {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Max-Age', 3600 * 24)
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
          res.setHeader('Access-Control-Allow-Credentials', 'true')
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-Cache')
          res.end(JSON.stringify(data, null, 4))
          return
        }
        next()
      });
    }
  },
  //px转rem的配置（postcss-plugin-px2rem插件）
  lintOnSave: true,
  css: {
      loaderOptions: {
          postcss: {
              plugins: [
                  require('postcss-plugin-px2rem')({
                      rootValue: 75, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
                      // unitPrecision: 5, //允许REM单位增长到的十进制数字。
                      // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
                      // propBlackList: [], //黑名单
                      exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
                      // selectorBlackList: [], //要忽略并保留为px的选择器
                      // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
                      // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
                      mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
                      minPixelValue: 2 //设置要替换的最小像素值(3px会被转rem)。 默认 0
                  }),
              ]
          }
      }
  },
};