// 'use strict';

// // const uuid = require('uuid');
// const dynamodb = require('../todos/dynamodb');
// const http = require('http');
// module.exports.getTechIndicators = (event, context, callback) => {
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=SMA&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             if (response.data["Technical Analysis: SMA"]) {
//               let keys = Object.keys(response.data["Technical Analysis: SMA"]);
//               if (keys.length > 0) {
//                 this.SMA =
//                   response.data["Technical Analysis: SMA"][
//                     keys[keys.length - 1]
//                   ]["SMA"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=EMA&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             //      console.log('2');
//             // console.log(response);
//             if (response.data["Technical Analysis: EMA"]) {
//               let keys = Object.keys(response.data["Technical Analysis: EMA"]);
//               if (keys.length > 0) {
//                 this.EMA =
//                   response.data["Technical Analysis: EMA"][
//                     keys[keys.length - 1]
//                   ]["EMA"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=MACD&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             if (response.data["Technical Analysis: MACD"]) {
//               let keys = Object.keys(response.data["Technical Analysis: MACD"]);
//               if (keys.length > 0) {
//                 this.MACD =
//                   response.data["Technical Analysis: MACD"][
//                     keys[keys.length - 1]
//                   ]["MACD"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=STOCH&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&slowkmatype=1&slowdmatype=1&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             if (response.data["Technical Analysis: STOCH"]) {
//               let keys = Object.keys(
//                 response.data["Technical Analysis: STOCH"]
//               );
//               if (keys.length > 0) {
//                 this.SlowD =
//                   response.data["Technical Analysis: STOCH"][
//                     keys[keys.length - 1]
//                   ]["SlowD"];
//                 this.SlowK =
//                   response.data["Technical Analysis: STOCH"][
//                     keys[keys.length - 1]
//                   ]["SlowK"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=RSI&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             if (response.data["Technical Analysis: RSI"]) {
//               let keys = Object.keys(response.data["Technical Analysis: RSI"]);
//               if (keys.length > 0) {
//                 this.RSI =
//                   response.data["Technical Analysis: RSI"][
//                     keys[keys.length - 1]
//                   ]["RSI"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=ADX&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             if (response.data["Technical Analysis: ADX"]) {
//               let keys = Object.keys(response.data["Technical Analysis: ADX"]);
//               if (keys.length > 0) {
//                 this.ADX =
//                   response.data["Technical Analysis: ADX"][
//                     keys[keys.length - 1]
//                   ]["ADX"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=CCI&symbol=" +
//             this.model10 +
//             ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             // if(response.body){
//             if (response.data["Technical Analysis: CCI"]) {
//               let keys = Object.keys(response.data["Technical Analysis: CCI"]);
//               if (keys.length > 0) {
//                 this.CCI =
//                   response.data["Technical Analysis: CCI"][
//                     keys[keys.length - 1]
//                   ]["CCI"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=AD&symbol=" +
//             this.model10 +
//             ".ax&interval=daily&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');

//             if (response.data["Technical Analysis: Chaikin A/D"]) {
//               let keys = Object.keys(
//                 response.data["Technical Analysis: Chaikin A/D"]
//               );
//               if (keys.length > 0) {
//                 this.AD =
//                   response.data["Technical Analysis: Chaikin A/D"][
//                     keys[keys.length - 1]
//                   ]["Chaikin A/D"];
//               }
//             }
//           },
//           response => {}
//         );
//       this.$http
//         .get(
//           "https://www.alphavantage.co/query?function=OBV&symbol=" +
//             this.model10 +
//             ".ax&interval=weekly&apikey=D29LHM3HC6349901"
//         )
//         .then(
//           response => {
//             // console.log('1');
//             if (response.data["Technical Analysis: OBV"]) {
//               let keys = Object.keys(response.data["Technical Analysis: OBV"]);
//               if (keys.length > 0) {
//                 this.OBV =
//                   response.data["Technical Analysis: OBV"][
//                     keys[keys.length - 1]
//                   ]["OBV"];
//               }
//             }
//           },
//           response => {}
//         );
//     },
// }