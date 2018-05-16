import Web3 from 'web3'
import {ABI,address} from "./constants/firstContract"
let getUserContract = new Promise (
  function (resolve, reject) {
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    let infoContract = web3.eth.contract(ABI);
      var info = infoContract.at(address);
      resolve(info);
  }
  
)
export default getUserContract
