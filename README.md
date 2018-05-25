# comp9900

## Four Little Cute Monsters

>[demo](https://unswddk.github.io/comp9900/#/)

### Front-end: Vue-cli, Vuex, iview, Vue Matrial, Vue resource V-Charts, trend

>Start with git clone the project, then go to the Front-end folder then
>```npm
>npm install
>npm run dev
>```

### back-end: Serverless Farmework, nodejs, AWS, DynamoDB, nodemailer

>deployed to the AWS, and connect with the frontend,if you want to run this on you computer, do as follow:
>first configue you AWS account and password on you computer and then install Serverless framework
>then go the the back-end folder run
>```serverless deploy```

### Blockchain

>install Web3, mateMask, truffle and ganache on you computer
>then go to the front-end/block folder,
>run ```truffle migrate```
>you will have a ABI on the build/contracts/Portfolio.json  and address on the terminal
>copy and replace the ABI and Address on the /src/util/constants/thirdContract.js
>then copy the account private key on the Ganache, login to the mateMake in Chrome brower 
> refresh the page, you will have the blockchain related section, named Profolio Sharing System

API(stock info):https://www.alphavantage.co

