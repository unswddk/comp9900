<template>
<div>
<table>
  <tr>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <th></th>
    <tr>
  <tr>
    <td>{{code}}</td>
    <td>{{stockInfo["1. open"]}}</td>
    <td>{{stockInfo["4. close"]}}</td>
    <td><changeInfo v-bind:message="change"></changeInfo></td>
    <td><changeInfo v-bind:message="changePg"></changeInfo><label></label></td>
    <td>{{stockInfo["5. volume"]}}</td>
    <td>
      <trend :data="data" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend>
      </td>
      <td><Button type="text" size="small" @click="deleteStock(code)">Delete</Button></td>
  </tr>
</table>
</div>
</template>

<script>
import VCharts from "v-charts";
import Vue from "vue";
import iView from "iview";
import Trend from "vuetrend";
import changeInfo from"./change"
Vue.use(Trend);
Vue.use(VCharts);
Vue.use(iView);
export default {
  name: "stockcard",
  props: { code: "" },
  data: () => {
    return {
      newRows: [],
      data: [],
      stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      }
    };
  },
  components:{
    changeInfo
  },
  computed: {
    change: function() {
      return Number(
        this.stockInfo["4. close"] - this.stockInfo["1. open"]
      ).toFixed(2);
    },
    changePg: function() {
      return Number(this.change / this.stockInfo["1. open"]).toFixed(2)+"%";
    }
  },
  created: function() {
    this.$http
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
          this.code +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(
        response => {
          console.log(response);
          if (response.data["Time Series (Daily)"]) {
            let keys = Object.keys(response.data["Time Series (Daily)"]);
            console.log(keys);
            for (var i = keys.length - 1; i > 0; i--) {
              this.data.push(
                Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
              );
            }
          }
        },
        response => {
          console.log("服务器请求失败");
        }
      );
  },
  mounted:function() {
     this.$http.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
          this.code +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(response => {
        if(response.data){
        console.log(response.data);
        let keys = Object.keys(response.data["Time Series (Daily)"]);
        this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
        }})
  },
  methods: {
    deleteStock(code) {
      this.$emit("listenToChildeEvent", code);
    },
  }
};
</script>
<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
td {
  padding: 8px;
  /* text-align: center; */
  width: 80px;
  border-bottom: 1px solid #ddd;
}
tr:hover {
  background-color: #f5f5f5;
}
</style>
