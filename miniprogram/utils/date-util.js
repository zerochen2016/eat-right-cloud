
module.exports = {
  utcToBeiJing: utcToBeiJing,
  dateToString: dateToString,
  dateToString2: dateToString2,
  dateDiffDay: dateDiffDay,
  dateDiffMinute: dateDiffMinute,
  dateDiffSecond: dateDiffSecond
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

function dateToString(date) {
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

function dateToString2(date) {
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
  let diffTime = parseInt(time / 86400000);
  return diffTime > 0 ? diffTime : 0;
}

function dateDiffSecond(beginDate, endDate){
  let time = new Date(endDate).getTime() - new Date(beginDate).getTime()
  let diffTime = parseInt(time / 86400000);
  return diffTime > 0 ? diffTime : 0;
}