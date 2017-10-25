'use strict';
const nodemailer = require('nodemailer');
var fs = require("fs");
// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {


    const send = (params)=> {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.mxhichina.com',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'service01@996shop.com', // generated ethereal user
                pass: '＊＊＊'  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"半刀网" <service01@996shop.com>', // sender address
            to: '1010658096@qq.com,xiewang0501@126.com', // list of receivers
            subject: '半刀网，和你一起过好双11', // Subject line
            text: '这是一个神奇的网站', // plain text body
            html: params.body // html body
        };


        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    };

    fs.readFile(__dirname + '/doc.html', 'utf-8', function (err, data) {

        if (err) {
            console.log(err)
            return false
        } else {
            const params = {
                body: data
            }
            send(params)
        }
    });
});