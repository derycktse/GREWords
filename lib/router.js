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

router.get('/', requestHandler)

router.get('/:date(\\d{6})', requestHandler)


module.exports = router