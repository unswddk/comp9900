'use strict';

const uuid = require('uuid');
const dynamodb = require('../todos/dynamodb');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    console.error(event.body);
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
    };
    // write the todo to the database
    dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {
                    'Content-Type': 'text/plain',
                    "Access-Control-Allow-Origin": "http://localhost:8080"
                },
                body: 'Couldn\'t create the todo item.',
            });
            return;
        }
        // create a response
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:8080"
            },
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};