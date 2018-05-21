'use strict';

const rp = require('request-promise');
module.exports.getTechIndicators = (event, context, callback) => {
    let code = event.pathParameters.id;
    const result = {};
    let promise2 = rp("https://www.alphavantage.co/query?function=SMA&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise3 = rp("https://www.alphavantage.co/query?function=EMA&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise5 = rp("https://www.alphavantage.co/query?function=STOCH&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise6 = rp("https://www.alphavantage.co/query?function=RSI&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise7 = rp("https://www.alphavantage.co/query?function=ADX&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise8 = rp("https://www.alphavantage.co/query?function=AD&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    let promise9 = rp("https://www.alphavantage.co/query?function=OBV&symbol=" + code + ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901")
    Promise.all([promise2, promise3, promise5, promise6, promise7, promise8, promise9]).then(function (values) {
        values.forEach(e => {
            let data = JSON.parse(e);
            ["SMA", "EMA", "MACD", "RSI", "ADX", "AD", "OBV"].forEach(f => {
                if (data["Technical Analysis: " + f]) {
                    let keys = Object.keys(data["Technical Analysis: "+ f]);
                    if (keys.length > 0) {
                        result[f] = data["Technical Analysis: "+ f][keys[keys.length - 1]][f];
                    }
                }
            });
        });
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
                "Access-Control-Allow-Headers":"*"
            },
            body: JSON.stringify(result),
        };
        callback(null, response);
    }).catch(error=>{
        const response = {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS",
                "Access-Control-Allow-Headers":"*"
            },
            body: JSON.stringify({}),
        };
        callback(null, response);
    });
}
