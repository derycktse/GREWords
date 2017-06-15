const MongoClient = require('mongodb').MongoClient
const config = require('../config/')

function closeDB(db) {
  db.close()
  console.log('database has been closed')
}

/**
 * @param {Function}
 */
function connectMongo(callback) {
  return new Promise(function (resolve, reject) {
    MongoClient.connect(config.db, (err, db) => {
      if (err) {
        return reject(err)
      }
      // callback()
      resolve(db)
      // db.close()
    })
  })
}

/**
 * 
 */
function insertDoc(doc) {
  let insert = (db) => {
    let collection = db.collection(config.wordsCollection)
    collection.insert(doc, (err, result) => {
      if (err) {
        throw err
      }
      console.log(result)
    })
  }
  connectMongo(insert)
}


function insertDocuments(docArr) {
  return connectMongo().then(db => {
    return new Promise(function (resolve, reject) {
      let collection = db.collection(config.wordsCollection)
      collection.insertMany(docArr, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      })
      closeDB(db)
    })
  }).catch(err => {
    return Promise.reject(err)
  })
}

function findDocuments(filter) {
  return connectMongo().then(db => {
    return new Promise((resolve, reject) => {

      let collection = db.collection('test');
      collection.find(filter).toArray((err, docs) => {
        if (err) {
          return reject(err)
        }
        return resolve(docs)
      })
      closeDB(db)
    })

  }).catch(err => {
    return Promise.reject(err)
  })
}

module.exports.insertDocuments = insertDocuments
module.exports.findDocuments = findDocuments