var async = require("async");

var currentCount = 0;
var fetchUrl = function(url, callback) {
  var delay = parseInt((Math.random() * 1000000) % 2000, 10)
  currentCount++;
  console.log("现在并发数是 " + currentCount + " 正在抓取 " + url + " 延时 " + delay + " ms");
  setTimeout(function() {
    currentCount--;
    callback(null, url + ' html content');
  }, delay)
}

var urls = [];
for(var i = 0; i < 30; i++) {
  urls.push('http://datasource_' + i);
}

// 并发控制，使用 mapLimit
async.mapLimit(urls, 5, function (url, callback) {
  fetchUrl(url, callback);
}, function (err, result) {
  console.log('final:');
  console.log(result);
});