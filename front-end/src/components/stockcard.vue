<template>
<div>
    <p>{{code}}</p>
    <Card class="card">
             <!-- <ve-candle class="chart" :data='chartData' :settings='chartSettings'></ve-candle> -->
    </Card>
</div>
</template>

<script>
import "vue-awesome/icons";
import VCharts from "v-charts";
import Vue from "vue";
import iView from "iview";
Vue.use(VCharts);
Vue.use(iView);
export default {
  name: "stockcard",
  props: {
    code: ""
  },
  data: () => {
    return {
      newRows: [],
      chartData: {
        columns: ["日期", "open", "close", "lowest", "highest", "vol"],
        rows: this.newRows
      },
      chartSettings: {}
    };
  },
  mounted: function() {
    this.$http
      .get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
          this.code +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(
        response => {
          // 响应成功回调
          console.log(this.code);
          console.log(response.data["Time Series (Daily)"]);
          let keys = Object.keys(response.data["Time Series (Daily)"]);
          for (var i = keys.length - 1; i > 0; i--) {
            this.newRows.push({
              日期: keys[i],
              open: response.data["Time Series (Daily)"][keys[i]]["1. open"],
              close: response.data["Time Series (Daily)"][keys[i]]["4. close"],
              lowest: response.data["Time Series (Daily)"][keys[i]]["3. low"],
              highest: response.data["Time Series (Daily)"][keys[i]]["2. high"],
              vol: response.data["Time Series (Daily)"][keys[i]]["6. volume"]
            });
          }
          console.log(this.newRows);
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
          // 响应错误回调
          console.log("服务器请求失败");
        }
      );
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
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
.chart {
  margin-top: 20px;
}
/* .card {
  position: relative;
  width: 40%;
  height: 400px;
  margin-top: 10px;
  display: inline-block;
  margin-left: 8px;
  left: 4%;
} */
.card {
  /* Add shadows to create the 'card' effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 440px;
  width: 72%;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  border-top: rgb(92, 90, 92) solid 1px;
}
/* Add some padding ixnside the card container */
</style>
