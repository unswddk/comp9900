<template>
<div>
    <loading :show="loading.show"></loading>
        <h2>Stock Technical Indicators</h2>
<div v-if="!loading.show" class="techIndutorCard">
    <li> Simple Moving Average (SMA): <span class="number">{{SMA?SMA:''}}</span></li>
    <li> Exponential Moving Average (EMA):  <span class="number">{{EMA?EMA:"" }}</span></li>
    <li> Moving Average Convergence/Divergence (MACD):  <span class="number">{{MACD}}</span></li>
    <!-- <li> Stochastic (STOCH):SlowD {{SlowD}}</li> -->
    <!-- <li> Stochastic (STOCH):SlowK {{SlowK}}</li> -->
    <li> Relative Strength Index (RSI):  <span class="number">{{RSI}}</span></li>
    <li> Average Directional Movement Index (ADX):  <span class="number">{{ ADX  }}</span></li>
    <li> Commodity Channel Index (CCI): <span class="number"> {{ CCI  }}</span></li>
    <li> Chaikin A/D Line:  <span class="number">{{ AD  }}</span></li>
    <li> On Balance Volume (OBV):  <span class="number">{{ OBV  }}</span></li>
</div>
</div>
</template>
<script>
// import "vue-awesome/icons";
export default {
  props: ["message"],
  name: "techInductor",
  data() {
    return {
    showCard:false,
      ADX:"",
      OBV:"",
      EMA:"",
      RSI:"",
      SMA:"",
      CCI:"",
      AD:"",
      MACD:"",
    };
  },
  computed: {
    loading() {
      return {
        show: this.$store.getters.isLoading
      };
    }
  },
  created:function () {
          
      this.getTechIntor();
  },
  watch:{
      message:{
          handler(val){
            this.getTechIntor()
          }
      }
  },
  methods: {
  getTechIntor:function(){
    this.$http
      .get("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getTechIndicators/"+this.message).then(
        response => {
          if (JSON.stringify(response.body) !== "{}") {
            this.ADX = response.body.ADX || "";
            this.OBV = response.body.OBV || "";
            this.RSI = response.body.RSI || "";
            this.SMA = response.body.SMA || "";
          }
        },
        response => {
          console.log(response);
        }
      );
    this.$store.dispatch("openLoading");
    setTimeout(() => {
      this.$store.dispatch("closeLoading");
    }, 10000);
    }
  }
};
</script>

<style>
.number{
    float: right;
}
/* li {
  display: block;
  border-bottom: rgb(107, 105, 105) solid 1px;
} */
.techIndutorCard >li{
    display: block;
  border-bottom: rgb(107, 105, 105) solid 1px;
}

</style>