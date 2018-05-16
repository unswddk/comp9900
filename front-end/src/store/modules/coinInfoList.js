import getCoinInfo from '../../util/getCoinInfo';

const state = {
    coinInfo:{
        aud:'',
        usd:''
    }
  }
const mutations = {
    readyCoinInfoList (state, payload) {
        console.log('coinInfoListCopy Mutation being executed', payload)
        let result = payload
        // let coinInfoListCopy = state.coinList
        let coinInfoCopy=state.coinInfo
        coinInfoCopy.aud = payload["Time Series (Digital Currency Intraday)"][Object.keys(payload["Time Series (Digital Currency Intraday)"])[0]]["1a. price (AUD)"]
        coinInfoCopy.usd = payload["Time Series (Digital Currency Intraday)"][Object.keys(payload["Time Series (Digital Currency Intraday)"])[0]]["1b. price (USD)"]
        console.log(coinInfoCopy)
        state.coinInfo = coinInfoCopy
        // state.coinList = coinInfoListCopy
        //once the state has changed it will setInterval to call pollWeb3
        // pollWeb3()//setIntral to get the coin Information
        }
  }
  const getters = {
    getAud (state) {
      return state.coinInfo.aud
    },
    getUsd (state) {
      return state.coinInfo.usd
    }
  }
  const actions = {
    getCoinInfoCall ({commit}) {
        console.log('getCoinInfoCall Action being executed')
        getCoinInfo.then(result => {
          console.log('committing result to readyCoinInfoList mutation')
          commit('readyCoinInfoList', result)
        }).catch(e => {
          console.log('error in action readyCoinInfoList', e)
        })
      },
  }
  export default  {
    state,
    mutations,
    getters,
    actions
  }
// export default coinInfoList
