const mail = require('./mail.js');
const fs = require("fs");
var log4js = require('log4js');
var chokidar = require('chokidar');
var Promise = require('bluebird');
Promise.promisifyAll(fs);
var _ = require('lodash');

log4js.configure({
    appenders: {
        out: {type: 'stdout'},
        app: {type: 'file', filename: 'application.log'}
    },
    categories: {
        default: {appenders: ['out', 'app'], level: 'debug'}
    }
});
var logger = log4js.getLogger();
logger.level = 'debug';

logger.info(__dirname + '/mails.txt')
var watcher = chokidar.watch(__dirname + '/mails.txt', {
    ignored: /[\/\\]\./, persistent: true
});
watcher.on('change', function (path) {
    logger.info('mail File', path, 'has been changed');
    setTimeout(function(){
        fs.readFile(__dirname + '/mails.txt', 'utf-8', function (err, data) {

            if (err) {
                logger.error('read mails failure'+err);
                return false
            } else {
                var mails = JSON.parse(data);
                if(!mails[mails.length - 1].sent){
                    loadnewEmails().then(function(res){
                        _.each(res, function(v){
                            logger.info('send to'+ v.mail)
                            send(v.mail);
                        });
                    })
                }
            }
        });
    },200);


    //send();
});

var send = function (address) {
    fs.readFile(__dirname + '/doc.html', 'utf-8', function (err, data) {
        var num = Math.ceil(Math.random() * 99);
        if(num<10){
            num = '0'+num;
        }
        if (err) {
            logger.error('read email doc failure'+err);
            return false
        } else {
            const params = {
                content: data,
                from: 'service'+num+'@996shop.com',
                to: address,
                user: 'service'+num+'@996shop.com',
                password: '***',
                userName: '半刀网',
                subject: '半刀网，和你一起过好双11'
            };
            mail.send(params);
        }
    });
};

var loadnewEmails = function () {
    var ret = [];
    return new Promise(function (resolve, reject) {
        fs.readFileAsync(__dirname + '/mails.txt', 'utf8').then(function (text) {

            var json = {};
            if (text && text.length > 0) {
                try {
                    json = JSON.parse(text);
                } catch (e) {
                }
            }

            _.each(json, function(v,k){
                if(!v.sent){
                    ret.push(v);
                    json[k].sent = true;
                }
            });
            resolve(ret);

            fs.writeFile(__dirname + '/mails.txt', JSON.stringify(json), function (err) {
                if (err) {
                    logger.error('update mails failure'+err);
                };
            });

        });
    });

}


