const MongoClient = require('mongodb').MongoClient

function closeDB(db) {
  db.close()
  console.log('database has been closed')
}



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