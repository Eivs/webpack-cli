let express = require('express')
let webpack = require("webpack")
const fs = require('fs')
let app = express()
let port = 3000


let webpackconfig = require('./webpack.dev.config')
webpackconfig(app)
app.use(express.static('./static'))
app.get('/', function(req, res, next) {
  next()
})

app.listen(port || 9999, function(e) {
  console.log(`server start at ${port}`)
});
