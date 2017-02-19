/**
 * Created by Administrator on 2017/2/18.
 */
var request = require('superagent');
//var sendEmail = require('./sendEmail');
var request2 = require('request');

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

var origin = 'http://passport.vpgame.com',
    urls = {
        land: origin + '/home.html',
        checkIn: origin + '/SignIn.action?register=true'
    };


/**
 * 自动签到
 * @param account {object}
 * @constructor
 */
var options = {}
function AutoCheckIn(account) {
    this.account = account;

    this.cookies = {
        value: null,
        expires: null
    };
    var that = this;


    request
        .post('http://passport.vpgame.com/')
        .send({
            'language':'zh_cn',
            'Register[username]':'qkg99999994',
            'Register[password]':'qkg99999994',
            'Register[retype_password]':'qkg99999994',
            'Register[verify]':'boju',
            'Register[agreen]':1,
            'Register[agreen]':1,
            'Register[email]':'qkg99999994@email.com',
            'Register[id_card]':'420104199009271510',
            'Register[fullname]':'邓克彪',
            'ajax':'user-register-form',
            'yt0':'注册'
        })
        .set('Cookie', 'VPSessionID=na1p1fqunufos7dcq9rqcdrr31; VPMachineAuth=CtcNDElORwzizAPjDtXY5g%3D%3D; VPTimeZone=Asia%2FChongqing; VPLang=zh_CN; _qddaz=QD.bxe37f.rsc0lm.izc914q3; Hm_lvt_20c4cdf230856f4a4479a32ec8b13dd6=1487424844; Hm_lpvt_20c4cdf230856f4a4479a32ec8b13dd6=1487483334; SERVERID=0d2ca33b95b26a4da66e68c58f591595|1487483335|1487483006')
        .type('form')
        .end((err, res) => {
            // 从上图可以看到我们需要的cookie是PHPSESSID开头的
           /* cookie = res.headers['set-cookie'].join(',')
                .match(/(PHPSESSID=.+?);/)[1]*/
           console.log(res.text);

        })
    /*request
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

AutoCheckIn.prototype = {
    constructor: AutoCheckIn,

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

        request
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
            request
                .get(urls.register)
                .set(headers)
                .set('Cookie', cookie.value)
                .end(cb);
        });
    },

    // 签到
    register: function (cb) {
        var that = this;
        request
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


module.exports = function (account) {
    return new AutoCheckIn(account);
};