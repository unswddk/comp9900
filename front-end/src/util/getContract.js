import Web3 from 'web3'
import {address,ABI} from './constants/firstContract'

let getContract =  new Promise(function(resolve,reject){
    let web3 = new Web3(window.web3.currentProvider)
    let firstContract = web3.eth.contract(ABI)
    let firstContractInstance = firstContracta.at(address)
    resolve(firstContractInstance)
})
export default getContract