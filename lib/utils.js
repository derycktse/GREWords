
function getDateString(date) {
  let mm = date.getMonth() + 1
  let dd = date.getDate()

  return `${date.getFullYear()}${(mm > 9 ? '' : '0') + mm}${(dd > 9 ? '' : '0') + dd}`

}


exports.getDateString = getDateString