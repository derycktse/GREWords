const http = require('http')
const fs = require('fs')
const utils = require('./lib/utils')
const path = require('path')
const url = require('url')
const formatHTML = require('./lib/format-html')

const PORT = process.env.PORT || 8080

const fetchData = require('./lib/handle-data')

setInterval(function () {
  fetchData()
}, 900000)
fetchData()

let serverStartTime
const server = http.createServer((req, res) => {
  let today = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')

  let pUrl = url.parse(req.url)
  let pathname = pUrl.pathname
  if(pathname !=='/' && !/\/\d{6}/.test(pathname)){
    res.end()
    return 
  }
  if (/\/\d{6}/.test(pathname)) {
    today = pathname.match(/\/(\d{8})/)[1]
  }
  let todayPath = path.resolve(__dirname, './results/' + today + '.txt')
  if (!fs.existsSync(todayPath)) {
    res.end(`${today} has no data`)
    return
  }

  fs.readFile(todayPath, (err, data) => {
    if (err) {
      // throw err
      res.end(`err accur when read ${today}.txt
      ${err}`)
      return
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`server is started at ${serverStartTime}<br />`)
    res.write(`${today}的数据如下：<br />`)

    let content = ''
    try {
      content = formatHTML(data.toString())
    }
    catch (e) {
      content = e.message
    }
    res.end(content, () => {
      console.log(`${today} data has been send`)
    })
  })


}).listen(PORT, () => {
  serverStartTime = new Date()
  console.log(`server is listening at ${PORT}`)
})


