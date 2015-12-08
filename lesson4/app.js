var eventproxy = require("eventproxy");
var superagent = require("superagent");
var cheerio    = require("cheerio");
var async      = require("async");
var url        = require("url");

var baseUrl = "https://cnodejs.org/";	// 使用 url.resolve
var baseUrl = "https://cnodejs.org"; 	// 不使用 url.resolve

superagent.get(baseUrl).end(function(err, res){
	if(err) {
		return next(err);
	}
	var $ = cheerio.load(res.text);
	var topicUrls = [];
	$("#topic_list .topic_title").each(function(i, e) {
		var href = url.resolve(baseUrl, $(e).attr("href"));
		// var href = baseUrl + $(e).attr("href");
		// console.log(i + ":" + href);
		topicUrls.push(href);
	})
	// console.log("result:", topicUrls);
	
	// 控制并发
	var ep = new eventproxy();
	
	ep.after("topic_html", topicUrls.length, function(topics) {
		var userUrls = [];
		topics = topics.map(function(topicPair) {
			var topicUrl = topicPair[0];
			var topicHtml = topicPair[1];
			var $ = cheerio.load(topicHtml);
			// 可能帖子没有回复，所以用户 url 获取不到
			userUrls.push($(".dark.reply_author").eq(0).attr("href"));
			return ({
				title: $(".topic_full_title").text(),
				href: topicUrl,
				comment1: $(".reply_content").eq(0).text().trim(),
				author1: $(".dark.reply_author").eq(0).text().trim()
			}) 
		})
		console.log("final:");
		console.log(topics);
		console.log(userUrls);
		
	})
	
	// 限制并发
	// https://github.com/alsotang/node-lessons/issues/60
	async.eachLimit(topicUrls, 5, function(topicUrl, callback) {
		superagent.get(topicUrl).end(function(err, res) {
			// console.log('fetch ' + topicUrl + ' successful');
			// console.log(res.status);
			ep.emit('topic_html', [topicUrl, res.text]);
			callback();
		});
	}, function(err) {
		console.log(err);
	});
	
	// 未考虑限制并发，会出
	// topicUrls.forEach(function(topicUrl) {
	// 	superagent.get(topicUrl).end(function(err, res) {
	// 		// 不限制并发会出现服务器拒绝服务
	// 		// if(err) {
	// 			// return next(err);
	// 			// console.log(err);
	// 		// }
	// 		ep.emit("topic_html", [topicUrl, res.text])
	// 	})
	// })
})

