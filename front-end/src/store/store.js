import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'
import loading from './modules/loading'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import coinInfoList from './modules/coinInfoList';
import getUerContract from '../util/getUserContract';
import getPurchaseContract from '../util/getPurchase';
import contractFunctionCall from '../util/contractFunctionCall';
import pollContractFunctionCall from '../util/pollContractFunctionCall'
import {ABI,address} from '../util/constants/secondContract';
Vue.use(Vuex)

const state = {
  web3: {
    isInjected: false,
    web3Instance: null,
    networkId: null,
    coinbase: null,
    balance: null,
    error: null
  },
  contractInstance: null,
  purchaseContractInstance: null,
  info: {
    users: [],
    items: [],
    isUser: false
    //add if this a user
  },
  userInfo: [],
}

const getters = {
  getAllUsers: state => {
    return state.users;
  }
}

const mutations = {
  registerWeb3Instance(state, payload) {
    console.log('registerWeb3instance Mutation being executed', payload)
    let result = payload
    let web3Copy = state.web3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.balance = parseInt(result.balance, 10)
    web3Copy.isInjected = result.injectedWeb3
    web3Copy.web3Instance = result.web3
    state.web3 = web3Copy

    console.log(state.userInfo);
    state.userInfo.forEach(element => {
      if (element.address == state.web3.coinbase) {
        state.info.isUser = true
      }
    });
  },
  pollWeb3Instance(state, payload) {
    consoel.log('pollWeb3Instance mutation being excuted', payload)
    state.web3.coinbase = payload.coinbase
    state.web3.balance = parseInt(payload.balance, 10)
  },
  registerContractInstance(state, payload) {
    console.log('contract instance: ', payload)
    state.contractInstance = () => payload
    contractFunctionCall()
    pollContractFunctionCall()
  },
  registerPurchaseContractInstance(state, payload) {
    console.log('contract instance: ', payload)
    state.purchaseContractInstance = () => payload
  },
  contractFunctionCallInstance(state, payload) {
    let result = payload;
    if(result.items.amount >0){
      state.info.items.push(result.items);
      state.info.users = result.users;
    }
  },
  getUserInfoCallInstance(state, payload) {
    state.userInfo.push({
      index: payload.index,
      name: payload.name,
      balance: payload.balance,
      role: payload.role,
      address: payload.address,
    })
    console.log(state.userInfo);
    state.userInfo.forEach(element => {
      if (element.address == state.web3.coinbase) {
        state.info.isUser = true
      }
    });
  },
  getPollContractInstance(state, payload){
    console.log("==============begin=================");
    console.log(payload.items.state)
    //nwe item
    if(payload.items.state.replace(/\u0000/g, '') ==="new"){
      console.log("==============new=============");
      state.info.items.push(payload.items);
    }else if(payload.items.state.replace(/\u0000/g, '') ==="updated"){
      console.log("==============updated=============");
      for(let i=0;i< state.info.items.length;i++){
        if(state.info.items[i].id === payload.items.id){
          state.info.items.splice(i,1,payload.items);
        }
      }
    }else if(payload.items.state.replace(/\u0000/g, '') === "left"){
      console.log("==============left=============");
      let find =false;
      for(let i=0;i< state.info.items.length;i++){
        if(state.info.items[i].id === payload.items.id){
          console.log("==============left=============");
          state.info.items.splice(i,1,payload.items);
          find=true
        }
      }
      if(!find){state.info.items.push(payload.items);}
    }else if(payload.items.state.replace(/\u0000/g, '') === "selling"){
      console.log("==============selling=============");
      let find =false;
      for(let i=0;i< state.info.items.length;i++){
        if(state.info.items[i].id === payload.items.id){
          state.info.items.splice(i,1,payload.items);
          find=true
        }
      }
      if(!find){state.info.items.push(payload.items);}
    }else{
      console.log("==============other=============");
      state.info.items.push(payload.items);
    }
      },



      deleteItemInstance(state,obj){
        // console.log(obj.id);
           for(let i=0;i<state.info.items.length;i++){
               if(state.info.items[i].id === obj.id){
                state.info.items.splice(i,1);
               }
           }
      }
}
const actions = {
  registerWeb3({
    commit
  }) {
    console.log('registerWeb3 Action being executed')
    getWeb3.then(result => {
      console.log('committing result to registerWeb3Instance mutation')
      commit('registerWeb3Instance', result)
    }).catch(e => {
      console.log('error in action registerWeb3', e)
    })
  },
  pollWeb3({
    commit
  }, payload) {
    console.log('pollWeb3 action being executde')
    commit('pollWeb3Instance', payload)
  },
  getContractInstance({
    commit
  }) {
    getUerContract.then(result => {
      commit('registerContractInstance', result)
    }).catch(e => console.log(e))
  },
  getPurchaseContractInstance({commit}, obj) {
    if (typeof web3 !== 'undefined') {
      web3 = new Web3(web3.currentProvider);
    } else {
      web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    let infoContract = new web3.eth.contract(ABI, {
      from: obj.seller,
      gas: 300000,
      value: web3.toWei(obj.value, 'ether'),
    });
    console.log(infoContract.options)
    var info = infoContract.at(address);
    commit('registerPurchaseContractInstance', info)
  },
  getContractFunctionCall({
    commit
  }, payload) {
    commit('contractFunctionCallInstance', payload)
  },
  getUserInfoCall({
    commit
  }, payload) {
    commit('getUserInfoCallInstance', payload)
  },
  getPollContractFunctionCall({
    commit
  }, payload){
    commit('getPollContractInstance', payload)
  },
  deleteItem({commit},obj){
    commit('deleteItemInstance',obj)
  }
}
export default new Vuex.Store({
  strict: true,
  state,
  mutations,
  actions,
  getters,
  modules: {
    loading,
    coinInfoList
  }
})
