<template>
<div class="polaroid">
<div class="img-container">
    <img src="../../static/image/6.png" alt="Norway" style="width:100%;height: auto">
</div>
    <div class="container">  
      <br>
      <br>
      <div  v-for="c in coinList" :key="c.index">
        <!-- {{c.code}} -->
      <coinsInfo class="coin-info" v-bind:message="c.code"></coinsInfo> 
    </div>
      <Page :current="start" :total="total" simple @on-change="pageNumberChange"></Page>
<br>
    </div>
  </div>
</template>
<script>
import coinsInfo from "./coins.vue";
export default {
  name: "coinsInfoCard",
  data() {
    return {
      coinList: [],
      totalCoinList: [],
      pageNum: 1,
      stockList:[],
      total:0,
      start:0
    };
  },
  computed: {},
  components: {
    coinsInfo
  },
  created(){
      this.$http.get("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getCompanyInfo").then(
      response => {
        this.stockList = response.data.company;
        this.total=this.stockList.length;
        this.start=1;
      },
      response => {
        // 响应错误回调
        console.log("服务器请求失败");
      }
    );
  },
  methods: {
    pageNumberChange(page) {
      console.log(page);
      this.coinList = this.stockList.slice((page - 1) * 10, page * 10);
     console.log(this.stockList.slice((page - 1) * 10, page * 10))
    //  .forEach(element => {
    //     this.coinList.push(element);
    //   });
    }
  }
};
</script>
<style scoped>
.polaroid {
  width: 90%;
  height: 500px;
  background: #000;
  /* margin-right: 10px; */
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
.container {
  text-align: justify;
  padding: 10px 20px;
  overflow: hidden;
}
.img-container {
  width: 100%;
  height: 100px;
  overflow: hidden;
}
</style>
