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

let serverStartTime
// const server = http.createServer((req, res) => {
//   let today = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')

//   let pUrl = url.parse(req.url)
//   let pathname = pUrl.pathname
//   if (pathname !== '/' && !/\/\d{6}/.test(pathname)) {
//     res.end()
//     return
//   }
//   if (/\/\d{6}/.test(pathname)) {
//     today = pathname.match(/\/(\d{8})/)[1]
//   }



//   let grehl = new GREHandler({
//     url: process.env.MONGODB_DG || require('./config/').db,
//     collectionName: process.env.MONGODB_COLLECTION_GRE || require('./config/').wordsCollection
//   })

//   grehl.findDocuments({
//     date: today
//   }).then(result => {
//     res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
//     res.write(`server is started at ${serverStartTime}<br />`)
//     res.write(`${today}的数据如下：<br />`)
//     let html = grehl.objList2HTML(result)
//     res.end(html)
//   }).catch(err => {
//     try {
//       res.end(`server error: ${err.toString()}`)
//     } catch (ex) {
//       res.end('error')
//     }
//   })


// }).listen(PORT, () => {
//   serverStartTime = new Date()
//   console.log(`server is listening at ${PORT}`)
// })
/*
app.get('/', (req, res) => {
  let today = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')
  let grehl = new GREHandler({
    url: process.env.MONGODB_DG || require('./config/').db,
    collectionName: process.env.MONGODB_COLLECTION_GRE || require('./config/').wordsCollection
  })


  grehl.findDocuments({
    date: today
  }).then(result => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`server is started at ${serverStartTime}<br />`)
    res.write(`${today}的数据如下：<br />`)
    let html = grehl.objList2HTML(result)
    res.end(html)
  }).catch(err => {
    try {
      res.end(`server error: ${err.toString()}`)
    } catch (ex) {
      res.end('error')
    }
  })


})
*/

app.use('/',greRouter)
app.listen(PORT, () => {
  serverStartTime = new Date()
  console.log(`server is listening at ${PORT}`)
})
