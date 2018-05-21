'use strict';

const uuid = require('uuid');
const dynamodb = require('../todos/dynamodb');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.USER_TABLE,
        Item: {
            id: uuid.v1(),
            username: data.username,
            email: data.email,
            password: data.password,
            gender: data.gender,
            prof: [{
                title:'default',
                element: [],
                isSeclected: true
            }]
        },
        // ExpressionAttributeNames : {
        //     '#un' : 'username',
        //     '#email' : 'email',
        // },
        // ConditionExpression : '#un <> :un OR #email <> :email',
    };
    // write the todo to the database
    dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                  },
                body: 'Couldn\'t create this user.',
            });
            return;
        }
        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Request-Method": "POST",
                "Access-Control-Request-Headers": "*"
            },
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};