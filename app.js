/**
 * Created by qiankun on 2017/2/18.
 */
var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');
app.get('/', function(req, res){
    request('http://www.geetest.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);//当前的$,它是拿到了整个body的前端选择器
            console.log($('.link')[0]); //我博客的获取用户名
        }else{
            console.log("思密达，没爬取到用户名，再来一次");
        }
    })
});
app.listen(3000);
