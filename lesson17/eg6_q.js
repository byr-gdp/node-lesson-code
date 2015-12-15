var Q = require('q');
var defer = Q.defer();
/**
 * 获取初始promise
 * @private
 */
function getInitialPromise() {
  return defer.promise;
}
/**
 * 为promise设置progress信息处理函数
 */
var outputPromise = getInitialPromise().then(function(success){

}).progress(function(progress){
    console.log(progress);
});

defer.notify(1);
defer.notify(2); //控制台打印1，2