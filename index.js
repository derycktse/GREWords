const utils = require('./lib/utils')
const GREHandler = require('./lib/gre-handler')
const express = require('express')
let app = express()
let greRouter = require('./lib/router')

const PORT = process.env.PORT || 8080

const fetchData = require('./lib/handle-data')

setInterval(function () {
  fetchData()
}, 900000)
fetchData()

app.use('/',greRouter)
app.use('/assets', express.static(require('path').resolve(__dirname, './assets/')))
app.listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})
