let http = require('http');



// let urls = [
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",
//     "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901",   
// ]

 


















let getCoinInfo =new Promise( (resolve,reject)=>{
    http.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=AUD&apikey=D29LHM3HC6349901',
        (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
              });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              console.log(JSON.parse(data));
              resolve(JSON.parse(data))
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          })
})
export default getCoinInfo