/** 为输出到客户端的数据做格式化
 * 
 * @param {string} content 
 */
function formatHTML(content) {
  
  // words count
  let matches = content.match(/】/g).length
 
  content  = content.replace(/^(.*【.*】$)/gm,'<span style="font-size:30px;">$1</span>')
  content = content.replace(/({{)|(}})/g,'')
   content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
  let result = `
  <!DOCTYPE html><html>
  <body>
  <div style="margin: 0 auto; width:800px;text-align:center ">
  ${content} <br /> <br /> <span>共计${matches}个单词</span>
  </div>
  </body></html>
  `
  return result
}

module.exports = formatHTML