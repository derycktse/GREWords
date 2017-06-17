
let DBHandler = require('./db-handler')
let _ = require('lodash')
const utils = require('./utils')

class GREHandler extends DBHandler {
  constructor(config) {
    super(config)
  }

  /**
   * @description the insert words may be depuplated with the words in mongodb, so they must be pruned
   * @param {Array} wordList the words wating to be insert 
   * @param {Object} filter 
   * @return 
   */
  pruneData(wordList = [], filter = {}) {
    return new Promise((resolve, reject) => {
      this.findDocuments(filter).then(docs => {
        if (!docs) {
          return resolve(wordList)
        }
        _.remove(wordList, (n) => {
          return _.find(docs, (o) => {
            return o.word === n.word
          })
        })
        return resolve(wordList)
      })
    })
  }

  /**
   * @description make the words fit to be insert into mongodb
   */
  formatData(arr) {
    let today = new Date()
    let todayString = utils.getBeijingTimeString(today, 'yyyyMMdd')

    let wordsList = []
    let pattern = /(.*)【(.*)】/
    arr.forEach(val => {
      let matches = val.match(pattern)
      if (!matches) return
      wordsList.push({
        date: todayString,
        word: matches[1],
        phonetic: matches[2]

      })
    })
    return wordsList
  }

  /**
   * @description the data from db, concat to html string 
   * @param {Array} objList 
   */
  objList2HTML(objList) {
    let html = ''
    html += `<span style="font-size:20px">共计${objList.length}个单词</span><br />`
    html +=`<ol> `
    objList.forEach(val => {
      html += `<li> ${val.word}  [${val.phonetic}]</li>`
    })
    html +=`</ol> `
    return html
  }
}

module.exports = GREHandler