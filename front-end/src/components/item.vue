<template>

<md-card>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{message["name"]}}</div>
          <div class="md-subhead">Owner: {{message["ownerName"]}}</div>
        </md-card-header-text>

        <md-card-media md-medium>
            <div v-if="showStock" class="trend">
          <trend :data="data" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend>
            </div>
          <img v-if="!showStock" :src="imageLink()" alt="People">
        </md-card-media>
      </md-card-header>
     <md-card-content>

Total Amount: {{message["amount"]}}<br>
                  <div  v-if="isBuyer">
        Input Amount:<InputNumber :max="max" :min="1" v-model="amountValue"></InputNumber>
        </div>
   Price: <span v-if="!showStock">{{message["price"]}}</span>
            <span v-if="showStock">  {{price}}</span><br>
            <span v-if="showStock">Change:  {{change}}</span><br>
            <span v-if="showStock"><b>Earn:  {{change * message["amount"]}}</b></span>



            </md-card-content>
      <md-card-actions>
    <md-button class="md-raised md-primary" v-if="isSeller" @click="modal=true">Modify</md-button>
    <md-button class="md-raised md-primary"  v-if="isBuyer" @click="buyItem()"> Buy</md-button>
    <md-button class="md-raised md-primary"  v-if="isSellable" @click="sellItem()"> Sell</md-button>
    <md-button class="md-raised md-accent"v-if="isDeleteAble" @click="deleteItem()">Delete</md-button>
      </md-card-actions>
  




  <!-- <div class="polaroid"> -->
<!-- <div class="container"> -->
   <!-- <h3>Item Name: {{message["name"]}}</h3> -->
<!-- </div> -->
<!-- <div v-if="showStock" class="trend"> -->
          <!-- <trend :data="data" :gradient="['#6fa8dc', '#42b983', '#2c3e50']" auto-draw smooth></trend> -->
<!-- </div> -->
<!-- <div class="trend"> -->
    <!-- <img v-if="!showStock" src="../../static/image/3.png" alt="oo" style="width: 100%;" > -->
<!-- </div> -->
    <!-- <div class="text-container"> -->
        <!-- {{message["state"]}}<br> -->
        <!-- Total Amount: {{message["amount"]}}<br>
                  <div  v-if="isBuyer">
        Input Amount:<InputNumber :max="max" :min="1" v-model="amountValue"></InputNumber>
        </div> -->
        <!-- {{message.state}} -->
        <!-- Price: <span v-if="!showStock">{{message["price"]}}</span>
            <span v-if="showStock">  {{price}}</span><br>
            <span v-if="showStock">Change:  {{change}}</span><br>
            <span v-if="showStock"><b>Earn:  {{change * message["amount"]}}</b></span>
        <br>
  
        OwnerName: {{message["ownerName"]}}<br>
     -->
    <!-- </div> -->
        <!-- <div class="btn-container"> -->
    <!-- <md-button class="md-raised md-primary" v-if="isSeller" @click="modal=true">Modify</md-button>
    <md-button class="md-raised md-primary"  v-if="isBuyer" @click="buyItem()"> Buy</md-button>
    <md-button class="md-raised md-primary"  v-if="isSellable" @click="sellItem()"> Sell</md-button>
    <md-button class="md-raised md-accent"v-if="isDeleteAble" @click="deleteItem()">Delete</md-button> -->

<!--  
        <Button type="primary" v-if="isSeller" @click="modal=true"> Modify</Button>
        <Button type="primary" v-if="isBuyer" @click="buyItem()"> Buy</Button>
        <Button type="primary" v-if="isSellable" @click="sellItem()"> Sell</Button>



         <Button type="primary" v-if="isDeleteAble" @click="deleteItem()">Delete</Button> -->
        <!-- </div> -->
    <!-- </div> -->
  </Modal>
       <Modal
        v-model="modal"
        title="mofify Item"
        okText="Submit"
        cancelText="Cancel"
        @on-ok="mofifyItem"
        @on-cancel="handleReset">
          <Form ref="modifyItemform" :model="modifyItemform" label-position="left" :rules="modifyItemformRules" :label-width="80">
         <FormItem label="name" prop="name">
            <Input v-model="modifyItemform.name" placeholder="Enter Item Name" required></Input>
        </FormItem>
        <FormItem label="Slider">
            <Slider v-model="modifyItemform.amount" ></Slider>
        </FormItem>
         <FormItem label="price" prop="price">
            <Input v-model="modifyItemform.price"  placeholder="Enter item price" required></Input>
        </FormItem>
         </Form>
</Modal>
  </md-card>
</template>
<script>
export default {
    name:"itemVue",
    props: ['message','index'],
    data () {
        const validateNumber = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Can not be empty"));
      } else if (isNaN(value)) {
        callback(new Error("Please enter a number"));
        } else if (value<0) {
        callback(new Error("Please enter a positive number"));
      } else {
        callback();
      }
    };
        return {
        modal:false,
        data:[],
        price:0,
        showStock:false,
        amountValue:this.message["amount"],
        max: this.message["amount"],
        modifyItemform: {
        amount:parseInt(this.message.amount),
        name: this.message.name,
        change:0,
        price: parseFloat(this.message.price)
      },
      modifyItemformRules: {
        name: [
          {
            required: true,
            // message: "please enter the name of item",
            trigger: "blur"
          }
        ],
        price: [{ validator: validateNumber, trigger: "blur" }]
      }
    }
    },
    computed:{
        isBuyer(){
                   return this.$store.state.userInfo.some(element => {
                       return element.address === this.$store.state.web3.coinbase 
                       && element.role === 2 &&
                        this.$store.state.web3.coinbase !== this.message.owner
                        && this.message.state.replace(/\u0000/g, '') !=="bug"
                        && this.message.amount !==0;
                   });
        },
        isDeleteAble(){
            return this.$store.state.web3.coinbase === this.message.owner;
        },
        isSellable(){
             if(this.$store.state.web3.coinbase === this.message.owner){
                    return this.$store.state.userInfo.some(element => {
                       return element.address === this.$store.state.web3.coinbase && element.role === 2
                       && this.message.state.replace(/\u0000/g, '') !=="selling"  

                   });
             }else{return false;}
        },
        isSeller(){
                if(this.$store.state.web3.coinbase === this.message.owner){
                  return this.$store.state.userInfo.some(element => {
                       return element.address === this.message.owner && element.role === 1;
                   });
                }
                else{
                    return false;
                } 
        }
    },
    created(){
        let symble = this.message.name.replace(/\u0000/g, '')
        if(this.message.name.replace(/\u0000/g, '').length ===3){
            // this.message.price = this.message.price/100;
             this.$http.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=" +
          symble +
          ".ax&apikey=D29LHM3HC6349901"
      )
      .then(
        response => {
          if (response.data["Time Series (Daily)"]) {
            let keys = Object.keys(response.data["Time Series (Daily)"]);
            console.log(keys);
            this.price = this.message.price/100;
            let stockInfo = response.data["Time Series (Daily)"][keys[0]];
            this.change = stockInfo["4. close"] - stockInfo["1. open"];
            for (var i = keys.length - 1; i > 0; i--) {
              this.data.push(
                Number(response.data["Time Series (Daily)"][keys[i]]["1. open"])
              );
            }
          }
          this.showStock=true;
        },
        response => {
          console.log("服务器请求失败");
        }
      );
  }

    },
    methods:{
        buyItem(){
        this.$store.state.contractInstance().transferEther(this.message.owner, this.message.id ,this.amountValue,{
               from: this.$store.state.web3.coinbase,
               gas:3000000,
               vlaue: this.$store.state.web3.web3Instance().toWei(this.amountValue*this.message.price, 'ether')
            },
            (err,result)=>{
            if (err) console.log(err);
            // this.$store.state.info.items.splice(this.index,1)
            if (result) console.log(result+"========purchase========");
           });
    },
    mofifyItem(){
        console.log(this.message.id);
      this.$refs.modifyItemform.validate(valid => {
        if (valid) {
            console.log(this.modifyItemform.name);
          this.$store.state.contractInstance().updateItem(
            this.$store.state.web3.coinbase,
            web3.fromAscii(this.modifyItemform.name),
            this.message.id,
            web3.fromAscii("updated"),
            this.modifyItemform.amount,
            this.modifyItemform.price,
            {
              gas: 300000,
              from: this.$store.state.web3.coinbase,
            },
            (err, result) => {
              if (err) {
                  console.log("=========err=======");
                console.log(err);
              } else {
                  console.log("========success updata========"+result);


                this.$Message.success("Success!");
              }
            }
          );
        } else {
          this.$Message.error("Fail!");
          this.$refs.addItemform.resetFields();
        }
      });
    },
    handleReset(){},
    sellItem(){
        this.$store.state.contractInstance().updateItemState(this.message.owner,this.message.id,web3.fromAscii("selling"),{
               from: this.$store.state.web3.coinbase,
               gas:3000000,
            },
            (err,result)=>{
            if (err) console.log(err);
            if (result) console.log(result+"========selling========");
           });
    },
    deleteItem(){
        this.$store.state.contractInstance().deleteItem(this.message.id,{
               from: this.$store.state.web3.coinbase,
               gas:3000000,
            },
            (err,result)=>{
            if (err) console.log(err);
            if (result) console.log(result+"========delete========");
           });
    },
    imageLink(){
            return 'https://picsum.photos/300/200/?image='+ this.index+10+'&gravity=east';},
}
}
</script>
<style scoped>
 .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
.polaroid {
  width: 90%;
  /* border: 1px solid red; */
  height: 290px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
.container {
  text-align: left;
  padding: 10px 20px;
}
/* .closeIcon{
  position: absolute;
  margin-left: 190px;
  font-size: 20px;
  margin-top: -8px;
  color: silver;
} */
.text-container{
    padding: 10px 20px;
    height: 100px;
    /* background: #000; */
    overflow: hidden;
}
.btn-container{

     /* padding: 10px 20px; */
     /* height: 50px; */
    /* position: 0 0; */
    /* background: #000; */
}
.trend{
    /* background: black; */
    width: 100%;
    padding: 22px 10px;
    /* margin: 5px 0px; */
    margin-bottom: 5px;
}
</style>
