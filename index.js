const mail = require('./mail.js');
const fs = require("fs");
var log4js = require('log4js');
var chokidar = require('chokidar');
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

logger.info(__dirname+'/mails.txt')
var watcher = chokidar.watch(__dirname+'/mails.txt', {
    ignored: /[\/\\]\./, persistent: true
});
watcher.on('change', function(path) {
    logger.info('mail File', path, 'has been changed');
    send;
})
var send = function(){
    fs.readFile(__dirname + '/doc.html', 'utf-8', function (err, data) {

        if (err) {
            console.log(err);
            return false
        } else {
            const params = {
                content: data,
                from: 'service01@996shop.com',
                to: '1010658096@qq.com',
                user: 'service01@996shop.com',
                password: '***',
                userName: '半刀网',
                subject: '半刀网，和你一起过好双11'
            };
            mail.send(params);
        }
    });
}


