export const ABI =
[
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "itmeIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "balance",
        "type": "uint256"
      }
    ],
    "name": "LogNewUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "LogUpdateUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "LogUpdateUser",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "userAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "LogDeleteUser",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      },
      {
        "name": "name",
        "type": "bytes32"
      },
      {
        "name": "balance",
        "type": "uint256"
      },
      {
        "name": "_role",
        "type": "uint256"
      }
    ],
    "name": "insertUser",
    "outputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "isUser",
    "outputs": [
      {
        "name": "isIndeed",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "name": "name",
        "type": "bytes32"
      },
      {
        "name": "balance",
        "type": "uint256"
      },
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      },
      {
        "name": "_balance",
        "type": "uint256"
      }
    ],
    "name": "updateUserBalance",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUserCount",
    "outputs": [
      {
        "name": "count",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getUserAtIndex",
    "outputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAllUsers",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      }
    ],
    "name": "deleteUser",
    "outputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      },
      {
        "name": "_code",
        "type": "bytes32"
      },
      {
        "name": "_state",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "insertItem",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userAddress",
        "type": "address"
      },
      {
        "name": "_code",
        "type": "bytes32"
      },
      {
        "name": "_itmeID",
        "type": "uint256"
      },
      {
        "name": "_state",
        "type": "bytes32"
      },
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "_price",
        "type": "uint256"
      }
    ],
    "name": "updateItem",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_itmeID",
        "type": "uint256"
      }
    ],
    "name": "deleteItem",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getUserItemId",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_itmeID",
        "type": "uint256"
      }
    ],
    "name": "getItemById",
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "bytes32"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_itmeID",
        "type": "uint256"
      },
      {
        "name": "_state",
        "type": "bytes32"
      }
    ],
    "name": "updateItemState",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_address",
        "type": "address"
      },
      {
        "name": "_itmeID",
        "type": "uint256"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "updateItemAmount",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_seller",
        "type": "address"
      },
      {
        "name": "_itemId",
        "type": "uint256"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferEther",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
export const address = "0xfa3d1e425460577cd87d7ba042f5cb6efc5f6165"