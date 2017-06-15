const dbHandler = require('./lib/db-handler')


dbHandler.insertDocuments({ "name": `deryck${Date.now()}` })
  .then((result) => {
    console.log('insert success')
    console.log(result)
  })
  .catch(err => {

  })