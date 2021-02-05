
module.exports = {
  utcToBeiJing: utcToBeiJing,
  dateToStringYYMMDD_hhmmss: dateToStringYYMMDD_hhmmss,
  dateToStringYYMMDD: dateToStringYYMMDD,
  dateDiffDay: dateDiffDay,
  dateDiffMinute: dateDiffMinute,
  dateDiffSecond: dateDiffSecond,
  dateToYYMM: dateToYYMM,
  dateToYYMMDD: dateToYYMMDD,
  dateToYYMMTodayString: dateToYYMMTodayString,
  dateToYYMMDDTodayString: dateToYYMMDDTodayString,
  getEndTime: getEndTime,
  getEndTimeSecond: getEndTimeSecond,
  getMonday: getMonday,
  getSunday: getSunday,
  getTimeDescritipn: getTimeDescritipn,
  getTimeDetail: getTimeDetail
}
function getTimeDetail(inputDate){
  let date = new Date(inputDate)
  let result = date.getHours() + ":" + date.getMinutes()
  let today = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  if(today.getTime() == date.getTime()){
    return result
  }else {
    return date.getDate() + "/" +(date.getMonth() + 1)
  }
}
/**
 * 凌晨：0-6，早上：6-9，上午：9-11，中午：11-14，下午：14-18，傍晚：18-19，晚上：19-24
 */
function getTimeDescritipn(inputDate){
  let date = new Date(inputDate)
  let h = date.getHours()
  let result = ''
  if(h > 0 && h < 6){
    result = "凌晨"
  }else if(h < 9){
    result = "早上"
  }else if(h < 11){
    result = "上午"
  }else if(h < 14){
    result = "中午"
  }else if(h < 18){
    result = "下午"
  }else if(h < 19){
    result = "傍晚"
  }else{
    result = "晚上"
  }
  let today = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)
  if(today.getTime() == date.getTime()){
    return "今天" + result
  }else if(today.getTime() - date.getTime() == 86400000){
    return "昨天" + result
  }else{
    return ""
  }
}
function getMonday(inputDate){
  let date = new Date(inputDate)
  let week = date.getDay()
  let diff = week ? week - 1 : 6
  date = date.getTime() - 86400000 * diff
  date = new Date(date)

  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}

function getSunday(inputDate){
  let date = new Date(inputDate)
  let week = date.getDay()
  let diff = week ? 7 - week : 0
  date = date.getTime() + 86400000 * diff
  date = new Date(date)
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date
}


/**
 * 当天结束时间
 */
function getEndTime(inputDate){
  let date = new Date(inputDate);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  
  let result = new Date()
  result.setFullYear(y)
  result.setMonth(m - 1)
  result.setDate(d)
  result.setHours(23)
  result.setMinutes(59)
  result.setSeconds(59)
  return result
}

/**
 * 当天结束时间
 */
function getEndTimeSecond(inputDate){
  let date = new Date(inputDate);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  let result = new Date()
  result.setFullYear(y)
  result.setMonth(m - 1)
  result.setDate(d)
  result.setHours(23)
  result.setMinutes(59)
  result.setSeconds(59)
  return result.getTime()/1000
}

function utcToBeiJing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    let T_pos = utc_datetime.indexOf('T');
    let Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    let TArray = year_month_day.toString().split("-")
    let ZArray = hour_minute_second.toString().split(":")

    // 处理成为时间戳
    timestamp = new Date();
    timestamp.setFullYear(parseInt(TArray[0]))
    timestamp.setMonth(parseInt(TArray[1]) - 1)
    timestamp.setDate(parseInt(TArray[2]))
    timestamp.setHours(parseInt(ZArray[0]))
    timestamp.setMinutes(parseInt(ZArray[1]))
    timestamp.setSeconds(parseInt(ZArray[2]))
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;
    return new Date(parseInt(timestamp) * 1000);
} 

function dateToYYMMTodayString(language){
  var date = new Date()
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if(language == 'chinese'){
    return y + '年' + m + '月';
  }else{
    return y + '-' + m;
  }
  
}

function dateToYYMMDDTodayString(language){
  var date = new Date()
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  if(language == 'chinese'){
    return y + '年' + m + '月' + d + '日';
  }else{
    return y + '-' + m + '-' + d;
  }
}

function dateToYYMM(date){
  var date = new Date(date)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  let result = new Date()
  result.setFullYear(y)
  result.setMonth(m - 1)
  return result
}

function dateToYYMMDD(date){
  var date = new Date(date)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let result = new Date()
  result.setFullYear(y)
  result.setMonth(m - 1)
  result.setDate(d)
  return result
}

function dateToStringYYMMDD_hhmmss(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

function dateToStringYYMMDD(date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

function dateDiffDay(beginDate, endDate){
  let time = new Date(endDate).getTime() - new Date(beginDate).getTime()
  let diffTime = parseInt(time / 86400000);
  return diffTime > 0 ? diffTime : 0;
}

function dateDiffMinute(beginDate, endDate){
  let time = new Date(endDate).getTime() - new Date(beginDate).getTime()
  let diffTime = parseInt(time / 60000);
  return diffTime > 0 ? diffTime : 0;
}

function dateDiffSecond(beginDate, endDate){
  let time = new Date(endDate).getTime() - new Date(beginDate).getTime()
  let diffTime = parseInt(time / 1000);
  return diffTime > 0 ? diffTime : 0;
}

