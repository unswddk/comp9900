'use strict';

const jwt = require('jsonwebtoken');
const dynamodb = require('../todos/dynamodb');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'Gmail', // https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 
    secureConnection: true, // SSL
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
module.exports.forgetPswd = (event, context, callback) => {
    let email = JSON.parse(event.body).email;
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            email: JSON.parse(event.body).email
        },
    };
    dynamodb.get(params, function (error, data) {
        if (error) {
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                },
                body: 'Please Check You Email or Password',
            });
            return;
        }
        if (JSON.stringify(data) === '{}') {
            const response = {
                statusCode: 401,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                  },
                body: 'no such user',
            }
            callback(null, response);
        } else {
            const response = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                },
                body: "Email send",
            };
            let token = jwt.sign({email:JSON.parse(event.body).email},'shhhhh')
            const mailOptions = {
                from: "a303162101@gmail.com", // sender address
                to: JSON.parse(event.body).email, // list of receivers
                subject: "Change Password ✔", // Subject line  https://unswddk.github.io/comp9900/#/changePwd/
                text: "Change Password in the link:https://unswddk.github.io/comp9900/#/changePwd/"+token, // plaintext body
            };
            transporter.sendMail(mailOptions, function (error, res) {
                if (error) {
                    console.log(error);
                } else {
                    callback(null, response);
                }
            })
        }
    })
}
