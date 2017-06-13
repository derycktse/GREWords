/** 为输出到客户端的数据坐格式化
 * 
 * @param {string} content 
 */
function formatHTML(content) {
 content = content.replace(/(?:\r\n|\r|\n)/g, '<br />');
  return content
}

module.exports = formatHTML