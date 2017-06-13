const http = require('http')
const fs = require('fs')
const utils = require('./lib/utils')
const path = require('path')
const formatHTML = require('./lib/format-html')

const PORT = process.env.PORT || 8080

const fetchData = require('./lib/handle-data')

setInterval(function () {
  fetchData()
}, 900000)


const server = http.createServer((req, res) => {
  let today = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')
  let todayPath = path.resolve(__dirname, './results/' + today + '.txt')
  fetchData()
  if (!fs.existsSync(todayPath)) {
    res.end(`${today} has no data`)
    return
  }

  fs.readFile(todayPath, (err, data) => {
    if (err) throw err
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`${today}数据如下：`)
    let content = formatHTML(data.toString())
    res.end(content, () => {
      console.log(`${today} data has been send`)
    })
  })


}).listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})


