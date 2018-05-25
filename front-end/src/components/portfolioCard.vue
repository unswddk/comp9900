<template>
<div class="md-layout">
    <md-card>  
    <md-card-header>
        <md-card-header-text>
            <div class="md-title">{{message.name}}    <md-button class="md-icon-button md-dense md-primary" style="float:right" @click="follow" v-if="canfollow">

              <md-icon>bookmark</md-icon>
            </md-button>
                    <md-button class="md-icon-button  md-dense md-accent" style="float:right" @click="unfollowP" v-if="unfollow">
                            <md-icon>remove</md-icon>
            </md-button>
            </div>
            <div class="md-subhead">{{message.portfolioName}}
                <small style="float:right">Followers {{message.followers.length}}</small>
            </div>
        </md-card-header-text>
    </md-card-header>
      <md-card-media-cover md-solid >
        <md-card-media>
          <img  src="../../static/image/7.png"/>
        </md-card-media>
        <md-card-area>
          <md-card-header>
            <span class="md-title">Nothing</span>
            <span class="md-subhead">
                Total Earn:<br>
                <md-icon class="md-primary">attach_money</md-icon>{{message.earn}}</span>
          </md-card-header>

          <md-card-actions>
            <md-button class="md-icon-button md-accent" @click="dialogActive=true" v-if="canReword">
              <md-icon>attach_money</md-icon>
    <md-dialog-prompt
      :md-active.sync="dialogActive"
      v-model="quantity"
      md-title="What's the amount?"
      md-input-maxlength="10"
      md-input-placeholder="Type your number..."
      md-confirm-text="Done"
      @md-confirm="reward" />
            </md-button>
                    {{message.donation}} 
            <md-button class="md-icon-button" @click="rightContent=!rightContent" >
              <md-icon>arrow_forward_ios</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card-media-cover>
    </md-card>
    <div class="rightContainer" v-if="rightContent">
    <div>
        <md-content>ID</md-content>
        <md-content >CODE</md-content>
        <md-content>STATE</md-content>
        <md-content >PRICE</md-content>
        <md-content>AMOUNT</md-content>
        <span>DATE</span>
        <md-content >OPEN</md-content>
        <md-content>CLOSE</md-content>
        <md-content>VOLUME</md-content>
        <span>   CHART</span>
        <md-content>Remove</md-content>
  </div>

         <md-divider></md-divider>
        <portfolioSingleStock v-for="(value,key) in message.stocks" v-bind:message="value" v-bind:Pkey="pkey" :key="key" ></portfolioSingleStock>
    </div>
  </div>
</template>
<script>
import portfolioSingleStock from "./portfolioSingleStock"
export default {
  name: "portfolioCard",
  props:["message","pkey"],
  data() {
    return {
        rightContent:false,
        dialogActive:false,
        quantity:null
    };
  },
  computed:{
      canfollow(){
        //   console.log(this.$store.state.allPortfolio[this.pkey].followers)
        //   console.log(this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email)
        //   console.log(this.$store.state.allPortfolio[this.pkey].followers.indexOf(this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email));
          if(this.$store.state.allPortfolio[this.pkey].followers.includes(this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email)){
              return false;
          }else if(this.pkey === this.$store.state.web3.coinbase){
              return false;
          }else{
              return true;
          }
      },
      unfollow(){
          return this.$store.state.allPortfolio[this.pkey].followers.includes(this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email)
      },
        canReword(){
            return this.pkey !== this.$store.state.web3.coinbase
        },
  },
  components:{
      portfolioSingleStock
  },
  methods:{
    follow(){
        let e = this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email;
        this.$store.state.portfolioInstace().follow(this.pkey, web3.fromAscii(e),
         {
              gas: 3000000,
              from: this.$store.state.web3.coinbase,
            },
            (err,result)=>{
            if (err) console.log(err);
            // this.$store.state.info.items.splice(this.index,1)
            if (result) console.log(result+"========follow========");
           });
    },
    unfollowP(){
        let e = this.$store.state.allPortfolio[this.$store.state.web3.coinbase].email;
        this.$store.state.portfolioInstace().unfollow(this.pkey,web3.fromAscii(e),
        {
              gas: 3000000,
              from: this.$store.state.web3.coinbase,
            },
            (err,result)=>{
            if (err) console.log(err);
            // this.$store.state.info.items.splice(this.index,1)
            if (result) console.log(result+"========follow========");
           });
    },
    reward(){
        //transferEther(address _address) 
        console.log(this.quantity);
        this.$store.state.portfolioInstace().transferEther(this.pkey,this.quantity,{
              gas: 3000000,
              from: this.$store.state.web3.coinbase,
              vlaue: this.$store.state.web3.web3Instance().toWei(0, 'ether')
            },(err,res)=>{
            if(err) console.log(err);
            if(res) console.log(res);
        })
    }
  }
};
</script>
<style lang="scss" scoped>

  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .md-content{
    width: 50px;
    height: 20px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  span{
      width: 100px;
      display: inline-block;
       margin-left: 10px;
  }
  .rightContainer{
      display: inline-block;
    left:30%
  }
</style>
