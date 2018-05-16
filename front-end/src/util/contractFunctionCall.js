import store from '../store/store.js'
import Web3 from 'web3'

let contractFunctionCall = function (state) {
  let web3 = window.web3 //new a web3 instance3
  web3 = new Web3(web3.currentProveider) //get the currentProvediver and pass it to a new web3
//   setInterval(()=>{

let finalResult = {
        usersList: [],
        itemsList: []
    };
  store.state.contractInstance().getAllUsers((err, result) => {
    if (err) {
      return null;
      console.log(err)
    } else {
      finalResult["usersList"] = result;
      let items = [];
      result.map(element => {
        store.state.contractInstance().getUser(element,(err,result)=>{
            if(result){
                console.log(result)
                let newUser = {
                    "index" : result[2]["c"][0],
                    "name":web3.toAscii(result[0]),
                    "balance":result[1]["c"][0], 
                    "role": result[3]["c"][0],
                    "address":element
                }
                console.log(newUser);
                store.dispatch('getUserInfoCall', newUser);
            }
            else{console.log(err)}
        });
        // console.log(UserInfo)
        store.state.contractInstance().getUserItemId(element, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(res)
            res.forEach(e => {
              store.state
                .contractInstance()
                .getItemById(element, e["c"][0], (e, r) => {
                  if (r) {
                    let item = {
                      name: web3.toAscii(r[0]),
                      state: web3.toAscii(r[1]),
                      amount: r[2]["c"][0],
                      price: r[3]["c"][0],
                      id: r[4]["c"][0],
                      owner: element,
                    };
                    store.state.userInfo.forEach(element => {
                        if (element.address === item.owner) {
                          item["ownerName"] = element.name;
                        }
                      });
                      if(item.state.replace(/\u0000/g, '') !="deleted"){
                    store.dispatch('getContractFunctionCall', {
                      users: finalResult.usersList,
                      items: item,
                    });
                }
              }
                });
            });
          }
        });
      });
    }
  })
}
//   ,1000);
// }
export default contractFunctionCall
