import Web3 from 'web3'
import store from '../store/store.js'


let pollWeb3 = function(state){
    let web3  = window.web3//new a web3 instance3
    web3 = new Web3(web3.currentProveider)//get the currentProvediver and pass it to a new web3
    setInterval(()=>{//setInterval function to continues get the provider information
        if(web3 & store.state.web3.web3Instance){// if there is a web3 install in this brower and the storejs have a web3Instance
            //this two may be same or diff
            if(web3.eth.coinbase !== store.state.web3.coinbase){//  if we get the web.coinbase is not the same as the store info
                let newCoinbase = web3.eth.coinbase//get the new coinbase from web3
                web3.eth.getBalances(web3.eth.coinbase,function(err,newBalance){//get the bablance this is a asys function.(coinbase, and a callbcak funciton)
                    if(err){// if we get err
                        console.log(err)//log this err
                    }else{
                        store.dispatch('pollWeb3',{//if we get the new balance,call the store action pollweb3 with such payload
                            coinbase:newCoinbase,//coinbase
                            balance:parseInt(newBalance,10)//balance
                        })
                    }
                })
            }
        }else{//if this two have the same balance
            web3.eth.getBalances(store.state.web3.coinbase,(err,polledBalance)=>{//check their balance,because the balance may change
                if(err){
                    console.log(err)
                }else if(parseInt(polledBalance,10)!== store.state.web.balance){//if the balance change wo call the store action to updater the state
                    store.dispatch('pollWeb3',{//disptch the action
                        coinbase:store.state.web3.coinbase,
                        balance: polledBalance
                    })
                }
            })
        }
    },500)//half second once
}
export default pollWeb3