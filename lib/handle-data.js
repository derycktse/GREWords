const http = require('http')
const url = require('url')
const fs = require('fs')

const cheerio = require('cheerio')

const writeData = require('./write-data')


const api = 'http://service.weibo.com/widget/widget_blog.php?uid=1734409641'

/**
 * @param request
 */
const requestHandler = (request) => {

  let chunks = [], size = 0

  request.addListener('response', (res) => {
    res.addListener('data', (chunk) => {
      chunks.push(chunk);
      size += chunk.length;
    })
    res.addListener('end', () => {
      let data = null
      switch (chunks.length) {
        case 0: data = new Buffer(0);
          break;
        case 1: data = chunks[0];
          break;
        default:
          data = new Buffer(size);
          for (var i = 0, pos = 0, l = chunks.length; i < l; i++) {
            var chunk = chunks[i];
            chunk.copy(data, pos);
            pos += chunk.length;
          }
          break;
      }
      parseHTML(data.toString())
    })
  })
}

/**
 * @param parseHTML // chunk data
 */
function parseHTML(html) {
  let $ = cheerio.load(html)

  let wordBoxs = $('#content_all>.wgtCell')

  let words = []

  let pattern = /#GRE词汇#\s*(\S+?】)/
  wordBoxs.each((idx) => {
    let $ = cheerio.load(wordBoxs[idx])

    let textNode = $('.wgtCell_txt')

    let naiveText = textNode.text()

    let naiveMatch = naiveText.match(pattern)
    matchText = (naiveMatch && naiveMatch[1]) || ''
    if (matchText) words.push(matchText)

  })
  // writeResult(words.join(','))
  // console.log(words.join(','))
  writeData(words)
}

function writeResult(result) {
  // fs.writeFile('./result.txt', result, 'utf-8', (err) => {
  //   throw err
  // })
}

function handler() {
  let target = url.parse(api, true)

  let request = http.request({
    port: target.port || 80,
    host: target.host,
    method: 'GET',
    path: target.path
  })

  request.end()

  requestHandler(request)

  let chunks = []
    , size = 0
}


module.exports = handler