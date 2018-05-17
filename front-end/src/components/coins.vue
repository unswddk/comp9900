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
            <md-button class="md-primary" v-on:click='addToP' v-if="active">Add</md-button>
          </div>

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
  created(){
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
      EventBus.$emit("addToPf", this.model10);
      this.active = false;
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
