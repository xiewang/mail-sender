const mail = require('./mail.js');
const fs = require("fs");

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

