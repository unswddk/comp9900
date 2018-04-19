'use strict';

const jwt = require('jsonwebtoken');
const JWT_EXPIRATION_TIME = '5m';
const dynamodb = require('../todos/dynamodb');
module.exports.login = (event, context, callback) => {
    let user = event.queryStringParameters;
    let result;
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            email: event.queryStringParameters.email
        },
    };
    const token = jwt.sign({
        email: user.email,
        password: user.password
    }, 'shhhhh', {
        expiresIn: '10h'
    });
    dynamodb.get(params, function (error, data) {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: 'Please Check You Email or Password',
            });
            return;
        } else {
            console.log(data);
            //可能取到的时个{}
            if(JSON.stringify(data) === '{}'){
                const response = {
                    statusCode: 401,
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: 'Please Check You Email or Password',
                }
                callback(null, response);
            }else if(data.Item.password != event.queryStringParameters.password){ //可能密码不正确
                const response = {
                    statusCode: 401,
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    body: 'Please Check You Email or Password',
                }
                callback(null, response);
            }else{
                const response = { // Success response
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    },
                    body: JSON.stringify({
                        token,data
                    }),
                };
                callback(null, response);
            }
        }
    });

}
