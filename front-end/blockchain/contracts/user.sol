pragma solidity ^0.4.6;
// import "./Purchase.sol";
contract User {
    ///////////////////////////////////////////////////////////
    ////////////////////data struct////////////////////////////
    ////////////////////////////////////////////////////////////   
    struct Item{
        uint keyIndex;
        bytes32 code;
        bytes32 state;
        uint amount;
        uint price;
    }
    
    struct userStruct{
            bytes32 name;
            uint balance;
            uint index; 
            uint role;
            uint[] itemKeys;
            mapping (uint => Item) items;
    }
    
    
    mapping(address => userStruct) userStructs;
    mapping(address => uint[]) userWithItem;
    address[] private userIndex;
    uint[] public itmeIndex;
    uint counter;
    
    ///////////////////////////////////////////////////////////
    ////////////////////event functions/////////////////////////
    ////////////////////////////////////////////////////////////
    event LogNewUser   (address indexed userAddress, uint index, bytes32 name, uint balance);
    event LogUpdateUser(address indexed userAddress, uint index, uint);
    event LogUpdateUser(address indexed userAddress, uint index);
    event LogDeleteUser(address indexed userAddress, uint index);
  


    ///////////////////////////////////////////////////////////
    ////////////////////user functions/////////////////////////
    ////////////////////////////////////////////////////////////
    function insertUser(address userAddress,bytes32 name,uint balance,uint _role) public returns(uint index){
        if(isUser(userAddress)) throw; 
        userStructs[userAddress].name = name;
        userStructs[userAddress].balance   = balance;
        userStructs[userAddress].role   = _role;
        userStructs[userAddress].index     = userIndex.push(userAddress)-1;
        LogNewUser( 
            userAddress, 
            userStructs[userAddress].index, 
            name, 
            balance);
        return userIndex.length-1;
    }

  
    function isUser(address userAddress)public constant returns(bool isIndeed) {
        if(userIndex.length == 0) return false;
        return (userIndex[userStructs[userAddress].index] == userAddress);
    }

    function getUser(address userAddress) public constant returns(bytes32 name, uint balance, uint index,uint){
        if(!isUser(userAddress)) throw; 
        return (userStructs[userAddress].name, userStructs[userAddress].balance, userStructs[userAddress].index,userStructs[userAddress].role);
    }
      
    function updateUserBalance(address userAddress, uint _balance) public returns(bool success) {
        if(!isUser(userAddress)) throw; 
        userStructs[userAddress].balance = _balance;
        LogUpdateUser(
          userAddress, 
          userStructs[userAddress].index,
          userStructs[userAddress].balance);
        return true;
    }
  
    function getUserCount() public constant returns(uint count){
        return userIndex.length;
    }
    
    function getUserAtIndex(uint index) public constant returns(address userAddress){
        return userIndex[index];
    }
    
    function getAllUsers() public constant returns(address[]){
        return userIndex;
    }


    function deleteUser(address userAddress) 
        public
        returns(uint index)
    {
        if(!isUser(userAddress)) throw; 
        uint rowToDelete = userStructs[userAddress].index;
        address keyToMove = userIndex[userIndex.length-1];
        userIndex[rowToDelete] = keyToMove;
        userStructs[keyToMove].index = rowToDelete; 
        userIndex.length--;
        LogDeleteUser(
            userAddress, 
            rowToDelete);
        LogUpdateUser(
            keyToMove, 
            rowToDelete);
        return rowToDelete;
    }

    ///////////////////////////////////////////////////////////
    ////////////////////item functions/////////////////////////
    ////////////////////////////////////////////////////////////
  
    function insertItem(address userAddress, bytes32 _code,bytes32 _state,uint _amount,uint _price)public payable returns (bool){
        if(!isUser(userAddress)) throw;
        counter++;
        Item storage t = userStructs[userAddress].items[counter];
        t.code = _code;
        t.amount = _amount;
        t.state = _state;
        t.price = _price;
        if(t.keyIndex > 0){
            return true;
        }else{
            userWithItem[userAddress].push(counter);
            t.keyIndex = ++userStructs[userAddress].itemKeys.length;
            userStructs[userAddress].itemKeys[t.keyIndex - 1] = counter;
            return false;
        }
    }


    function updateItem(address userAddress, bytes32 _code,uint _itmeID,bytes32 _state,uint _amount,uint _price)public payable returns (bool){
        if(!isUser(userAddress)) throw;
        Item storage t = userStructs[userAddress].items[_itmeID];
        t.code = _code;
        t.amount = _amount;
        t.state = _state;
        t.price = _price;
        return true;
    }
    function deleteItem(uint _itmeID) public  payable returns (bool) {
        Item storage t = userStructs[msg.sender].items[_itmeID];
        t.state = "deleted";
        // uint listLen = userWithItem[msg.sender].length;
        // uint index;
        // for (uint i = 0; i < listLen; i++) {
        //     if (userWithItem[msg.sender][i] == _itmeID) {
        //         index = i;
        //     }
        // }
        // userWithItem[msg.sender][index] = userWithItem[msg.sender][listLen-1];
        // userWithItem[msg.sender].length--;



        // uint rowTodelete = userStructs[msg.sender].items[_itmeID].keyIndex;
        // uint keyToMove = userWithItem[msg.sender][userWithItem[msg.sender].length-1];
        // userWithItem[msg.sender][rowTodelete] = keyToMove;
        // userStructs[msg.sender].items[keyToMove].keyIndex = rowTodelete;
        // userWithItem[msg.sender].length--;
        return true;
    }


    
    function getUserItemId(address _address) constant public returns(uint[]){
      //need to check if there is a address in data and a item in the address
      return userWithItem[_address];
    }
  
    function getItemById(address _address,uint _itmeID) constant public returns(bytes32,bytes32,uint,uint,uint ) {
      //need to check if there is a address in data and a item in the address
      Item storage t =  userStructs[_address].items[_itmeID];
      return (t.code,t.state,t.amount,t.price,_itmeID);
    }
    
    function updateItemState(address _address,uint _itmeID,bytes32 _state)returns (bool){
        //need to check if there is a address in data and a item in the address
        Item storage t =  userStructs[_address].items[_itmeID];
        t.state = _state;
        return true;
    }
    
    function updateItemAmount(address _address,uint _itmeID,uint _amount)returns (bool) {
        //need to check if there is a address in data and a item in the address
        Item storage t =  userStructs[_address].items[_itmeID];
        t.amount = _amount;
        return true;
    }

    function transferEther(address _seller, uint _itemId,uint _amount) public payable returns(bool) {
        Item storage t1 = userStructs[_seller].items[_itemId]; 
        t1.state ="left";
        t1.amount -= _amount;
        counter++;
        userWithItem[msg.sender].push(counter);
        Item storage t2 = userStructs[msg.sender].items[counter]; 
        t2.amount = _amount;
        t2.code = t1.code;
        t2.state = "bug";
        t2.price = t1.price;
        if (t2.keyIndex > 0) {
            return true;
        }else {
            t2.keyIndex = ++userStructs[msg.sender].itemKeys.length;
            userStructs[msg.sender].itemKeys[t2.keyIndex - 1] = counter;
            userStructs[msg.sender].balance -= msg.value;
            userStructs[_seller].balance += msg.value;       
            _seller.transfer(msg.value);
            return false;
        }
    } 
    //   function createPurchase()  constant public returns (address){
    //   Purchase p = new Purchase();
    //   return p;
    //     }
  
//   function getItemByAddress(address _address) public constant returns(bytes32[],bytes32[],uint[],uint[]){
//       bytes32[]  codes;
//       bytes32[]  states;
//       uint[]  amounts;
//       uint[]  prices;
//       for(uint i = 0;i< userStructs[_address].itemKeys.length;i++){
//             Item storage t = userStructs[_address].items[userStructs[_address].itemKeys[i]];
//             codes.push(t.code);
//             states.push(t.state);
//             amounts.push(t.amount);
//             prices.push(t.price);
//       }
//       return (codes,states,amounts,prices);
//   }
}