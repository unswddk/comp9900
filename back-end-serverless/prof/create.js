'use strict';

const uuid = require('uuid');
const dynamodb = require('../todos/dynamodb');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            "email": data.email,
        },
        UpdateExpression: "set prof = :p",
        ExpressionAttributeValues: {
            ":p": data.prof
        },
        ReturnValues: "UPDATED_NEW"
    };
    dynamodb.update(params, function (err, data) {
        if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
                const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "*"
    },
      body: JSON.stringify(data),
    };
    console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    callback(null, response);
        }
    });
}
//   // write the todo to the database
//   dynamodb.put(params, (error) => {
//     // handle potential errors
//     if (error) {
//       console.error(error);
//       callback(null, {
//         statusCode: error.statusCode || 501,
//         headers: { 'Content-Type': 'text/plain' },
//         body: 'Couldn\'t create the todo item in database.',
//       });
//       return;
//     }

//     // create a response

// };