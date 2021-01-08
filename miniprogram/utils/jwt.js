const base64 = require("../utils/base64.js")

module.exports = {
  getHeader: getHeader,
  getClaims: getClaims,
  
}

function getClaims(){
  let now = parseInt(new Date().getTime() / 1000)
  let exp = parseInt(now + 600)
  let s = '{"iss":"cn.jt-health","access_token":"","iat":' + now + ',"exp":' + exp +'}'
  console.log(s)
  return base64.encode(s)
}
function getHeader(){
  return base64.encode('{"alg":"RS256"}')
}



