const dbHandler = require('./lib/db-handler')
/*
let arr = [{ "date": "20170615", "name": `deryck${Date.now()}`, "pronun": "ʌp'hi:vl" }, { "date": "20170615", "name": `lindsey${Date.now()}`, "pronun": "'rʌmb(ə)liŋ" }]
dbHandler.insertDocuments(arr)
  .then((result) => {
    console.log('insert success')
    console.log(result)
  })
  .catch(err => {
    console.log('level 1 err accur ')
    console.log(err)
  })
*/


  dbHandler.findDocuments({date:'20170615'}).then(docs=>{
    console.log('succss')
    console.log(docs)
  })