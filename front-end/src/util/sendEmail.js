// 'use strict';
// import store from '../store/store.js'
// import Web3 from 'web3'
// // import nodemailer from 'nodemailer'

// const nodemailer = require(`${nodemailer}`);
// const transporter = nodemailer.createTransport({
//     service: 'Gmail', 
//     port: 465, 
//     secureConnection: true,
//     auth: {
//         user: "a303162101@gmail.com",
//         pass: "910121Dk"
//     }
// });

// function sendEmail2(mailOptions) {
//     transporter.sendMail(mailOptions, function (error, res) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Message sent");
//         }
//     })
// }
// let sendEmail = function(obj){

//         const mailOptions = {
//                         from: "a303162101@gmail.com", // sender address
//                         to: obj.email, // list of receivers
//                         subject: "Add stock", // Subject line  https://unswddk.github.io/comp9900/#/changePwd/
//                         text: obj.content, // plaintext body
//                     };
//         transporter.sendEmail2(mailOptions, function (error, res) {
//                         if (error) {
//                             console.log(error);
//                         } else {
//                             consloe.log("email Send");
//                         }
//                     })
//         }
// export default sendEmail
