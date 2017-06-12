const http = require('http')
const fs = require('fs')
const utils = require('./lib/utils')
const path = require('path')

const PORT = process.env.PORT || 8080

const fetchData = require('./lib/handle-data')

setInterval(function () {
  fetchData()
}, 900000)


const server = http.createServer((req, res) => {
  let today = utils.getDateString(new Date())
  let todayPath = path.resolve(__dirname, './results/' + today + '.txt')
  fetchData()
  if (!fs.existsSync(todayPath)) {
    res.end(`today no data`)
    return
  }

  fs.readFile(todayPath, (err, data) => {
    if (err) throw err
    res.end(data)
  })


}).listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})


