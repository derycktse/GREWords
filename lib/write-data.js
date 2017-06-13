const fs = require('fs')
const path = require('path')
const utils = require('./utils')

const resolveDataPath = filename => path.resolve(__dirname, '../results/' + filename + '.txt')

function writeData(arr) {

  let today = new Date()
  let yesterday = new Date(Date.now() - 86400000)

  let todayString = utils.getBeijingTimeString(today, 'yyyyMMdd'),
    yesterdayString = utils.getBeijingTimeString(yesterday, 'yyyyMMdd')

  let todayPath = resolveDataPath(todayString)
    , yesterdayPath = resolveDataPath(yesterdayString)


  //if file not exists, create them
  if (!fs.existsSync(todayPath)) {
    createFile(todayPath)
  }
  if (!fs.existsSync(yesterdayPath)) {
    createFile(yesterdayPath)
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

  //update time 
  fs.readFile(todayPath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }

    let content = data.replace(/(last update at: ){{(?:.*)}}/, `$1{{${new Date()}}}`)
    content += append

    fs.writeFile(todayPath, content, 'utf8', (err) => {
      if (err) return console.log(err);
      console.log(`append data in ${todayPath} at ${new Date()} `)
    })
  })
}

function createFile(path) {
  let date = new Date()
  let template = `create at: ${date} \nlast update at: {{${date}}}\n\n`
  fs.writeFileSync(path, template, 'utf-8', (err) => {
    console.log(`create file: ${todayPath}`)
  })
}



module.exports = writeData