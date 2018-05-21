export const ABI =  [
    {
      "constant": true,
      "inputs": [],
      "name": "counter",
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
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "userAddesses",
      "outputs": [
        {
          "name": "",
          "type": "address"
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
          "name": "name",
          "type": "bytes32"
        }
      ],
      "name": "LogUpdateUser",
      "type": "event"
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
          "name": "",
          "type": "bool"
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
          "name": "_userAddress",
          "type": "address"
        },
        {
          "name": "name",
          "type": "bytes32"
        },
        {
          "name": "_portfolioName",
          "type": "bytes32"
        },
        {
          "name": "_email",
          "type": "bytes32"
        }
      ],
      "name": "createPortfolio",
      "outputs": [
        {
          "name": "index",
          "type": "uint256"
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
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getPortfolio",
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
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
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
      "name": "getPortfolioNumbers",
      "outputs": [
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
      "constant": true,
      "inputs": [
        {
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getPortfolioList",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        },
        {
          "name": "",
          "type": "address[]"
        },
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
      "constant": false,
      "inputs": [
        {
          "name": "userAddress",
          "type": "address"
        },
        {
          "name": "_name",
          "type": "bytes32"
        },
        {
          "name": "_portfolioName",
          "type": "bytes32"
        },
        {
          "name": "_email",
          "type": "bytes32"
        }
      ],
      "name": "updatePortfolioName",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getAllPortfolio",
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
          "name": "followAddress",
          "type": "address"
        },
        {
          "name": "_email",
          "type": "bytes32"
        }
      ],
      "name": "follow",
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
          "name": "followAddress",
          "type": "address"
        },
        {
          "name": "_email",
          "type": "bytes32"
        }
      ],
      "name": "unfollow",
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
          "name": "_code",
          "type": "bytes32"
        },
        {
          "name": "_amount",
          "type": "uint256"
        },
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_state",
          "type": "bytes32"
        },
        {
          "name": "_buyDate",
          "type": "bytes32"
        },
        {
          "name": "_sellDate",
          "type": "bytes32"
        }
      ],
      "name": "inserStock",
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
      "name": "getStockId",
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
          "name": "_stockId",
          "type": "uint256"
        }
      ],
      "name": "getStockById",
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
        },
        {
          "name": "",
          "type": "bytes32"
        },
        {
          "name": "",
          "type": "bytes32"
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
          "name": "_stockId",
          "type": "uint256"
        },
        {
          "name": "_selldate",
          "type": "bytes32"
        },
        {
          "name": "_earn",
          "type": "uint256"
        }
      ],
      "name": "sellStock",
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
          "name": "_address",
          "type": "address"
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
  export const address = "0x8fae94677bf88c8afe4c4461253b8ea2c4f939b8"
