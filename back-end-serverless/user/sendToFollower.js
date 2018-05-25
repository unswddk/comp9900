'use strict';

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'Gmail', // ttps://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 
    secureConnection: true, //SSL
    auth: {
        user: "a303162101@gmail.com",
        pass: "910121Dk"
    }
});

function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, res) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent");
        }
    })
}
module.exports.sendToFollower = (event, context, callback) => {
    let email = JSON.parse(event.body).email;

    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "*"
        },
        body: "Email send",
    };
    const mailOptions = {
        from: "a303162101@gmail.com", // sender address
        to: JSON.parse(event.body).email, // list of receivers
        subject: "Stock Infomation", // Subject line  https://unswddk.github.io/comp9900/#/changePwd/
        text: JSON.parse(event.body).content
    };
    transporter.sendMail(mailOptions, function (error, res) {
        if (error) {
            console.log(error);
        } else {
            callback(null, response);
        }
    })
    }
