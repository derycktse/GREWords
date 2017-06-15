const MongoClient = require('mongodb').MongoClient
const config = require('../config/')

/**
 * @param {Function}
 */
function connectMongo(callback) {
  MongoClient.connect(config.db, (err, db) => {
    if (err) {
      throw err
      return
    }
    callback(db)
    db.close()
  })
}

/**
 * 
 */
function insertDoc(doc) {
  let insert = (db) => {
    let collection = db.collection('test')
    collection.insert(doc, (err, result) => {
      if (err) {
        throw err
        return
      }
      console.log(result)
    })
  }
  connectMongo(insert)
}


function insertDocuments(docArr) {
  let insertDocs = (db) => {
    let collection = db.collection('test')
    collection.insertMany(docArr, (err, result) => {
      if (err) {
        throw err;
        return false
      }
      console.log(result)
    })
  }
  connectMongo(insertDocs)
}


module.exports.insertDocuments = insertDocuments