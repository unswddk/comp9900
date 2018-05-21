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
}

let pollContractFunctionCall = function (state) {
    let web3 = window.web3 //new a web3 instance3
    web3 = new Web3(web3.currentProveider) //get the currentProvediver and pass it to a new web3
    setInterval(() => {
          store.state.contractInstance().getAllUsers((err, result) => {
                if (err) {
                  return null;
                  console.log(err)
                } else {
                  result.map(element => {
                    store.state.contractInstance().getUser(element, (err, result) => {
                      if (result) {
                        let newUser = {
                          "index" : result[2]["c"][0],
                          "name":web3.toAscii(result[0]),
                          "balance":result[1]["c"][0], 
                          "role":result[3]["c"][0],
                          "address":element
                        }
                        // console.log(JSON.stringify(newUser));
                        // console.log(containsObject(newUser, store.state.userInfo))
                        if (containsObject(newUser, store.state.userInfo)) {
                            //check this user's item
                            store.state.contractInstance().getUserItemId(element, (err, res) => {
                                if (err) {
                                  console.log(err);
                                } else {
                                  res.forEach(e => {
                                    store.state
                                      .contractInstance()
                                      .getItemById(element, e["c"][0], (e, r) => {
                                        if (r) {
                                          let item = {
                                            name: web3.toAscii(r[0]),
                                            state: web3.toAscii(r[1]),
                                            //web3.toAscii(whatever).replace(/\u0000/g, '')
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
                                          if(item.state.replace(/\u0000/g, '') == "deleted"){
                                            store.dispatch("deleteItem",{id: item.id})
                                          }
                                          //&& item.state.replace(/\u0000/g, '') !=="deleted"
                                          if( (!containsObject(item,store.state.info.items) && item.state.replace(/\u0000/g, '') !== "deleted")){
                                            console.log(item.state.replace(/\u0000/g, ''))
                                            store.dispatch('getPollContractFunctionCall', {
                                                items: item,
                                              });
                                            }
                                        }})})}})
                        } else {
                          store.dispatch('getUserInfoCall', newUser);
                        }
                      } else {
                        console.log(err)
                      }
                    });
                });
            }
                  })
                }, 500);
                }

export default pollContractFunctionCall
