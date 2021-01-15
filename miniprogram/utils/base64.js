module.exports = {
  encode: encode,
  decode: decode
}
   
  var enKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
   
  var deKey = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
  );
   
  function encode(src){
    //用一个数组来存放编码后的字符，效率比用字符串相加高很多。
    var str=new Array();
    var ch1, ch2, ch3;
    var pos=0;
    //每三个字符进行编码。
    while(pos+3<=src.length){
      ch1=src.charCodeAt(pos++);
      ch2=src.charCodeAt(pos++);
      ch3=src.charCodeAt(pos++);
      str.push(enKey.charAt(ch1>>2), enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
      str.push(enKey.charAt(((ch2<<2)+(ch3>>6))&0x3f), enKey.charAt(ch3&0x3f));
    }
    //给剩下的字符进行编码。
    if(pos<src.length){
      ch1=src.charCodeAt(pos++);
      str.push(enKey.charAt(ch1>>2));
      if(pos<src.length){
        ch2=src.charCodeAt(pos);
        str.push(enKey.charAt(((ch1<<4)+(ch2>>4))&0x3f));
        str.push(enKey.charAt(ch2<<2&0x3f), '=');
      }else{
        str.push(enKey.charAt(ch1<<4&0x3f), '==');
      }
    }
    //组合各编码后的字符，连成一个字符串。
    return str.join('');
  }
   
  function decode(src){
    //用一个数组来存放解码后的字符。
    var str=new Array();
    var ch1, ch2, ch3, ch4;
    var pos=0;
    //过滤非法字符，并去掉'='。
    src=src.replace(/[^A-Za-z0-9\+\/]/g, '');
    //decode the source string in partition of per four characters.
    while(pos+4<=src.length){
      ch1=deKey[src.charCodeAt(pos++)];
      ch2=deKey[src.charCodeAt(pos++)];
      ch3=deKey[src.charCodeAt(pos++)];
      ch4=deKey[src.charCodeAt(pos++)];
      str.push(String.fromCharCode(
        (ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2), (ch3<<6&0xff)+ch4));
    }
    //给剩下的字符进行解码。
    if(pos+1<src.length){
      ch1=deKey[src.charCodeAt(pos++)];
      ch2=deKey[src.charCodeAt(pos++)];
      if(pos<src.length){
        ch3=deKey[src.charCodeAt(pos)];
        str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4), (ch2<<4&0xff)+(ch3>>2)));
      }else{
        str.push(String.fromCharCode((ch1<<2&0xff)+(ch2>>4)));
      }
    }
    //组合各解码后的字符，连成一个字符串。
    return str.join('');
  }
  var Base64 = {  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" ,
     encode : function (e) {
            var t = "" ;
            var n, r, i, s, o, u, a;
            var f = 0;
           e = Base64._utf8_encode(e);
            while (f < e.length) {
                n = e.charCodeAt(f++);
                r = e.charCodeAt(f++);
                i = e.charCodeAt(f++);
                s = n >> 2;
                o = (n & 3) << 4 | r >> 4;
                u = (r & 15) << 2 | i >> 6;
                a = i & 63;
                 if (isNaN(r)) {
                     u = a = 64
                } else if (isNaN(i)) {
                     a = 64
                }
                t = t + this ._keyStr.charAt(s) + this ._keyStr.charAt(o)
                           + this ._keyStr.charAt(u) + this ._keyStr.charAt(a)
           }
            return t
     },
     decode : function (e) {
            var t = "" ;
            var n, r, i;
            var s, o, u, a;
            var f = 0;
           e = e.replace( /[^A-Za-z0-9+/=]/g , "" );
            while (f < e.length) {
                s = this ._keyStr.indexOf(e.charAt(f++));
                o = this ._keyStr.indexOf(e.charAt(f++));
                u = this ._keyStr.indexOf(e.charAt(f++));
                a = this ._keyStr.indexOf(e.charAt(f++));
                n = s << 2 | o >> 4;
                r = (o & 15) << 4 | u >> 2;
                i = (u & 3) << 6 | a;
                t = t + String.fromCharCode(n);
                 if (u != 64) {
                     t = t + String.fromCharCode(r)
                }
                 if (a != 64) {
                     t = t + String.fromCharCode(i)
                }
           }
           t = Base64._utf8_decode(t);
            return t
     },
     _utf8_encode : function (e) {
           e = e.replace( /rn/g , "n" );
            var t = "" ;
            for ( var n = 0; n < e.length; n++) {
                 var r = e.charCodeAt(n);
                 if (r < 128) {
                     t += String.fromCharCode(r)
                } else if (r > 127 && r < 2048) {
                     t += String.fromCharCode(r >> 6 | 192);
                     t += String.fromCharCode(r & 63 | 128)
                } else {
                     t += String.fromCharCode(r >> 12 | 224);
                     t += String.fromCharCode(r >> 6 & 63 | 128);
                     t += String.fromCharCode(r & 63 | 128)
                }
           }
            return t
     },
     _utf8_decode : function (e) {
            var t = "" ;
            var n = 0;
            var r = c1 = c2 = 0;
            while (n < e.length) {
                r = e.charCodeAt(n);
                 if (r < 128) {
                     t += String.fromCharCode(r);
                     n++
                } else if (r > 191 && r < 224) {
                     c2 = e.charCodeAt(n + 1);
                     t += String.fromCharCode((r & 31) << 6 | c2 & 63);
                     n += 2
                } else {
                     c2 = e.charCodeAt(n + 1);
                     c3 = e.charCodeAt(n + 2);
                     t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3
                                & 63);
                     n += 3
                }
           }
            return t;
     }
}