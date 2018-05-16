pragma solidity ^0.4.17;
 
import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/user.sol";


contract TestAdoption {
    
    User user = User(DeployedAddresses.user());

    function testUserItemsIds() public {

        uint returnedId = user.getUserItemId(0x182385027a244d81a29f7caef35127a9bea971fd);
        uint256[] expected = [ 0, 0];
        Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recored");
    }

}
