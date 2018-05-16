<template>
<div>
  <Row class="firstRow" >
    <Col offset='4' class="col1" span="10">
    <p>{{ companyName }}<Tooltip content="Add to Myprofolio">   <Button v-if='active'  type="ghost" shape="circle" icon="ios-star-outline" v-on:click='addToP'></Button>
    
    </Tooltip>
    <addItemButton  v-if="showSecond" v-bind:code="model10" v-bind:amount="stockAmount" v-bind:price="stockInfo['4. close']"></addItemButton>
    
    <InputNumber  v-if="isSeller" @on-blur="showSecond = true" :max="1000000" :min="1" v-model="stockAmount"></InputNumber>
    </p> 
    <p><Icon type="code"></Icon> {{ model10 }} </p>
    <p><label> {{Number(stockInfo['4. close']).toFixed(2)}} </label><span class="change"><changeInfo v-bind:message="change"></changeInfo> (<changeInfo v-bind:message="changePg"></changeInfo>)<span class="stockTrend"><trend :data="stockData" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend></span></span>
    </p>
    <p><Icon type="ios-world-outline"></Icon>{{group}}</p>
    <p>Peer:</p>
   <div class="buttonZoom">
    <Button type="ghost" shape="circle"   v-for="pe in peer" :value='pe.code' :key='pe.name' v-on:click="changePeer(pe)">{{pe.code}}</Button>
   </div>
     <Select v-model="model10" filterable class="section" @input="chartQuote" size="large">
        <Option v-for="item in cityList" :value="item.code" :key="item.name">{{ item.code }}----------{{item.name}}</Option>
    </Select>
    </Col>
    <Col offset="1" span="4">
    <predition v-bind:message="model10"></predition>
    </Col>
    </Row>
    <hr class="fullWidth-hr">

     <Row>
  <Col  offset='2' span='20'> 
           <userProtfile v-if="user"></userProtfile>
        </Col>
    </Row>
    <br>
    <Row>
      <Col offset='2' span='20'>
    <Card class="card" >
      <p slot="title"> Chart</p>
      <ve-candle class="chart" :data='chartData' :settings='chartSettings'></ve-candle>
  <div class="stockInfoCard">
        <h2>
         Stock Information Summary</h2>
         <li>{{companyName }}</li>
          <li> Open<span  class="summary-number">{{ stockInfo['1. open']  }}</span></li>
          <li> High<span class="summary-number">{{ stockInfo['2. high']  }}</span></li>
          <li> Low<span class="summary-number">{{ stockInfo['3. low']  }}</span></li>
          <li> Close<span class="summary-number">{{ stockInfo['4. close']  }}</span></li>
          <li> Volume<span class="summary-number">{{ stockInfo['5. volume']  }}</span></li>
          <li> Change<span class="summary-number"><changeInfo v-bind:message="change"></changeInfo></span></li>
          <li> Change(%)<span class="summary-number"><changeInfo v-bind:message="changePg"></changeInfo></span></li>
  </div>
    <div class="stockInfoCard">
    <techInductor class="techInductor" v-bind:message="model10"></techInductor>
    </div>
    </Card>
  </Col>
    </Row>
<br><br><br><hr class="middle-hr">
    <!-- <Row>
      <Col offset='2' span='10'>
        <techInductor class="techInductor" v-bind:message="model10"></techInductor>
      </Col>
      <Col  span='10' style="margin-left:7px">
       <Card>
         <p slot="title">
         Stock Information Summary</p>
         <li>{{companyName }}</li>
          <li> Open<span  class="summary-number">{{ stockInfo['1. open']  }}</span></li>
          <li> High<span class="summary-number">{{ stockInfo['2. high']  }}</span></li>
          <li> Low<span class="summary-number">{{ stockInfo['3. low']  }}</span></li>
          <li> Close<span class="summary-number">{{ stockInfo['4. close']  }}</span></li>
          <li> Volume<span class="summary-number">{{ stockInfo['5. volume']  }}</span></li>
          <li> Change<span class="summary-number"><changeInfo v-bind:message="change"></changeInfo></span></li>
          <li> Change(%)<span class="summary-number"><changeInfo v-bind:message="changePg"></changeInfo></span></li>
          
          
          </Card>
      </Col>
    </Row> -->

 <!-- peerInfo start-->
    <Row>
        <Col offset='2' span='20'>
      <Carousel v-model="value0">
          <CarouselItem v-for="p in peer" :key="p.code" >
              <peerCard v-bind:message="p.code"></peerCard>
          </CarouselItem>
      </Carousel>
        </Col>
    </Row>
    <!-- <Row></Row> -->
 <!-- peerInfo end-->

 <!-- blockChain part start-->
<br><br><br><hr class="middle-hr">
    <Row>
      <br><br>
      <Col span="22" offset="2">
          <coinsInfoCard style="display: inline-block;"></coinsInfoCard>
          <!-- <metamask style="display: inline-block;"></metamask>           -->
          <tradeBoard></tradeBoard>
      </Col>
    </Row>

 <!-- blockChain part end-->


 <!-- News part start-->
 <br><br><br><hr class="middle-hr">
     <Row>
      <Col offset='2' span='22'>
      <div>
      <newsCard v-for="n in news" :key="n.index" v-bind:message="n" style="vertical-align: top;"></newsCard>
      </div>
      </Col>
    </Row> 
 <!-- News part end-->

     <BackTop></BackTop>
  </div>
</template>
<script>
import Vue from "vue";
import stockcardVue from "./stockcard.vue";
import coinsInfoCard from "./coinsInfoCard.vue"
import VCharts from "v-charts";
import iView from "iview";
import changeInfo from "./change";
import Trend from "vuetrend";
import { EventBus } from "./event-bus.js";
import userProtfile from "./userProtfile.vue";
import techInductor from "./techInductor.vue";
import predition from "./predition.vue"
import metamask from "./metamask.vue"
import coinsInfo from "./coins.vue"
import tradeBoard from "./trading.vue"
import peerCard from "./peerCard.vue"
import newsCard from "./newsCard.vue"
import addItemButton from "./addItemButton.vue"
// import tradeBoard from "./trading.vue"
Vue.use(VCharts);
Vue.use(Trend);
Vue.use(iView);
export default {
  name: "mainPage",
  data() {
    return {
      user: localStorage.mail,
      stockData: [],
      value0:0,
      code: "",
      cityList: [],
      model10: "MOQ",
      companyName: "MOQ LIMITED",
      group: "Software & Services",
      newRows: [],
      peerInfo: [],
      showSecond:false,
      username: "",
      news: [],
      stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      },
      prortFolio: [],
      active: true,
      stockAmount:1000,
      value1: "1",
      peer: [],
      chartData: {
        columns: ["date", "open", "close", "lowest", "highest", "vol"],
        rows: this.newRows
      },
      chartSettings: {}
    };
  },
  computed: {
    change: function() {
      return (
        "" +
        Number(this.stockInfo["4. close"] - this.stockInfo["1. open"]).toFixed(
          5
        )
      );
    },
    changePg: function() {
      return Number(this.change / this.stockInfo["1. open"]).toFixed(5) + "%";
    },
    isSeller(){
                if(this.$store.state.info.isUser){
                  return this.$store.state.userInfo.some(element => {
                       return element.address === this.$store.state.web3.coinbase && element.role === 1;
                   });
                }
                else{
                    return false;
                } 
        }
  },
  components: {
    userProtfile,
    changeInfo,
    techInductor,
    predition,
    coinsInfoCard,
    metamask,
    coinsInfo,
    tradeBoard,
    peerCard,
    newsCard,
    addItemButton
  },
  beforeCreate:function () {
    console.log('registerWeb3 Action dispatched from cart-dapp.vue')
    this.$store.dispatch('registerWeb3')
    // this.$store.dispatch('getCoinInfoCall')
    this.$store.dispatch('getContractInstance');
  },
  created: function() {
    this.$http.get("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getCompanyInfo").then(
      response => {
        this.cityList = response.data.company;
        this.getCityList();
        this.getPeer();
        this.getPeerInfo();
      },
      response => {
        // 响应错误回调
        console.log("服务器请求失败");
      }
    );
    this.$http
      .get("https://api.iextrading.com/1.0/stock/market/news/last/3")
      .then(
        response => {
          this.news = [];
          this.news = response.data;
          console.log(this.news);
        },
        response => {
          // 响应错误回调
          console.log("服务器请求失败");
        }
      );
  },
  mounted: function() {
    EventBus.$on("deleteInPf", data => {
      this.active = data;
    });
    EventBus.$on("login", username => {
      this.user = true;
    }),
    EventBus.$on("logout", code => {
        this.user = false;
      });
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
            e => e.title == "default" && e.element.indexOf(this.model10) > -1
          ).length > 0
        ) {
          this.active = false;
        }
        response => {};
      });
    this.$http
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
          this.model10 +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(response => {
        // 响应成功回调
        let keys = Object.keys(response.data["Time Series (Daily)"]);
        console.log(keys);
        console.log(response.data["Time Series (Daily)"])
        this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
        // this.stockData=[];
        for (var i = keys.length - 1; i > 0; i--) {
          this.stockData.push(
            Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
          );
          this.newRows.push({
            date: keys[i],
            open: Number(
              response.data["Time Series (Daily)"][keys[i]]["1. open"]
            ),
            close: Number(
              response.data["Time Series (Daily)"][keys[i]]["4. close"]
            ),
            lowest: Number(
              response.data["Time Series (Daily)"][keys[i]]["3. low"]
            ),
            highest: Number(
              response.data["Time Series (Daily)"][keys[i]]["2. high"]
            ),
            vol: Number(
              response.data["Time Series (Daily)"][keys[i]]["5. volume"]
            )
          });
        }
        this.chartData = {
          columns: ["date", "open", "close", "lowest", "highest", "vol"],
          rows: this.newRows
        };
        this.chartSettings = {
          showMA: true,
          showVol: true,
          labelMap: {
            MA5: "MA5",
            日K:"Day K"
          },
          legendName: {
            '日K': 'Day K'
          },
          showDataZoom: true
        };
      });
  },
  methods: {
    chartQuote: function() {
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
            this.model10 +
            ".ax&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            console.log(response)
            this.newRows = [];
            let keys = Object.keys(response.data["Time Series (Daily)"]);
            this.stockInfo =
              response.data["Time Series (Daily)"][keys[0]];
            this.stockData = [];
            for (var i = keys.length - 1; i > 0; i--) {
              this.stockData.push(
                Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
              );
              this.newRows.push({
                日期: keys[i],
                open: Number(
                  response.data["Time Series (Daily)"][keys[i]]["1. open"]
                ),
                close: Number(
                  response.data["Time Series (Daily)"][keys[i]]["4. close"]
                ),
                lowest: Number(
                  response.data["Time Series (Daily)"][keys[i]]["3. low"]
                ),
                highest: Number(
                  response.data["Time Series (Daily)"][keys[i]]["2. high"]
                ),
                vol: Number(
                  response.data["Time Series (Daily)"][keys[i]]["5. volume"]
                )
              });
            }
            this.chartData = {
              columns: ["日期", "open", "close", "lowest", "highest", "vol"],
              rows: this.newRows
            };
            this.chartSettings = {
              showMA: true,
              showVol: true,
              labelMap:
               {
               MA5: "MA5",
               日K:"Day K"
            },
              legendName: {
                日K: "day k"
              },
              showDataZoom: true
            };
          },
          response => {}
        );
      this.getCityList();
      this.getPeer();
    },
    getPeer: async function() {
      this.peer = [];
      for (let i = 0; i < this.cityList.length; i++) {
        if (
          this.cityList[i].group == this.group &&
          this.peer.length <= 7 &&
          this.model10 != this.cityList[i].code
        ) {
          this.peer.push(this.cityList[i]);
        }
      }
    },
    getCityList: function() {
      for (let i = 0; i < this.cityList.length; i++) {
        if (this.cityList[i].code === this.model10) {
          this.companyName = this.cityList[i].name;
          this.group = this.cityList[i].group;
        }
      }
    },
    changePeer(pe) {
      this.model10 = pe.code;
    },
    addToP() {
      EventBus.$emit("addToPf", this.model10);
      this.prortFolio.push({
        code: this.model10,
        name: this.companyName,
        group: this.group
      });
      this.active = false;
    }
  }
};
</script>
<style scoped>
.buttonZoom {
  margin-bottom: 30px;
  width: 250px;
}
.addIcon {
  right: 1;
  color: black;
}
.addIcon:hover {
  color: rgb(32, 204, 69);
}
h1 {
  text-align: center;
  font-weight: 700;
}
.col1 {
  font: 3em sans-serif;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
a:hover {
  text-decoration: #000;
}
p {
  font-family: "Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", "Arial", "sans-serif";
}
.section {
  display: block;
  position: relative;
  margin: 50px 0;
  width: 480px;
}
.chart {
  margin-top: 20px;
}
.protfio {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-left: 5px;
  position: relative;
  height: 506px;
}
.peerCard {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin-left: 5px;
  position: relative;
}
.news-title {
  color: #000;
  font: 1.2em sans-serif;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
}
.firstRow {
  margin-top: 100px;
}
/* li {
  display: block;
  border-bottom: rgb(107, 105, 105) solid 1px;
} */
.change {
  font-size: 20px;
}
Button {
  margin: 2px 2px;
}
/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-top: rgb(92, 90, 92) solid 1px;
}
.fullWidth-hr {
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}
.middle-hr{
  height: 12px;
  border: 0;
  margin: 0 8%;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}
.stockTrend {
  width: 150px;
  display: inline-block;
  /* height: 50px; */
}
.summary-number{
  float: right;
}
.newRelated {
  color: blue;
  width: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.stockInfoCard{
  margin-left:7px;
  display:inline-block;
  width:48%
}
.stockInfoCard >li{
  display: block;
  border-bottom: rgb(107, 105, 105) solid 1px;
}

</style>
