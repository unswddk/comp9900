<template>
    <md-card>
      <md-card-header>
        <div class="md-title">{{message.code}}</div>       
        <div class="md-subhead"> {{message.group}}</div>
        {{message.name}}
      </md-card-header>
      <md-card-media-cover>
        <div class="trend">
          <trend :data="data" :gradient="['#b49ec1', '#f97adb', '#9fc9ff']"  :radius=10 auto-draw smooth></trend>        
        </div>
      </md-card-media-cover>

      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button class="md-icon-button md-primary" v-on:click='addToP' v-if="active">
              <md-icon>add</md-icon></md-button>
           <md-button class="md-icon-button md-accent" @click="dialogActive = true">
              <md-icon>loupe</md-icon>
               <md-tooltip md-direction="bottom">add stock to blockchain</md-tooltip>
          </md-button>
          </div>
    <md-dialog-prompt
      :md-active.sync="dialogActive"
      v-model="quantity"
      md-title="What's the Quantity?"
      md-input-maxlength="10"
      md-input-placeholder="Type your number..."
      md-confirm-text="Done"
      @md-confirm="addToB" />
          <md-card-expand-trigger>
            <md-button class="md-icon-button">
              <md-icon>keyboard_arrow_down</md-icon>
            </md-button>
          </md-card-expand-trigger>
        </md-card-actions>

        <md-card-expand-content>
          <md-card-content>
            Open Price: {{stockInfo["1. open"]}}</p>
              Close Price:
            {{stockInfo["4. close"]}}</p>
           Volume: {{stockInfo["5. volume"]}}</p>
          </md-card-content>
        </md-card-expand-content>
      </md-card-expand>
    </md-card>
</template>
<script>
import { EventBus } from "./event-bus.js";
export default {
  name: "coinsInfo",
  props: ["message"],
  data() {
    return {
      active:true,
      value: "this is coin info page",
      prortFolio:[],
      data:[],
      dialogActive:false,
      quantity:null,
      stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      },
    };
  },
  created(){
      this.$http
      .post(
        "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getPf",
        JSON.stringify({ email: localStorage.mail })
      )
      .then(response => {
        this.prortFolio = response.data.prof;
        console.log(this.prortFolio);
        if (
          this.prortFolio.filter(
            e => e.title == "default" && e.element.indexOf(this.message.code) > -1
          ).length > 0
        ) {
          this.active = false;
        }
        response => {};
      });
         this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
            this.message.code+
            ".ax&apikey=W9NHUIDE7JQITIA2"
        )
        .then(
          response => {
            console.log(response);
        let keys = Object.keys(response.data["Time Series (Daily)"]);
        console.log(keys[0]);
        console.log(response.data["Time Series (Daily)"])
        this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
         for (var i = keys.length - 1; i > 0; i--) {
              this.data.push(
                Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
              );
            }
          },
          err => {
            console.log(err);
          }
        );
  },
  watch:{
    message(){
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
            this.message.code+
            ".ax&apikey=W9NHUIDE7JQITIA2"
        )
        .then(
          response => {
            console.log(response);
        let keys = Object.keys(response.data["Time Series (Daily)"]);
        console.log(keys[0]);
        console.log(response.data["Time Series (Daily)"])
        this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
         for (var i = keys.length - 1; i > 0; i--) {
              this.data.push(
                Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
              );
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  methods:{
        addToP() {
        EventBus.$emit("addToPf", this.message.code);
        this.active = false;

    },
    addToB(){
      //inserStock(bytes32 _code,uint _amount,uint _price,bytes32 _state,bytes32 _buyDate, bytes32 _sellDate)
      if(Number(this.quantity)){
        let date =new Date();
        this.$store.state.portfolioInstace().inserStock(
          web3.fromAscii(this.message.code),this.quantity,parseInt(this.stockInfo["4. close"]*100),web3.fromAscii("new"),web3.fromAscii(date+""),web3.fromAscii(""),{
                from: this.$store.state.web3.coinbase,
               gas:3000000,
               vlaue: this.$store.state.web3.web3Instance().toWei(0, 'ether')
          },(err,res)=>{
            if (err) console.log(err);
            if (res) {
              console.log(res);
              console.log(this.$store.state.allPortfolio[this.$store.state.web3.coinbase].followers);
              //send email to those follower
         
              let emails = this.$store.state.allPortfolio[this.$store.state.web3.coinbase].followers;
              if(emails.length>0){
             emails.forEach(element => {
                    let emailObj = {
                            email:element,
                            content:"User "+this.$store.state.allPortfolio[this.$store.state.web3.coinbase].portfolioName+" add quantity: "+this.quantity+
                            " ;stock code: " +this.message.code + " in "+ date
              }
                this.$http.post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/sendToFollower",JSON.stringify(emailObj)).then(
                  response=>{
                    console.log(response);
                  }
                )
             });
              }
              }
          }
        )
      }
    }
  }
};
</script>
<style scoped>
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.md-card-expand-content{
  height: 120px;
}
.trend{
  width:auto;
  background: #454c57;
  /* height: 100%;  */
}
</style>
