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
    res.write(``)
    res.write(``)
    let html = `
    <!DOCTYPE html><html>
    <head>
      <link rel="stylesheet" href="assets/style.css" />
    </head>
    <body>
    server is started at ${routerTime}<br />
    ${date}的数据如下：<br />
    ${ grehl.objList2HTML(result)}
    </body>
    </html>
   `
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
    res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8" });
    let rss =
         `<?xml version="1.0"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Deryck GRE Feed</title>
        <link>https://derycktse-gre.herokuapp.com</link>
        <atom:link href="https://derycktse-gre.herokuapp.com/feed" rel="self" type="application/rss+xml" />
        <description>
            Deryck GRE Feed
            
        </description>
        <pubDate>Thu, 15 Jun 2017 21:44:49 -0700</pubDate>
        <lastBuildDate>Thu, 15 Jun 2017 21:44:49 -0700</lastBuildDate>
        <language>zh-Hans</language>
        <generator>https://wanqu.co</generator>
        
        <item>
            <title>The 5 Laws of Software Estimates</title>
            <link>https://derycktse-gre.herokuapp.com</link>
            <pubDate>Thu, 15 Jun 2017 21:44:49 -0700</pubDate>
            <guid>https://derycktse-gre.herokuapp.com</guid>
            <description>
                <![CDATA[ test ]]>
            </description>
        </item>
    </channel>
</rss>`
    res.end(rss);
}

router.get('/', requestHandler)

router.get('/:date(\\d{8})', requestHandler)
router.use('/feed', rssHandler)



module.exports = router