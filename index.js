const http = require('http')
const url = require('url')
const cheerio = require('cheerio')

const PORT = process.env.PORT || 8080

const api = 'http://service.weibo.com/widget/widget_blog.php?uid=1734409641'

/**
 * @param parseHTML // chunk data
 */
const parseHTML = (html) => {
  let $ = cheerio.load(html)

  let wordBoxs = $('#content_all>.wgtCell')

  let words = []

  let pattern = /#GRE词汇#\s*(?:\S+】)/
  wordBoxs.each((idx) => {
    let $ = cheerio.load(wordBoxs[idx])

    let textNode = $('.wgtCell_txt')

    let naiveText = textNode.text()

    let naiveMatch = naiveText.match(pattern)
    matchText = (naiveMatch && naiveMatch[0]) || ''
    if (matchText) words.push(matchText)

  })

  console.log(words.join(','))


}


const server = http.createServer((req, res) => {

  let destUrl = url.parse(api, true)
  let proxyRequest = http.request({
    port: destUrl.port || 80,
    host: destUrl.host,
    method: 'GET',
    path: destUrl.path
  })
  proxyRequest.end()


  let chunks = []
    , size = 0

  proxyRequest.addListener('response', (proxyResponse) => {
    res.writeHead(proxyResponse.statusCode, proxyResponse.headers)

    proxyResponse.addListener('data', (chunk) => {
      chunks.push(chunk);
      size += chunk.length;
    })

    proxyResponse.addListener('end', () => {


      let data = null;
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
      res.end(data.toString())
    })
  })

}).listen(PORT, () => {
  console.log(`server is listening at ${PORT}`)
})
