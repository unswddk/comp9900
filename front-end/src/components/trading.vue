<template>
  <div class="trading-board"> 
      <div>    
    <md-button class="md-primary" v-if="!info.isUser"  @click="modal2 = true">Join To Our Trading Board</md-button>
    <md-button class="md-primary" @click="modal = true" v-if="isSeller">Click to add a New Item</md-button>
</div>
<div class="md-layout md-gutter  md-alignment-center">
        <itemVue class="md-layout-item md-large-size-25  md-medium-size-25 md-small-size-50 md-xsmall-size-100" v-bind:message="item" v-bind:index="index" v-for=" (item,index) of info.items" :key="item.index"></itemVue>
</div>
    <!-- <div> large-->
 
    <!-- <Button type="primary" v-if="!info.isUser"  @click="modal2 = true">Join</Button> -->
    <!-- <Button type="primary" @click="modal = true" v-if="isSeller"> add</Button> -->
    <!-- </div> -->


       <Modal
        v-model="modal"
        title="Additem"
        okText="Submit"
        cancelText="Cancel"
        @on-ok="addItem"
        @on-cancel="handleReset">
          <Form ref="addItemform" :model="addItemform" label-position="left" :rules="addItemRule" :label-width="80">
         <FormItem label="name" prop="name">
            <Input v-model="addItemform.name" placeholder="Enter Item Name" required></Input>
        </FormItem>
        <FormItem label="Slider">
            <Slider v-model="addItemform.amount" ></Slider>
        </FormItem>
         <FormItem label="price" prop="price">
            <Input v-model="addItemform.price"  placeholder="Enter item price" required></Input>
        </FormItem>
         </Form>
        </Modal>

              <Modal
                v-model="modal2"
                title="AddUser"
                okText="Submit"
                cancelText="Cancel"
                @on-ok="createUser"
                @on-cancel="handleReset">
                  <Form ref="addUerForm" :model="addUerForm" label-position="left" :rules="addUerFormRules" :label-width="80">
                <FormItem label="name" prop="name">
                    <Input v-model="addUerForm.name" placeholder="Enter Name" ></Input>
                </FormItem>
                <FormItem label="Role">
                    <RadioGroup v-model="addUerForm.radio">
                        <Radio label=1>Seller</Radio>
                        <Radio label=2>Buyer</Radio>
                    </RadioGroup>
                </FormItem>
                </Form>
                </Modal>
  </div>

</template>
<script>
import { mapGetters } from 'vuex'
import itemVue from './item.vue'
export default {
  name: "tradeBoard",
  data() {
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
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Can not be empty"));
      } else if (value.length < 4) {
       
        callback(new Error("Name required more then 4 letter"))
        ;}
        else{
           console.log(value.length);
        callback();
      }
    };
    return {
      value: "tradeBoard",
      modal: false,
      modal2: false,
      itemIds: {},
      allItems: [],
      addUerForm: {
        name: "",
        // balance: null,
        radio: 1
      },
      addUerFormRules: {
        name: [
          { required: true, message: "please enter name ", trigger: "blur" },
          {
           validator: validateName, trigger:"blur"
          }
        ],
      },
      addItemform: {
        amount: 20,
        name: null,
        price: null
      },
      addItemRule: {
        name: [
          {
            required: true,
            message: "please enter the name of item",
            trigger: "blur"
          },{
            validator: validateName, trigger:"blur"
          }
        ],
        price: [{ validator: validateNumber, trigger: "blur" }]
      }
    };
  },
  computed:{
      info(){
          return this.$store.state.info
      },
      userInfo(){
          return this.$store.state.userInfo
      },
      isSeller(){
            // return (
                if(this.$store.state.info.isUser){
                  return this.$store.state.userInfo.some(element => {
                       return element.address === this.$store.state.web3.coinbase && element.role === 1;
                   });
                }
                else{
                    return false;
                } 
        }
    },
  created(){},
  mounted(){},
  components:{
      itemVue
  },
  methods: {
    createUser() {
      this.$refs.addUerForm.validate(valid => {
        if (valid) {
         console.log(typeof this.addUerForm.radio);
          this.$store.state.contractInstance().insertUser(
            this.$store.state.web3.coinbase,
            web3.fromAscii(this.addUerForm.name),
            this.$store.state.web3.balance,
            parseInt(this.addUerForm.radio),
            {
              gas: 300000,
              from: this.$store.state.web3.coinbase
            },
            (err, result) => {
              if (err) {
                console.log(err);
                this.$Message.error("Create account failed!");
              } else {
                this.itemIds[this.$store.state.web3.coinbase] = [];
                this.$Message.success("Create account Successed!");
              }
            }
          );
        } else {
        }
      });
    },
    addItem() {
      this.$refs.addItemform.validate(valid => {
        if (valid) {
            console.log(this.$store.state.info.items.length);
          this.$store.state.contractInstance().insertItem(
            this.$store.state.web3.coinbase,
            web3.fromAscii(this.addItemform.name),
            web3.fromAscii("new"),
            this.addItemform.amount,
            this.addItemform.price,
            {
              gas: 300000,
              from: this.$store.state.web3.coinbase,

            },
            (err, result) => {
              if (err) {
                  console.log("=========err=======");
                console.log(err);
              } else {
                  console.log("================");
                // this.itemIds[this.$store.state.web3.coinbase].push(
                //   this.itemIds.length + ""
                // );
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
    handleReset() {}
  }
};
</script>
<style scoped>
.trading-board{
  height: 600;
   margin: 10px 40px;
}
td{
    font: bold;
    text-align: left;
    width: 130px;
    font-weight: 900;
    /* font-size: 20px; */
}
.itemCard{
  /* border: 1px solid red; */
  padding: 20px 0px;
    width: 220px;
    display: inline-block;
    vertical-align: top; 
}
</style>
