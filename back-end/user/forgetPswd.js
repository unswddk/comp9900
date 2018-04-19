'use strict';

const dynamodb = require('../todos/dynamodb');
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'Gmail', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: "a303162101@gmail.com",
        pass: "910121Dk"
    }
  });        
function sendEmail(mailOptions){   
     transporter.sendMail(mailOptions, function(error, res){
    if(error){
        // console.log(error);
    }else{
        console.log("Message sent: " );
    }})
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
        if(error){
            console.log(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Please Check You Email or Password',
            });
            return;
        }
        if(JSON.stringify(data) === '{}'){
            const response = {
                statusCode: 401,
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                },
                body: 'user not exit',
            }
            callback(null, response);
        }else{
            const response = {
                statusCode: 200,
                headers: {
                    'Content-Type': 'text/plain',
                    'Access-Control-Allow-Origin': '*',
                },
                body: "Email send",
            };
            const mailOptions = {
                from: "a303162101@gmail.com", // sender address
                to: JSON.parse(event.body).email, // list of receivers
                subject: "Change Password ✔", // Subject line
                text: "Change Password in the link: ", // plaintext body
            }; 
            transporter.sendMail(mailOptions, function(error, res){
                if(error){
                    console.log(error);
                }else{
                    callback(null,response);
                }})
            }})
        }
