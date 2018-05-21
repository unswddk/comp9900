import store from '../store/store.js'
import Web3 from 'web3'




function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
      return true;
    }
  }
  return false;
};
//uint key; bytes32 code; bytes32 state; bytes32 buyDate; bytes32 sellDate; uint amount; uint price;
// let getAllPortfolio = new Promise((resolve,reject)=>{
//     store.state.portfolioInstace().getAllPortfolio((err, result) => {
//         if (err) {
//         } else {
//             console.log(result);
//         resolve(result);
//         }
// })

// let getPortfolio = new Promise((resolve,reject)=>{
//     getAllPortfolio.then(result=>{
//         result.map(element => {
//             store.state.portfolioInstace().getPortfolioList(
//                 element,(err,res)=>{     
//                     if(err){
//                         console.log(err);
//                     }else{
//                         resolve(res)
//                     }})
//         })}
//     )
// })

let allPortfolio={}
let getPortfolioInstance =  function (state) {
    let web3 = window.web3 
    web3 = new Web3(web3.currentProveider) 
    setInterval(() => {
    store.state.portfolioInstace().getAllPortfolio((err, result) => {
                if (err) {
                } else {
                    result.map(element => {
                        // var portfolioCopy={
                        //     name:'',
                        //     portfolioName:'',
                        //     email:'',
                        //     state:'',
                        //     balance:null,
                        //     donation:'',
                        //     index:null,
                        //     earn:null,
                        //     likeNumber:'',
                        //     followers:[],
                        //     follows:[],
                        //     stockKeys:[],
                        //     stocks:[]
                        // };
                        // allPortfolio[element]={};
                        store.state.portfolioInstace().getPortfolioList(
                            element,(err,res)=>{     
                                if(err){
                                    console.log(err);
                                }else{
                                    //need to call the store action
                                    // allPortfolio[element][followers] = res[0];
                                    // allPortfolio[element][follows] = res[1];
                                    // allPortfolio[element][stockKeys] = res[2];  
                                    // allPortfolio[element][stocks] = [];
                                    let lists = {
                                        followers:res[0].map(e=>web3.toAscii(e).replace(/\u0000/g, '')),
                                        follows:res[1],
                                        stockKeys:res[2].map(e=>e["c"][0]),
                                    }
                                    store.dispatch("updatePortfolio",{
                                        element:element,
                                        payload:lists
                                    });                         
                                    // portfolioCopy.followers=res[0];
                                    // portfolioCopy.follows=res[1];
                                    // portfolioCopy.stockKeys=res[2];

                                    //get the stock ids store in bc,loop it and find the stock info
                                    res[2].forEach(e => {
                                        store.state.portfolioInstace().getStockById(element,
                                        e["c"][0],(err,res)=>{
                                        if(err)console.log(err);
                                        if(res){
                                            // console.log(res);
                                        let stock = {
                                                id:res[4]["c"][0],
                                                code:web3.toAscii(res[0]).replace(/\u0000/g, ''),
                                                state:web3.toAscii(res[1]).replace(/\u0000/g, ''),
                                                buyDate:web3.toAscii(res[5]).replace(/\u0000/g, ''),
                                                sellDate:web3.toAscii(res[6]).replace(/\u0000/g, ''),
                                                amount:res[2]["c"][0],
                                                price:res[3]["c"][0]
                                            };
                                            // allPortfolio[element][stocks].push(stock);
                                            store.dispatch("updateStocks",{
                                                    element:element,
                                                    stock: stock
                                                });
                                            //need to call a store action
                                        }
                                        });
                                    });
                                    // store.dispatch("updatePortfolio",portfolioCopy);
                                }});
                        store.state.portfolioInstace().getPortfolioNumbers(
                            element,(err,res)=>{     
                                if(err){
                                    console.log(err);
                                }else{
                                    // console.log(res);
                                    // portfolioCopy.balance=res[0]["c"][0];
                                    // portfolioCopy.donation = res[1]["c"][0];
                                    // portfolioCopy.index = res[2]["c"][0];
                                    // portfolioCopy.earn =res[3]["c"][0];
                                    // portfolioCopy.likeNumber = res[4]["c"][0]
                                    //need to call a store action
                                    let numbers= {
                                        balance:res[0]["c"][0],
                                        donation:res[1]["c"][0],
                                        index:res[2]["c"][0],
                                        earn:res[3]["c"][0],
                                        likeNumber:res[4]["c"][0]
                                    }
                                    store.dispatch("updatePortfolio",{
                                        element:element,
                                        payload:numbers
                                    });
                                }})
                        store.state.portfolioInstace().getPortfolio(
                            element,(err,res)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    // console.log(res);
                                    //need to call a store action

                                    let stringProt ={
                                        name:web3.toAscii(res[0]).replace(/\u0000/g, ''),
                                        portfolioName :web3.toAscii(res[1]).replace(/\u0000/g, ''),
                                        email:web3.toAscii(res[2]).replace(/\u0000/g, ''),
                                        state :web3.toAscii(res[3]).replace(/\u0000/g, '')
                                    }
                                    store.dispatch("updatePortfolio",{
                                        element:element,
                                        payload:stringProt
                                    });
                                    // portfolioCopy.name = web3.toAscii(res[0]).replace(/\u0000/g, '');
                                    // portfolioCopy.portfolioName =web3.toAscii(res[1]).replace(/\u0000/g, '');
                                    // portfolioCopy.email=web3.toAscii(res[2]).replace(/\u0000/g, '');
                                    // portfolioCopy.state =web3.toAscii(res[3]).replace(/\u0000/g, '')

                                }});
                    });
                   
                }
                  })
                }, 500);
                }
export default getPortfolioInstance
