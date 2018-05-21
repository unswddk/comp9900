'use strict'

const jwt = require('jsonwebtoken');
const dynamodb = require('../todos/dynamodb');
module.exports.changePwd = (event, context, callback) => {
    const token = JSON.parse(event.body).token;
    const pwd = JSON.parse(event.body).password;
    const decode = jwt.verify(token, 'shhhhh');
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            "email": decode.email,
        },
        UpdateExpression: "set password = :p",
        ExpressionAttributeValues: {
            ":p": pwd
        },
        ReturnValues: "ALL_NEW"
    };
    console.log(params);
    dynamodb.update(params, (error, data) => {
        if (error) {
            const response = {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                },
                body: "something wrong",
            };
        } else {
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                },
                body: JSON.stringify(data.Attributes),
            };
            callback(null, response)
        }
    })
}