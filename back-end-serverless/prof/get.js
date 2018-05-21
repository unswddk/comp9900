'use strict';

// const uuid = require('uuid');
const dynamodb = require('../todos/dynamodb');

module.exports.get = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.USER_TABLE,
        Key: {
            "email": data.email,
        }
    };
    dynamodb.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            const response = {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "*"
                },
                body: JSON.stringify(data.Item),
            };
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
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(params.Item),
//     };
//     callback(null, response);
//   });
// };