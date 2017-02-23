/**
 * Created by qiankn on 2017/2/23.
 */
/**
 * Created by Administrator on 2017/2/18.
 */
var superagent = require('superagent');
//var sendEmail = require('./sendEmail');
var request = require('request');
var crypto = require('crypto');
var cheerio = require('cheerio');
var fs = require('fs');
var tesseract = require('node-tesseract');
var ids=require('./ids')
// Recognize text of any language in any format


var md5 = function (str) {
    return crypto.createHash('md5').update(String(str)).digest('hex');
};


function make10Hash() {
    return md5(new Date().getTime()).slice(0, 10)
}

var homeHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Host': 'passport.vpgame.com',
    'Upgrade-Insecure-Requests': 1,
    'Pragma': 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
}

var registerUrl = 'http://passport.vpgame.com'

var headers = {
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    Origin: 'http://passport.vpgame.com',
    'X-FirePHP-Version': '0.0.6',
    'Content-Type': 'application/x-www-form-urlencoded',
    Referer: 'http://passport.vpgame.com/home.html?redirect=http://www.vpgame.com/',
    Pragma: 'no-cache',
    Host: 'passport.vpgame.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',

};


var origin = 'http://passport.vpgame.com',
    urls = {
        land: origin + '/home.html',
        checkIn: origin + '/SignIn.action?register=true'
    };


function register(account) {
    var that = this;
    this.account = make10Hash();
    this.pwd = make10Hash();
    this.cookie = '';
    superagent
        .get(registerUrl)
        .set(homeHeaders)
        //.type('form')
        /*.send({
         backurl: null,
         backurl2: null,
         chk: null,
         chkType: 'on',
         loginType: 0,
         mobile: that.account.user,
         password: that.account.password
         })*/
        .redirects(0) // 防止页面重定向
        .end(function (err, result) {
            var $ = cheerio.load(result.text);
            var imgUrl = $('#register-verify')[0].attribs.src;
            var imgPath = './img/' + make10Hash() + '.png';
            var cookies = result.headers['set-cookie'].map(function (cookie) {
                return cookie.split(';')[0]
            });
            var cookie = cookies.join(';')
            console.log(cookie);
            /* that.cookie = {
             value: cookie,
             expires: cookie.join().match(/Expires=(.*);/)[1]
             };
             */
            request(registerUrl + imgUrl)
                .pipe(fs.createWriteStream(imgPath))
                .on('close', function () {
                    console.log('Done : ', imgPath);
                    tesseract.process(__dirname +'/../'+ imgPath, function (err, text) {
                        console.log(err);
                        console.log(text);
                        if (text.length>4){
                            that.captcha = text.split[' '].join('');
                        }
                       else {
                            that.captcha = text
                        }

                        superagent
                            .post('http://passport.vpgame.com/')
                            .send({
                                'language': 'zh_cn',
                                'Register[username]': that.account,
                                'Register[password]': that.pwd,
                                'Register[retype_password]': that.pwd,
                                'Register[verify]': that.captcha,
                                'Register[agreen]': 1,
                                'Register[agreen]': 1,
                                'Register[email]': that.account + '@email.com',
                                'Register[id_card]': '420104199009271510',
                                'Register[fullname]': '石头',
                                'yt0': '注册'
                            })
                            .set('Cookie', that.cookie)
                            .type('form')
                            .end((err, res) => {
                                // 从上图可以看到我们需要的cookie是PHPSESSID开头的
                                /* cookie = res.headers['set-cookie'].join(',')
                                 .match(/(PHPSESSID=.+?);/)[1]*/
                                console.log(res.text);
                            })
                    });
                });
        });

    /*superagent
     .post('http://passport.vpgame.com/home/checkVerify')
     .send({
     Register_username:'qkg99999994',
     Register_password:'qkg99999994',
     Register_retype_password:'qkg99999994',
     Register_verify:'boju'
     })
     .set('Cookie', 'VPSessionID=na1p1fqunufos7dcq9rqcdrr31; VPMachineAuth=CtcNDElORwzizAPjDtXY5g%3D%3D; VPTimeZone=Asia%2FChongqing; VPLang=zh_CN; _qddaz=QD.bxe37f.rsc0lm.izc914q3; Hm_lvt_20c4cdf230856f4a4479a32ec8b13dd6=1487424844; Hm_lpvt_20c4cdf230856f4a4479a32ec8b13dd6=1487483334; SERVERID=0d2ca33b95b26a4da66e68c58f591595|1487483335|1487483006')
     .type('form')
     .end((err, res) => {
     // 从上图可以看到我们需要的cookie是PHPSESSID开头的
     /!* cookie = res.headers['set-cookie'].join(',')
     .match(/(PHPSESSID=.+?);/)[1]*!/
     console.log(res.text);
     })*/
    /*
     var j = request2.jar();
     var cookie = request2.cookie('VPMachineAuth=pZeLG6C%2Fr1XizAPjDtXY5g%3D%3D; VPTimeZone=Asia%2FChongqing; VPSessionID=6rg45u9c2lpmls9b5i6ee7a9f2; VPLang=zh_CN; Hm_lvt_20c4cdf230856f4a4479a32ec8b13dd6=1487424844; Hm_lpvt_20c4cdf230856f4a4479a32ec8b13dd6=1487478279; SERVERID=293a803c8a3bdcbd91f486da0782e0bf|1487478278|1487477716');
     var url = 'http://www.google.com';
     j.setCookie(cookie, 'http://passport.vpgame.com/');*/

    //this.init();
    /*request2('http://passport.vpgame.com/home.html', function (error, response, body) {
     if (!error && response.statusCode == 200) {
     console.log(response.headers['set-cookie'])
     } else {
     console.log("思密达，没爬取到用户名，再来一次");
     }
     })*/
    /*
     request2(
     {
     method: 'POST',
     url: 'http://passport.vpgame.com/',
     jar: j,
     formData: {
     /!*Register_username: 'qkg9999999',
     Register_password: "request2('http://pas",
     Register_retype_password: "request2('http://pas",
     Register_verify: 'gonv'*!/
     'language':'zh_cn',
     'Register[username]':'qkg99999992',
     'Register[password]':'qkg99999992',
     'Register[retype_password]':'qkg99999992',
     'Register[verify]':'gaxu',
     'Register[agreen]':1,
     'Register[agreen]':1,
     'Register[email]':'qkg9999999@email.com',
     'Register[id_card]':'420104199009271510',
     'Register[fullname]':'邓克彪',
     'ajax':'user-register-form',
     'yt0':'注册'
     }
     }, function (error, response, body) {
     if (!error && response.statusCode == 200) {
     console.log(response.body);
     } else {
     console.log("思密达，没爬取到用户名，再来一次");
     }
     })*/
}

register.prototype = {

    init: function () {
        this.register(function () {
            //sendEmail(that.account.user + '，签到完毕。 ' + new Date());
            console.log('======', '注册完毕，' + that.account.user, '======');
        });
    },

    // 验证登录，如果凭证没过期，无需重新验证
    /*_verify: function (cb) {
     Date.now() > this.cookie.expires ? this._land(cb) : cb(this.cookie);
     },*/

    // 登录
    _land: function (cb) {
        var that = this;

        superagent
            .get(urls.land)
            .set(homeHeaders)
            //.type('form')
            /*.send({
             backurl: null,
             backurl2: null,
             chk: null,
             chkType: 'on',
             loginType: 0,
             mobile: that.account.user,
             password: that.account.password
             })*/
            //.redirects(0) // 防止页面重定向
            .end(function (result) {
                var cookie = result.headers['set-cookie'];
                that.cookie = {
                    value: cookie,
                    expires: cookie.join().match(/Expires=(.*);/)[1]
                };

                cb(that.cookie);
            });

        that._verify(function (cookie) {
            superagent
                .get(urls.register)
                .set(headers)
                .set('Cookie', cookie.value)
                .end(cb);
        });
    },

    register: function (cb) {
        var that = this;
        superagent
            .get('http://passport.vpgame.com/home.html')
            // .get('http://www.baidu.com')
            .set(homeHeaders)
            //.type('form')
            /*.send({
             backurl: null,
             backurl2: null,
             chk: null,
             chkType: 'on',
             loginType: 0,
             mobile: that.account.user,
             password: that.account.password
             })*/
            //.redirects(0) // 防止页面重定向
            .end(function (result) {
                console.log(result)
                var cookie = result.headers['set-cookie'];
                that.cookie = {
                    value: cookie,
                    expires: cookie.join().match(/Expires=(.*);/)[1]
                };

                console.log(that.cookie);
                console.log(that.account)
            });
    }
};
var registerObj = new register();
module.exports = registerObj