<template>
  <div>
    <div class="text-container">
      {{message}} |
      {{stockInfo["1. open"]}} |
      {{stockInfo["2. high"]}} |
      {{stockInfo["3. low"]}}  |   
      {{stockInfo["4. close"]}} |
      {{stockInfo["5. volume"]}} |
    </div>
      <div  class="trend">
          <trend :data="data" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend>
      </div>
  </div>
</template>
<script>
export default {
  name: "coinsInfo",
  props: ["message"],
  data() {
    return {
      value: "this is coin info page",
      data:[],
      stockInfo: {
        "1. open": "",
        "2. high": "",
        "3. low": "",
        "4. close": "",
        "5. volume": ""
      },
    };
  },
  watch:{
    message(){
      this.$http
        .get(
          "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
            this.message+
            ".ax&interval=1min&apikey=W9NHUIDE7JQITIA2"
        )
        .then(
          response => {
            console.log(response);
        let keys = Object.keys(response.data["Time Series (1min)"]);
        console.log(keys[0]);
        console.log(response.data["Time Series (1min)"])
        this.stockInfo = response.data["Time Series (1min)"][keys[0]];
         for (var i = keys.length - 1; i > 0; i--) {
              this.data.push(
                Number(response.data["Time Series (1min)"][keys[i]]["1. open"])
              );
            }
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>
<style scoped>
.text-container{
  display: inline-block;
}
.trend{
  display: inline-block;
  width: 100px;
}
</style>
