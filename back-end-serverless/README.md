# comp9900

## Four Little Cute Monsters--back-end

>[demo](https://unswddk.github.io/comp9900/#/)

### Back-end: Serverless Farmework, nodejs, AWS, DynamoDB, nodemailer

> Has already been deployed to AWS as a Restful API and connect with the frontend

>createUser:
>TABLE_NAME: UserbTable
>method: post
>path: user

>login: 
>TABLE_NAME: UserbTable
>path: login
>method: post

>getCompanyInfo:
>method: get
>path: /getCompanyInfo
    
>createProf:
>TABLE_NAME: UserbTable
>method: post
>path: createPf

>getProf:
>TABLE_NAME: UserbTable
>method: post
>path: getPf

>forgetPswd:
>TABLE_NAME: UserbTable
>method: post
>path: changePswd

>changePwd:
>TABLE_NAME: UserbTable
>method: post
>path: changePwd

>sendToFollower:
>method: post
>path: sendToFollower

>getTechIndor:
>method: GET
>path: getTechIndicators/{id}
