import Web3 from 'web3'
import {address,ABI} from './constants/thirdContract'

let getPortfolio =  new Promise(function(resolve,reject){
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    let thirdContract = web3.eth.contract(ABI)
    let thirdContractInst = thirdContract.at(address)
    resolve(thirdContractInst)
})
export default getPortfolio