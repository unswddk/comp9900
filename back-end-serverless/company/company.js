module.exports.getCompanyInfo = (event, context, callback) => {
    const fs = require('fs');
    const obj = JSON.parse(fs.readFileSync("./company/company.json", 'utf8'));
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Request-Method": "GET",
        "Access-Control-Request-Headers": "*"
    },
      body: JSON.stringify({
        company: obj,
      }),
    };
    callback(null, response);
  };
  