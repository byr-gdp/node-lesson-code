var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");

var app = express();
var baseUrl = "https://cnodejs.org/"

app.get("/", function(req, res) {
	superagent.get(baseUrl).end(function(err, sres) {
		if(err) {
			return next(err);
		}
		var $ = cheerio.load(sres.text);
		var items = [];
		// var items_author = [];
		// console.log('count:', $("#"))
		$("#topic_list .cell").each(function(i, e) {
			var title = $(e).find(".topic_title").attr("title");
			var href = $(e).find(".topic_title").attr("href");
			var author = $(e).find(".user_avatar.pull-left").attr("href").slice(6);
			items.push({
				title: title,
				href: href,
				author: author
			})
		})
		// $("#topic_list .user_avatar.pull-left").each(function(i, e) {
		// 	var author = $(e).attr("href");
		// 	author = author.slice(6);
		// 	// items_author.push(author);
		// 	console.log(author);
		// })
		res.send(items);
	})
})

app.listen(3000, function() {
	console.log("listen at port 3000");
})