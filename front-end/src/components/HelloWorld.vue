<template>
<div>
  <Row class="firstRow" >
    <Col offset='4' class="col1" span="16">
    <p>{{ companyName }} <Tooltip content="Add to Myprofolio">   <Button v-if='active'  type="ghost" shape="circle" icon="ios-star-outline" v-on:click='addToP'></Button></Tooltip></p>
    <p><Icon type="code"></Icon> Code: {{ model10 }} </p>
    <p style="color:green"> {{Number(stockInfo['4. close']).toFixed(2)}}<span class="change">{{change}}({{changePg}}%)</span></p>
    <p><Icon type="ios-world-outline"></Icon> Group: {{group}}</p>
    <p>Peer:</p>
   <div class="buttonZoom">
    <Button type="ghost" shape="circle"   v-for="pe in peer" :value='pe.code' :key='pe.name' v-on:click="changePeer(pe)">{{pe.code}}</Button>
   </div>
     <Select v-model="model10" filterable class="section" @input="chartQuote" size="large">
        <Option v-for="item in cityList" :value="item.code" :key="item.name">{{ item.code }}----------{{item.name}}</Option>
    </Select>
    </Col>
    </Row>
    <hr>
    <Row>
      <Col offset='2' span='12'>
    <Card class="card" >
      <p slot="title"> Chart</p>
      <ve-candle class="chart" :data='chartData' :settings='chartSettings'></ve-candle>
    </Card>
  </Col>
  <Col span='8'> 
        <Card class='protfio'>
           <p slot="title">  My Portfolios</p>
            <Row  v-for="p in prortFolio" :value='p.code' :key='p.name' ><Col>       
                <Tag type="dot" closable color="sliver" @on-close="closeTag(p)"><a @click="changePeer(p)"> {{ p.name}}</a></Tag>
            </Col></Row>
        </Card></Col>
    </Row>
<br>
    <Row>
      <Col offset='2' span='10'>
      <Card>
        <p slot="title">Stock Technical Indicators</p>
        <ul>
          <li><span>Simple Moving Average (SMA)</span>{{SMA}}</li>
          <li><span>Exponential Moving Average (EMA)</span>{{EMA }}</li>
          <li><span>Moving Average Convergence/Divergence (MACD)</span>{{MACD}}</li>
          <li><span>Stochastic (STOCH):SlowD</span>{{SlowD}}</li>
          <li><span>Stochastic (STOCH):SlowK</span>{{SlowK}}</li>
           <li><span>Relative Strength Index (RSI)</span>{{RSI}}</li>
          <li><span>Average Directional Movement Index (ADX)</span>{{ ADX  }}</li>
          <li><span>Commodity Channel Index (CCI)</span>{{ CCI  }}</li>
          <li><span>Chaikin A/D Line</span>{{ AD  }}</li>
          <li><span>On Balance Volume (OBV)</span>{{ OBV  }}</li>
          <!-- <li><span>Volume</span>{{ stockInfo['5. volume']  }}</li> -->
        </ul>
        </Card>
         <!-- <Table :columns="columns1" :data="peerInfo"></Table> -->
      </Col>
      <Col  span='10' style="margin-left:7px">
       <Card>
         <p slot="title">
         Stock Informationo Summary</p>
         <li><span>{{companyName }}</span></li>
          <li><span>Code</span>{{model10}}</li>
          <li><span>Change</span>{{change}}</li>
          <li><span>Change(%)</span>{{changePg}}</li>
          <li><span>Open</span>{{ stockInfo['1. open']  }}</li>
          <li><span>High</span>{{ stockInfo['2. high']  }}</li>
          <li><span>Low</span>{{ stockInfo['3. low']  }}</li>
          <li><span>Close</span>{{ stockInfo['4. close']  }}</li>
          <li><span>Volume</span>{{ stockInfo['5. volume']  }}</li>
          <li><span> </span></li>
          </Card>
         <!-- <Table :columns="columns1" :data="peerInfo"></Table> -->
      </Col>
    </Row>
    <Row>
      <Col offset='2' span='20'>
        Peer Info
         <Table :columns="columns1" :data="peerInfo"></Table>
      </Col>
    </Row>
      <br>
    <Row>
      <Col offset='2' span='15'>
                <Card>
                 <p slot="title">News</p>
        <ul>
            <li v-for="item in news" :key="item.headline">
                <a :href="item.url" target="_blank">
                  <p class="news-title">{{ item.headline }}</p><br>{{item.summary}}</a>
                <p>
                    <label style="color:blue">{{item.related}}</label><label style="float:right">{{ item.datetime }}</label>
                </p>
                <br>
            </li>
        </ul>
          </Card>
         <!-- <Table :columns="columns1" :data="peerInfo"></Table> -->
      </Col>
    </Row> 
     <BackTop></BackTop>
  </div>

</template>

<script>
import Vue from "vue";
import stockcardVue from "./stockcard.vue";
import "vue-awesome/icons";
import VCharts from "v-charts";
import iView from "iview";
// import stockData from "./model/stock";
Vue.use(VCharts);
Vue.use(iView);

const elem = {
  code: String,
  name: String,
  group: String
};
const chartD = {
  日期: String,
  open: String,
  close: String,
  lowest: String,
  highest: String,
  vol: String
};

export default {
  name: "HelloWorld",
  data() {
    return {
      code: "",
      cityList: [],
      model10: "MOQ",
      companyName: "MOQ LIMITED",
      group: "Software & Services",
      newRows: [],
      peerInfo: [],
      SMA: "",
      EMA: "",
      MACD: "",
      SlowD: "",
      SlowK: "",
      ADX: "",
      RSI: "",
      CCI: "",
      AD: "",
      OBV: "",
      news: [],
      columns1: [
        {
          title: "Company",
          key: "name",
          fixed: "left",
          width: 100
        },
        {
          title: "Open",
          key: "1. open",
          width: 200
        },
        {
          title: "High",
          key: "2. high",
          width: 200
        },
        {
          title: "Low",
          key: "3. low",
          width: 200
        },
        {
          title: "Close",
          key: "4. close",
          width: 200
        },
        {
          title: "Volume",
          key: "5. volume",
          width: 200
        },
        {
          title: "Change",
          key: "change",
          width: 200
        },
        {
          title: "Change(%)",
          key: "changePres",
          width: 200
        }
      ],
      stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      },
      prortFolio: [],
      active: true,
      value1: "1",
      peer: [
        // {
        //   name: "1-PAGE LIMITED",
        //   code: "1PG",
        //   group: "Software & Services"
        // },
        // {
        //   name: "8COMMON LIMITED",
        //   code: "8CO",
        //   group: "Software & Services"
        // },
        // {
        //   name: "9 SPOKES INTERNATIONAL LIMITED",
        //   code: "9SP",
        //   group: "Software & Services"
        // }
      ],
      chartData: {
        columns: ["日期", "open", "close", "lowest", "highest", "vol"],
        rows: this.newRows
      },
      chartSettings: {}
    };
  },
  computed: {
    change: function() {
      return Number(
        this.stockInfo["4. close"] - this.stockInfo["1. open"]
      ).toFixed(2);
    },
    changePg: function() {
      return Number(this.change / this.stockInfo["1. open"]).toFixed(2);
    }
  },
  components: {},
  created: function() {
    this.$http.get("../../../static/company.json").then(
      response => {
        this.cityList = response.data;
        this.getCityList();
        this.getPeer();
        this.getPeerInfo();
        this.getTechInfo();
      },
      response => {
        // 响应错误回调
        console.log("服务器请求失败");
      }
    );
    this.$http
      .get("https://api.iextrading.com/1.0/stock/market/news/last/5")
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
    this.$http
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
          this.model10 +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(response => {
        // 响应成功回调
        // console.log(response.data["Time Series (Daily)"]);
        let keys = Object.keys(response.data["Time Series (Daily)"]);
        this.stockInfo =
          response.data["Time Series (Daily)"][keys[keys.length - 1]];
        // console.log(response.data["Time Series (Daily)"][keys[keys.length - 1]]);
        for (var i = keys.length - 1; i > 0; i--) {
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
          labelMap: {
            MA5: "ma5"
          },
          legendName: {
            日K: "day k"
          },
          showDataZoom: true
        };
      });
  },
  methods: {
    chartQuote: async function() {
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
            this.model10 +
            ".ax&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            this.newRows = [];
            let keys = Object.keys(response.data["Time Series (Daily)"]);
            this.stockInfo =
              response.data["Time Series (Daily)"][keys[keys.length - 1]];
            for (var i = keys.length - 1; i > 0; i--) {
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
              labelMap: {
                MA5: "ma5"
              },
              legendName: {
                日K: "day k"
              },
              showDataZoom: true
            };
          },
          response => {
          }
        );
      this.getCityList();
      this.getPeer();
      this.getPeerInfo();
      this.getTechInfo();
      // console.log("=======================")
      this.active = true;
      if (this.prortFolio.filter(e => e.code === this.model10).length > 0) {
        this.active = false;
      }
    
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
    getTechInfo:async function() {
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=SMA&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
            // if(response.data){
            let keys = Object.keys(response.data["Technical Analysis: SMA"]);
            if(keys.length>0){
            this.SMA =
              response.data["Technical Analysis: SMA"][keys[keys.length - 1]][
                "SMA"
              ];
                //  console.log("++++++++++++++++++++++++++++++");
          }},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=EMA&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            //      console.log('2');
            // console.log(response);
                     if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: EMA"]);
            if(keys.length>0){
            this.EMA =
              response.data["Technical Analysis: EMA"][keys[keys.length - 1]][
                "EMA"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=MACD&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
                    if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: MACD"]);
            if(keys.length>0){
            this.MACD =
              response.data["Technical Analysis: MACD"][keys[keys.length - 1]][
                "MACD"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=STOCH&symbol=" +
            this.model10 +
            ".ax&interval=15min&slowkmatype=1&slowdmatype=1&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
                    if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: STOCH"]);
            if(keys.length>0){
            this.SlowD =
              response.data["Technical Analysis: STOCH"][keys[keys.length - 1]][
                "SlowD"
              ];
            this.SlowK =
              response.data["Technical Analysis: STOCH"][keys[keys.length - 1]][
                "SlowK"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=RSI&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
                    if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: RSI"]);
            if(keys.length>0){
            this.RSI =
              response.data["Technical Analysis: RSI"][keys[keys.length - 1]][
                "RSI"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=ADX&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
                      if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: ADX"]);
            if(keys.length>0){
            this.ADX =
              response.data["Technical Analysis: ADX"][keys[keys.length - 1]][
                "ADX"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=CCI&symbol=" +
            this.model10 +
            ".ax&interval=15min&time_period=10&series_type=close&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
            // if(response.body){
                        if(response.data)
{
            let keys = Object.keys(response.data["Technical Analysis: CCI"]);
           if(keys.length>0){
           this.CCI =
              response.data["Technical Analysis: CCI"][keys[keys.length - 1]][
                "CCI"
              ];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=AD&symbol=" +
            this.model10 +
            ".ax&interval=daily&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');

          if(response.data)
{
            let keys = Object.keys(
              response.data["Technical Analysis: Chaikin A/D"]
            );
            if(keys.length>0){
            this.AD =
              response.data["Technical Analysis: Chaikin A/D"][
                keys[keys.length - 1]
              ]["Chaikin A/D"];
          }}},
          response => {}
        );
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=OBV&symbol=" +
            this.model10 +
            ".ax&interval=weekly&apikey=D29LHM3HC6349901"
        )
        .then(
          response => {
            // console.log('1');
          if(response.data)
{            let keys = Object.keys(response.data["Technical Analysis: OBV"]);
           if(keys.length>0){
           this.OBV =
              response.data["Technical Analysis: OBV"][keys[keys.length - 1]][
                "OBV"
              ];
          }}},
          response => {}
        );
    },
    getPeerInfo: async function() {
      this.peerInfo = [];
      this.peer.forEach(element => {
        this.$http
          .get(
            "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
              element.code +
              ".ax&apikey=D29LHM3HC6349901"
          )
          .then(
            response => {
              let keys = Object.keys(response.data["Time Series (Daily)"]);
              let newInfo =
                response.data["Time Series (Daily)"][keys[keys.length - 1]];
              newInfo.name = element.code;
              newInfo.change = Number(
                newInfo["4. close"] - newInfo["1. open"]
              ).toFixed(2);
              newInfo.changePres = Number(
                newInfo.change / newInfo["1. open"]
              ).toFixed(2);
              this.peerInfo.push(newInfo);
            },
            response => {}
          );
      });
    },
    changePeer(pe) {
      this.model10 = pe.code;
    },
    addToP() {
      this.prortFolio.push({
        code: this.model10,
        name: this.companyName,
        group: this.group
      });
      this.active = false;
    },
    closeTag(p) {
      this.prortFolio = this.prortFolio.filter(e => e.name !== p.name);
      this.active = true;
      if (this.prortFolio.filter(e => e.code === this.model10).length > 0) {
        this.active = false;
      }
    }
  }
};
</script>
<style scoped>
.buttonZoom {
  margin-bottom: 30px;
  width: 250px;
}
span {
  width: 350px;
  display: inline-block;
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
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
  font: 1.5em sans-serif;
}
.card {
  /* Add shadows to create the 'card' effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
  /* top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;*/
}
.firstRow {
  margin-top: 100px;
}
li {
  display: block;
}
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
hr {
  height: 12px;
  border: 0;
  box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5);
}
</style>
