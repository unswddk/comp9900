# comp9900

## Four Little Cute Monsters--back-end

>[demo](https://unswddk.github.io/comp9900/#/)

### Back-end: Serverless Farmework, nodejs, AWS, DynamoDB, nodemailer

> Has already been deployed to AWS as a Restful API and connect with the frontend

createUser:
<br>
TABLE_NAME: UserbTable
<br>method: post
<br>path: user

<br>login: 
<br>TABLE_NAME: UserbTable
<br>path: login
<br>method: post

<br>getCompanyInfo:
<br>method: get
<br>path: /getCompanyInfo
    
<br>createProf:
<br>TABLE_NAME: UserbTable
<br>method: post
<br>path: createPf

<br>getProf:
<br>TABLE_NAME: UserbTable
<br>method: post
<br>path: getPf

<br>forgetPswd:
<br>TABLE_NAME: UserbTable
<br>method: post
<br>path: changePswd

<br>changePwd:
<br>TABLE_NAME: UserbTable
<br>method: post
<br>path: changePwd

<br>sendToFollower:
<br>method: post
<br>path: sendToFollower

<br>getTechIndor:
<br>method: GET
<br>path: getTechIndicators/{id}
