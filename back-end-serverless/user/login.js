'use strict'

const jwt = require('jsonwebtoken');
const JWT_EXPIRATION_TIME = '5m';
const dynamodb = require('../todos/dynamodb');
module.exports.login = (event, context, callback) => {
    const input = JSON.parse(event.body);
    let result;
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            email: input.email
        },
    };
    const token = jwt.sign({
        email: input.email,
        password: input.password
    }, 'shhhhh', {
        expiresIn: '10h'
    });
    dynamodb.get(params, function (error, data) {
        if (error) {
            console.error(error);
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
        } else {
            //可能取到的时个{}
            if(JSON.stringify(data) === '{}'){
                const response = {
                    statusCode: 401,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Request-Method": "POST",
                        "Access-Control-Request-Headers": "*"
                      },
                    body: 'Please Check You Email or Password',
                }
                callback(null, response);
            }else if(data.Item.password != input.password){ //可能密码不正确
                const response = {
                    statusCode: 401,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Request-Method": "POST",
                        "Access-Control-Request-Headers": "*"
                      },
                    body: 'Please Check You Email or Password',
                }
                callback(null, response);
            }else{
                const response = { // Success response
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
                        "Access-Control-Allow-Headers":"*"
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
