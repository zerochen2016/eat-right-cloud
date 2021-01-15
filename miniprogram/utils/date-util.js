
module.exports = {
  utcToBeiJing: utcToBeiJing,
  getUtcDateYYMMDD_hhmmss: getUtcDateYYMMDD_hhmmss,
  dateToStringYYMMDD_hhmmss: dateToStringYYMMDD_hhmmss,
  dateToStringYYMMDD: dateToStringYYMMDD,
  dateDiffDay: dateDiffDay,
  dateDiffMinute: dateDiffMinute,
  dateDiffSecond: dateDiffSecond,
  dateToYYMM: dateToYYMM,
  dateToYYMMDD: dateToYYMMDD,
  dateToYYMMToday: dateToYYMMToday,
  dateToYYMMDDToday: dateToYYMMDDToday,
  getEndTime: getEndTime,
  getEndTimeSecond: getEndTimeSecond,
  getLastMonthYYMM: getLastMonthYYMM,
  getNextMonthYYMM: getNextMonthYYMM,
  getMonday: getMonday,
  getSunday: getSunday
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

function getLastMonthYYMM(inputDate){
  let date = new Date(inputDate)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if(m == 1){
    return (y - 1) + '-12';
  }else{
    m -= 1
    return y + '-' + m;
  }
  
}
function getNextMonthYYMM(inputDate){
  let date = new Date(inputDate)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if(m == 12){
    return (y + 1) + '-01';
  }else{
    m += 1
    return y + '-' + m;
  }
  

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
  return y + '-' + m + '-' + d + " 23:59:59";
}

/**
 * 当天结束时间
 */
function getEndTimeSecond(inputDate){
  let date = new Date(inputDate);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  var d = date.getDate();
  return new Date(y + '-' + m + '-' + d + " 23:59:59").getTime()/1000
}

function getUtcDateYYMMDD_hhmmss(inputDate){
  let date = new Date(inputDate)
  return date.getUTCFullYear() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCDate() + 'T' + date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + date.getUTCSeconds() + '.' + date.getUTCMilliseconds() + 'Z'
}

function utcToBeiJing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; 

    // 处理成为时间戳
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp/1000;

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;
    return new Date(parseInt(timestamp) * 1000);
} 

function dateToYYMMToday(language){
  var date = new Date()
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  if(language == 'chinese'){
    return y + '年' + m + '月';
  }else{
    return y + '-' + m;
  }
  
}

function dateToYYMMDDToday(language){
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
  return y + '-' + m;
}

function dateToYYMMDD(date){
  var date = new Date(date)
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
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

