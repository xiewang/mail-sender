'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mxhichina.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'service02@996shop.com', // generated ethereal user
            pass: '***'  // generated ethereal password
        }
    });

// setup email data with unicode symbols
let mailOptions = {
    from: '"半刀网" <service02@996shop.com>', // sender address
    to: '1010658096@qq.com,jslxy-4854@163.com', // list of receivers
    subject: '你怎么还没用半刀网', // Subject line
    text: '这是一个神奇的网站', // plain text body
    html: '<b>这是一个神奇的网站，购物省钱，省到不要不要的，还不快去看看</b><br/><b>http://996shop.com</b><br/><img src="http://996shop.com/wp-content/themes/hao-Super%20v2.0.7/img/logo.png" >' // html body
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
});