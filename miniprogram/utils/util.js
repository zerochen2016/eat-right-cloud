const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
	isEmpty: isEmpty,
	isAnyEmpty: isAnyEmpty,
  lengthLimit: lengthLimit,
  isPositiveInteger: isPositiveInteger,
  isInteger: isInteger,
  isFloat: isFloat,
  isPositiveFloat: isPositiveFloat,
	isPrice: isPrice,
	hasNumberAndLetter: hasNumberAndLetter,
	isMobile: isMobile,
	replaceAll: replaceAll,
	randomLetterString: randomLetterString
}
function randomLetterString(length) {  
	  length = length || 16;
	  var t = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
	  a = t.length,
	  n = "";
	  for (let i = 0; i < length; i++) n += t.charAt(Math.floor(Math.random() * a));
	  return n
}
//是否空
function isEmpty(param){
	return param == null || typeof(param) == 'undefined' || param.length < 1;
}
//任意空
function isAnyEmpty(...params){
	for(var i = 0; i < params.length; i++){
		if(isEmpty(params[i])){
			return true;
		}
	}
}
//长度限制
function lengthLimit(param,min,max){
	if(isEmpty(param)){
		return false;
	}
	return (param.length > max || param.length < min)
}
//是否正整数
function isPositiveInteger(param){
	if(isEmpty(param)){
		return false;
  }
	return (/^[0-9]*$/.test(param));
}
//是否整数
function isInteger(param){
	if(isEmpty(param)){
		return false;
	}
	return (/^(-)?[0-9][0-9]*$/.test(param));
}
//是否浮点
function isFloat(param){
	if(isEmpty(param)){
		return false;
	}
	return (/^-?\d*\.\d+$/.test(param));
} 
//是否整浮点数
function isPositiveFloat(param){
	if(isEmpty(param)){
		return false;
	}
	return (/^\d*\.\d+$/.test(param));
}
//是否价格
function isPrice(param){
	if(isEmpty(param)){
		return false;
  }
	return isPositiveFloat(param)||isPositiveInteger(param);
}
//必须包含数字和字母
function hasNumberAndLetter(param){
	if(isEmpty(param)){
		return false;
  }
	return (/^(?![^a-zA-Z]+$)(?!\D+$)/.test(param))
}
function isMobile(param){
	if(isEmpty(param)){
		return false;
  }
	return (/^(1[34578]{1}\d{9}$)/.test(param))
}
function replaceAll(str,s1,s2){
	return str.toString().replace(new RegExp(s1,"gm"),s2);
}