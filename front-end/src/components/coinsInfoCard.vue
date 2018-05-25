<template>
<div>
<div class="chips-contioner">
         <md-chips class="md-primary" v-model="codes" md-placeholder="Input code..." :md-format="toUppercase" @md-delete='resetList' @md-insert="handleInsertCode">
      <label>Search By Code</label>
      <div class="md-helper-text">Three uppercase letters</div>
    </md-chips>

      <md-chips class="md-primary" v-model="groupOrCompy" md-placeholder="Something You like ..." :md-format="formatName" @md-delete='resetListGroup' @md-insert="handleInsertGroup">
      <label>Search For Group Or Company Name</label>
      <div class="md-helper-text">Health Care Equipment, Services, Real Estate</div>
    </md-chips>
</div>

   <div class="md-layout md-gutter md-alignment-center">
 

    <!-- <md-content class="md-elevation-15" v-for="c in coinList" :key="c.index"> <coinsInfo class="coin-info" v-bind:message="c.code" ></coinsInfo> </md-content> -->

      <!-- <div  v-for="c in coinList" :key="c.index" class="coin-info"> -->
      <coinsInfo class="coin-info" v-bind:message="c" v-for="c in coinList" :key="c.index"  ></coinsInfo> 
    <!-- </div> -->
  </div>
      <!-- <md-divider></md-divider>  -->
      <Page :current="start" :total="total" simple @on-change="pageNumberChange" style="float:right"></Page>
</div>
</template>
<script>
import coinsInfo from "./coins.vue";
export default {
  name: "coinsInfoCard",
  data() {
    return {
      coinList: [],
      codes:[],
      groupOrCompy:[],
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
        this.coinList = this.stockList.slice((1 - 1) * 12, 1 * 12);
        this.total=this.stockList.length;
        this.start=1;
      },
      response => {
        console.log("Error");
      }
    );
  },
  methods: {
      toUppercase (str) {
      str = str.replace(/\s/g, '').toUpperCase();
      let a =this.stockList.filter(e=>e.code==str);
      if (str.length !== 3 || a.length ===0) return false
      return str
    },
    formatName (str) {
      let words = str.split(' ').filter(str => str !== '')
      // remove accents / diacritics
      words = words.map(str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      // capitalize
      words = words.map(str => str[0].toUpperCase() + str.slice(1))
      return words.join(' ')
    },
    pageNumberChange(page) {
      console.log(page);
      this.coinList = this.stockList.slice((page - 1) * 12, page * 12);
    },
    resetList(text, index){
      //  this.coinList = this.stockList.slice((1 - 1) * 12, 1 * 12);
      if(index===0){
        this.coinList = this.stockList.slice((this.start - 1) * 12, this.start * 12);
      }else{
        let a =this.stockList.filter(e=>this.codes.includes(e.code));
            if(a.length<=12){
              this.coinList=[]
              a.forEach(element => {
                this.coinList.push(element);
              });
            }
      }
    },
    handleInsertCode(text, index){
        let a =this.stockList.filter(e=>this.codes.includes(e.code));
            if(a.length<=12){
              this.coinList=[]
              a.forEach(element => {
                this.coinList.push(element);
              });
              }else{
              this.coinList = a.slice((this.start - 1) * 12, this.start * 12);
            }
    },
    //handleInsertGroup
    handleInsertGroup(text, index){
      console.log(text);
        let a =this.stockList.filter(e=>{
          var reg = new RegExp(text);
           if(e.group.match(reg) || e.name.match(reg)){
             return e;
    }
        } 
        );
        if(a.length<=12){
              this.coinList=[]
              a.forEach(element => {
                this.coinList.push(element);
              });
            }else{
              this.coinList = a.slice((this.start - 1) * 12, this.start * 12);
            }
    },
    resetListGroup(text, index){
      console.log(index);
      if(index===0){
        this.coinList = this.stockList.slice((this.start - 1) * 12, this.start * 12);
      }else{
        let word= this.groupOrCompy[index-1]
           let a =this.stockList.filter(e=>{
          var reg = new RegExp(word);
           if(e.group.match(reg) || e.name.match(reg)){
             return e;
    }
        } 
        );
        if(a.length<=12){
              this.coinList=[]
              a.forEach(element => {
                this.coinList.push(element);
              });
            }else{
              this.coinList = a.slice((this.start - 1) * 12, this.start * 12);
            }
      }
    }

  }
};
</script>
<style scoped>
.coin-info{
  display: inline-block;
}
.chips-contioner {
  margin: 40px 10%;
  align-items: center;
}
</style>
