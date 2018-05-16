<template>
  <div class="polaroid">
    <div class="container">{{message}}</div>
    <ve-candle class="chart" :data='chartData' :settings='chartSettings'></ve-candle> 
    <!-- <div class="container">{{message}}</div> -->
  </div>
</template>
<script>
export default {
  name: "peerCard",
  props: ["message"],
  data() {
    return {
    newRows:[],
    stockInfo:[],
    chartData: null,
    chartSettings: {},
    };
  },
created:function(){
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
            this.message +
            ".ax&apikey=D29LHM3HC6349901"
        )
        .then(response => {
          let keys = Object.keys(response.data["Time Series (Daily)"]);
          this.stockInfo = response.data["Time Series (Daily)"][keys[0]];
          for (var i = keys.length - 1; i > 0; i--) {
            // this.stockData.push(
            //   Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
            // );
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
           this.chartSettings = {};
          this.chartSettings = {
            showMA: true,
            showVol: true,
            labelMap: {
              MA5: "MA5",
              日K:"Day K"
            },
            legendName: {
              日K: "Day K" 
            },
            showDataZoom: false
          };
        });
    }
};
</script>
<style scoped>
.polaroid {
  /* padding: 10px 10px; */
  /* width: 350px;
  display: inline-block; */
  /* height: 300px; */
  background: #000;
  /* margin-right: 10px; */
  background-color: white;
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  /* margin-bottom: 15px; */
}
.container {
  text-align: center;
  padding: 10px 20px;
}
.chart{

    width: 100%;
    padding: 10px 20px;
    /* display: inline-block; */
    /* margin: 0 10px; */
}
</style>
