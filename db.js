// const dbHandler = require('./lib/db-handler')
/*
let arr = [{ "date": "20170615", "name": `deryck${Date.now()}`, "pronun": "ʌp'hi:vl" }, { "date": "20170615", "name": `lindsey${Date.now()}`, "pronun": "'rʌmb(ə)liŋ" }]
dbHandler.insertDocuments(arr)
  .then((result) => {
    console.log('insert success')
    console.log(result)
  })
  .catch(err => {
    console.log('level 1 err accur ')
    console.log(err)
  })
*/


// dbHandler.findDocuments({date:'20170615'}).then(docs=>{
//   console.log('succss')
//   console.log(docs)
// })


let DBHandler = require('./lib/db-handler')
let config = require('./config')
let _ = require('lodash')

class GreHandler extends DBHandler {
  constructor(config) {
    super(config)
  }
  pruneData(wordList = [], filter = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments(filter).then(docs => {
        if (!docs) {
          return resolve(wordList)
        }
        _.remove(wordList, (n) => {
          return _.find(docs, (o) => {
            return o.name === n.name
          })
        })
        return resolve(wordList)
      })
    })
  }

  formatData(arr) {
    let today = new Date()
    let todayString = utils.getBeijingTimeString(today, 'yyyyMMdd')

    let wordsList = []
    let pattern = /(.*)【(.*)】/
    arr.forEach(val => {
      let matches = val.match(pattern)
      if (!matches) return
      wordsList.push({
        word: matches[1],
        phonetic: matches[2],
        date: todayString
      })
    })

    return wordsList
  }
}

let greDBHandler = new GreHandler({
  url: config.db,
  collectionName: config.wordsCollection
})

// greDBHandler.pruneData([{ name: 'deryck149750089385' }, { name: 'deryck' }]).then(result => {
//   console.log('prune')
//   console.log(result)
// })
console.log(
  greDBHandler.formatData(["latent【'leitnt】", "mortify【'mɔ:tifai】"])

)