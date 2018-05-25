<template>
  <div>
    <md-content >{{message.id}}</md-content>
    <md-content >{{message.code}}</md-content>
    <md-content>{{message.state}}</md-content>
    <md-content >{{message.price/100}}</md-content>
    <md-content>{{message.amount}}</md-content>
    <span v-if="isSold">{{message.sellDate.substring(0,16)}}</span>
    <span v-else>{{message.buyDate.substring(0,16)}}</span>
     <md-content>{{stockInfo["1. open"]}}</md-content>
    <md-content>{{stockInfo["4. close"]}}</md-content>
    <md-content>{{stockInfo["6. volume"]}}</md-content>
    <!-- <span>{{message.sellDate.substring(0,16)}}</span> -->
    <span>
          <trend :data="chartData" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend></span>
    <md-button class="md-icon-button md-dense md-accent" v-if="canSell" @click="sellStock">
        <md-icon>clear</md-icon>
      </md-button>
             
             <md-divider></md-divider>
  </div>
</template>
<script>
export default {
    name:"portfolioSingleStock",
    props:["message","Pkey"],
    data() {
        return {
        change:null,
        chartData:[],
        stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      },
    };
  },
  computed:{
           canSell(){
          console.log(this.Pkey === this.$store.state.web3.coinbase)
          return this.Pkey === this.$store.state.web3.coinbase && this.message.state !=="sold";
      },
      isSold(){
          return this.message.state ==='sold';
      }
  },
mounted(){
    console.log(this.message);
      this.$http.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
          this.message.code +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(
        response => {
          if (response.data["Time Series (Daily)"]) {
            let keys = Object.keys(response.data["Time Series (Daily)"]);
            this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
            this.change = this.stockInfo["4. close"] - this.stockInfo["1. open"];
            for (var i = keys.length - 1; i > 0; i--) {
              this.chartData.push(Number(response.data["Time Series (Daily)"][keys[i]]["1. open"]));
            }
            // console.log(this.chartData);
          }
        },
        response => {
          console.log("Error");
        }
      );
  },
  methods:{
      sellStock(){
          //sellStock(address _address,uint _stockId, bytes32 _selldate,uint _earn) 
          let earn = (this.stockInfo["3. low"]-this.message.price/100) * this.message.amount;
          console.log((this.stockInfo["3. low"]-this.message.price/100));
          let date =new Date();
          this.$store.state.portfolioInstace().sellStock(this.Pkey,this.message.id,web3.fromAscii(date+''),earn,(err,res)=>{
              if(err) console.log(err);
              if(res) {
                    console.log(res);
                    let emails = this.$store.state.allPortfolio[this.$store.state.web3.coinbase].followers;
                    if(emails.length>0){
                        emails.forEach(element => {
                            let emailObj = {
                            email:element,
                            content:"User "+this.$store.state.allPortfolio[this.$store.state.web3.coinbase].portfolioName+" sell quantity: "+this.quantity+
                            " ;stock code: " +this.message.code + " in "+ date}
                            this.$http.post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/sendToFollower",JSON.stringify(emailObj)).then(
                                response=>{
                                    console.log(response);
                                    }
                )})}
              }
          })

      },
  }
};
</script>
<style lang="scss" scoped>
  .md-content {
    width: 50px;
    height: 50px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  span{
      width: 100px;
       height: auto;
    display: inline-block;
        margin-left: 20px;
  }
  .md-button {
      margin-top: 5px;
  }
</style>
