const express = require('express')
const utils = require('./utils')
const GREHandler = require('./gre-handler')

let router = express.Router()
let routerTime = new Date()
let requestHandler = (req, res, next) => {
  let date = ''
  if (req.url === '/') {
    date = utils.getBeijingTimeString(new Date(), 'yyyyMMdd')
  } else {
    date = req.params.date
  }
  let grehl = new GREHandler({
    url: process.env.MONGODB_DG || require('../config/').db,
    collectionName: process.env.MONGODB_COLLECTION_GRE || require('../config/').wordsCollection
  })

  grehl.findDocuments({
    date
  }).then(result => {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(`server is started at ${routerTime}<br />`)
    res.write(`${date}的数据如下：<br />`)
    let html = grehl.objList2HTML(result)
    res.end(html)
  }).catch(err => {
    try {
      res.end(`server error: ${err.toString()}`)
    } catch (ex) {
      res.end('error')
    }
  })
}

let rssHandler = (req,res) => {
    res.writeHead(200, { "Content-Type": "text/xml; charset=utf-8" });
    let rss =
          `<?xml version="1.0" encoding="UTF-8"?>
          <rss version="2.0">
          <channel>
          <title>deryck-gre</title>
          <link>https://derycktse-gre.herokuapp.com</link>
          <description>deryck-gre</description>
          <language>zh-cn</language>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          <ttl>300</ttl></channel>
          <item>
              <title><![CDATA[${new Date().toUTCString()}]></title>
              <description><![CDATA[test]]></description>
              <pubDate></pubDate>
              <guid></guid>
              <link></link>
          </item>
          </rss>`
    res.end(rss);
}

router.get('/', requestHandler)

router.get('/:date(\\d{6})', requestHandler)
router.use('/feed', rssHandler)



module.exports = router