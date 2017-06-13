const fs = require('fs')
const path = require('path')
const utils = require('./utils')

const resolveDataPath = filename => path.resolve(__dirname, '../results/' + filename + '.txt')

function writeData(arr) {

  let today = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')
  let yesterday = utils.getBeijingTimeString(new Date(Date.now() - 86400000),'yyyyMMdd')

  let todayPath = resolveDataPath(today)
    , yesterdayPath = resolveDataPath(yesterday)


  //if file not exists, create them
  if (!fs.existsSync(todayPath)) {
    fs.openSync(todayPath, 'w')
    console.log(`create file: ${todayPath}`)
  }
  if (!fs.existsSync(yesterdayPath)) {
    fs.openSync(yesterdayPath, 'w')
    console.log(`create file: ${todayPath}`)
  }

  let todayData = fs.readFileSync(todayPath, 'utf-8')
  let yesterdayData = fs.readFileSync(yesterdayPath, 'utf-8')

  //loop the arr check if data exists
  let append = ''
  arr.forEach(val => {
    if (todayData.indexOf(val) > -1 || yesterdayData.indexOf(val) > -1) return

    append += '\n' + val
  })
  if (!append) return
  fs.appendFileSync(todayPath, append)
  console.log(`append data at ${todayPath} `)
}


module.exports = writeData