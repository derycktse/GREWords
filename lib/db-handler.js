const MongoClient = require('mongodb').MongoClient

function closeDB(db) {
  db.close()
  console.log('database has been closed')
}

// /**
//  * @param {Function}
//  */
// function connectMongo() {
//   return new Promise(function (resolve, reject) {
//     MongoClient.connect(config.db, (err, db) => {
//       if (err) {
//         return reject(err)
//       }
//       resolve(db)
//     })
//   })
// }

// /**
//  * 
//  */
// function insertDoc(doc) {
//   let insert = (db) => {
//     let collection = db.collection(config.wordsCollection)
//     collection.insert(doc, (err, result) => {
//       if (err) {
//         throw err
//       }
//       console.log(result)
//     })
//   }
//   connectMongo(insert)
// }


// function insertDocuments(docArr=[]) {
//   if(docArr.length ===0) return Promise.resolve(docArr)
//   return connectMongo().then(db => {
//     return new Promise(function (resolve, reject) {
//       let collection = db.collection(config.wordsCollection)
//       collection.insertMany(docArr, (err, result) => {
//         if (err) {
//           return reject(err)
//         }
//         return resolve(result)
//       })
//       closeDB(db)
//     })
//   }).catch(err => {
//     return Promise.reject(err)
//   })
// }

// function findDocuments(filter) {
//   return connectMongo().then(db => {
//     return new Promise((resolve, reject) => {

//       let collection = db.collection('test');
//       collection.find(filter).toArray((err, docs) => {
//         if (err) {
//           return reject(err)
//         }
//         return resolve(docs)
//       })
//       closeDB(db)
//     })

//   }).catch(err => {
//     return Promise.reject(err)
//   })
// }

// module.exports.insertDocuments = insertDocuments
// module.exports.findDocuments = findDocuments



class DBHandler {
  constructor(config) {
    this.config = config
  }

  connectMongo() {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.config.url, (err, db) => {
        if (err) {
          return reject(err)
        }
        resolve(db)
      })
    })
  }

  findDocuments(filter) {
    return this.connectMongo().then(db => {
      return new Promise((resolve, reject) => {

        let collection = db.collection(this.config.collectionName);
        try {
          collection.find(filter).toArray((err, docs) => {
            closeDB(db)
            if (err) {
              return reject(err)
            }
            return resolve(docs)
          })
        } catch (ex) {
          closeDB(db)
          reject(ex)
        }
      })

    }).catch(err => {
      return Promise.reject(err)
    })
  }

  insertDocuments(docArr = []) {
    if (docArr.length === 0) return Promise.resolve(docArr)
    return this.connectMongo().then(db => {
      return new Promise((resolve, reject) => {
        let collection = db.collection(this.config.collectionName)
        try {
          collection.insertMany(docArr, (err, result) => {
            closeDB(db)
            if (err) {
              return reject(err)
            }
            return resolve(result)
          })

        } catch (ex) {
          closeDB(db)
          reject(ex)
        }
      })
    }).catch(err => {
      return Promise.reject(err)
    })
  }

}
module.exports = DBHandler