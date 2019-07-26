//const mockIndexData = require("./mock/index.json");
var mock = require('./mockData')
 
module.exports = {
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
  }
};