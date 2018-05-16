// pragma solidity ^0.4.17;
 
// import "truffle/Assert.sol";
// import "truffle/DeployedAddresses.sol";
// import "../contracts/Adoption.sol";


// contract TestAdoption {
    
//     Adoption adoption = Adoption(DeployedAddresses.Adoption());

//     function testUserCanAdoptpe() public {

//         uint returnedId = adoption.adopt(8);
//         uint expected = 8;
//         Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recored");
//     }

//     function testGetAdopterAddresByPerId() public {
//         address expected = this;
//         address adopter = adoption.adopters(8);
//         Assert.equal(adopter, expected, "Owner of per 8 should be recorded");
//     }
// }
