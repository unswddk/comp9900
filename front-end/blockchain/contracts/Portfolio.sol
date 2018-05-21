pragma solidity ^0.4.17;

contract Portfolio {

 struct Stock {
        uint key;
        bytes32 code;
        bytes32 state;
        bytes32 buyDate;
        bytes32 sellDate;
        uint amount;
        uint price;
    }

   struct PortfolioStruct {
            bytes32 name;
            bytes32 portfolioName;
            bytes32 email;
            uint balance;
            uint donation;
            bytes32 state; 
            uint index; 
            uint earn;
            uint likeNumber;
            bytes32[] followerIds;
            address[] follows;
            uint[] stockKeys;
            mapping (uint => Stock) stocks;
    }

    event LogNewUser   (address indexed userAddress, uint index, bytes32 name, uint balance);
    event LogUpdateUser(address indexed userAddress, uint index, bytes32 name);
//one user may have only one portfilo and this portflio can not deleted 
//So when they want to create a portfilo should input a name,should we 
//need to create a user or not 
    uint public counter;
    mapping(address => PortfolioStruct) userPortfolios;
    mapping(address => uint[]) usersItemid;
    address[] public userAddesses;


    function isUser(address userAddress)public constant returns(bool) {
        if (userAddesses.length == 0) 
            return false;
        return (userAddesses[userPortfolios[userAddress].index] == userAddress);
    }


    function createPortfolio(address _userAddress,bytes32 name,bytes32 _portfolioName,bytes32 _email) public payable returns(uint index) {
        if (isUser(_userAddress)) throw; 
        userPortfolios[_userAddress].name = name;
        userPortfolios[_userAddress].balance = _userAddress.balance;
        userPortfolios[_userAddress].earn = 0;
        userPortfolios[_userAddress].likeNumber = 0;
        userPortfolios[_userAddress].donation = 0;
        userPortfolios[_userAddress].index = userAddesses.push(_userAddress)-1;
        userPortfolios[_userAddress].portfolioName = _portfolioName;
        userPortfolios[_userAddress].email = _email;
        LogNewUser( 
            msg.sender, 
            userPortfolios[_userAddress].index, 
            name, 
            userPortfolios[_userAddress].balance);
        return userAddesses.length-1;
    }
//bytes32 name; bytes32 portfolioName; bytes32 email; uint balance; uint donation; bytes32 state; uint index; uint earn; uint likeNumber; address[] followerIds; address[] follows; uint[] stockKeys;
    function getPortfolio(address userAddress) public constant returns(bytes32,bytes32,bytes32,bytes32) {
        if(!isUser(userAddress)) throw; 
        return (userPortfolios[userAddress].name, userPortfolios[userAddress].portfolioName,userPortfolios[userAddress].email,userPortfolios[userAddress].state);
    }
    function getPortfolioNumbers(address userAddress) public constant returns(uint ,uint,uint,uint,uint) {
        return (userPortfolios[userAddress].balance, userPortfolios[userAddress].donation, userPortfolios[userAddress].index, userPortfolios[userAddress].earn, userPortfolios[userAddress].likeNumber);
    }
    function getPortfolioList(address userAddress) public constant returns(bytes32[],address[],uint[]) {
        return (userPortfolios[userAddress].followerIds, userPortfolios[userAddress].follows, userPortfolios[userAddress].stockKeys);
    }
    function updatePortfolioName(address userAddress, bytes32 _name,bytes32 _portfolioName,bytes32 _email) public payable returns(bool success) {
        if(!isUser(userAddress)) throw; 
        userPortfolios[userAddress].name = _name;
        userPortfolios[userAddress].portfolioName = _portfolioName;
        userPortfolios[userAddress].email = _email;
        LogUpdateUser(
          userAddress, 
          userPortfolios[userAddress].index,
          userPortfolios[userAddress].name);
        return true;
    }

    function getAllPortfolio() public constant returns(address[]) {
        return userAddesses;
    }

    function follow(address followAddress, bytes32 _email) public returns(bool) {
        userPortfolios[followAddress].followerIds.push(_email);
        userPortfolios[msg.sender].follows.push(followAddress);
        return true;
    }
    function unfollow(address followAddress, bytes32 _email) public returns(bool) {
        uint res;
        for (uint i = 0;i<userPortfolios[followAddress].followerIds.length; i++) {
            if (userPortfolios[followAddress].followerIds[i] == _email) {
                res = i;
            }
        }
        userPortfolios[followAddress].followerIds[res] = userPortfolios[followAddress].followerIds[userPortfolios[followAddress].followerIds.length-1];
        userPortfolios[followAddress].followerIds.length--;
        // uint res2;
        // for (uint j = 0;j < userPortfolios[msg.sender].follows.length; i++) {
        //     if (userPortfolios[msg.sender].follows[j] == followAddress) {
        //         res2 = j;
        //     }
        // }
        // userPortfolios[msg.sender].follows[res2] = userPortfolios[msg.sender].follows[userPortfolios[msg.sender].follows.length-1];
        // userPortfolios[msg.sender].follows.length--;
        return true;
    }
/**
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
         */
    function inserStock(bytes32 _code,uint _amount,uint _price,bytes32 _state,bytes32 _buyDate, bytes32 _sellDate) public payable returns (bool) {
        if(!isUser(msg.sender)) throw; 
        counter++;
        Stock storage t =  userPortfolios[msg.sender].stocks[counter];
        t.code = _code;
        t.amount = _amount;
        t.state = _state;
        t.price = _price;
        t.buyDate =_buyDate;
        t.sellDate = _sellDate;
         if (t.key > 0) {
            return true;
            }else {
            usersItemid[msg.sender].push(counter);
            t.key = ++userPortfolios[msg.sender].stockKeys.length;
            userPortfolios[msg.sender].stockKeys[t.key - 1] = counter;
            return false;
        }
    }
    function getStockId(address _address) constant public returns(uint[]){
      //need to check if there is a address in data and a item in the address
      return usersItemid[_address];
    }
  //      bytes32 buyDate;bytes32 sellDate;
    function getStockById(address _address,uint _stockId) constant public returns(bytes32,bytes32,uint,uint,uint,bytes32,bytes32) {
      Stock storage t = userPortfolios[_address].stocks[_stockId];
      return (t.code,t.state,t.amount,t.price,_stockId,t.buyDate,t.sellDate);
    }

    function sellStock(address _address,uint _stockId, bytes32 _selldate,uint _earn) payable public returns (bool) {
        Stock storage t = userPortfolios[_address].stocks[_stockId];
        t.state = "sold";
        t.sellDate = _selldate;
        userPortfolios[_address].earn += _earn;
        return true;
    }

    function transferEther(address _address,uint _amount) public payable returns(bool) {
        userPortfolios[_address].donation += _amount;
        _address.transfer(msg.value);
        return true;
    } 
}