const nodemailer = require('nodemailer');
var log4js = require('log4js');

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

const mail = {
    /*
     * params.from
     * params.to
     * params.host
     * params.user
     * params.password
     * params.port
     * params.userName
     * params.subject
     * params.content
     * */
    send: (params)=> {


        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: params.host?params.host:'smtp.mxhichina.com',
            port: params.port?params.port:465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: params.user, // generated ethereal user
                pass: params.password  // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: params.userName+' <'+params.user+'>', // sender address
            to: params.to, // list of receivers
            subject: params.subject, // Subject line
            text: '这是一个神奇的网站', // plain text body
            html: params.content // html body
        };


        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return logger.info('send fail'+error);
            }
            logger.info('Message sent: %s', JSON.stringify(info));
        });
    }
}


module.exports = mail;