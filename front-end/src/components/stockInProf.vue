<template>
<div>
     <!-- <Button type="text"  @click="showAdd =!showAdd">Add Stock</Button><div  v-if="showAdd"> -->
     <Select v-model="stockCode" filterable class="section" @input="addStock()" size="small">
        <Option v-for="item in stockList" :value="item.code" :key="item.name">{{ item.code }}----------{{item.name}}</Option>
    </Select>
    <stockcard v-for="item in showStock" v-bind:code="item" :key="item"></stockcard>
</div>
</template>

<script>

import VCharts from "v-charts";
import Vue from "vue";
import stockcard from "./stockcard.vue";
import iView from "iview";
Vue.use(VCharts);
Vue.use(iView);
export default {
  name: "stockInProf",
  props: ["title"],
  data() {
    return {
      message: "hello",
      profList: [],
      stockCode: "MOQ",
      showAdd: false,
      stockList: [],
      showStock: [],
      chartSettings: {}
    };
  },
  components: {
    stockcard
  },
  computed: {},
  created: function() {
    this.$http.get("http://localhost:3000/getCompanyInfo").then(
      response => {
        this.stockList = response.data.company;
      },
      response => {
        console.log("服务器请求失败");
      }
    );
    this.$http
      .post(
        "http://localhost:3000/getPf",
        JSON.stringify({ email: localStorage.mail })
      )
      .then(
        response => {
          this.profList = response.data.prof;
          console.log(this.profList );
          this.stockList = [];
          this.profList.forEach(element => {
              if(this.title in element){
                  this.stockList=element[this.title];
                  console.log(this.title);
              }
          });
          
        },
        response => {
          console.log(response);
        }
      );
  },

  methods: {
    addStock() {
    console.log(this.profList);
      console.log(this.title);
      this.stockList = this.profList[this.title];
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
