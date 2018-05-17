<template>
<div class="portflio-container">
  <!-- <Card> -->
            <!-- <Button class="addBtn" slot="extra" type="ghost" shape="circle" icon="ios-plus-empty" @click="showAdd =!showAdd"></Button> -->
          <!-- <Form v-if="showAdd"  ref="formInline" :model="formInline" :rules="ruleValidate" >
             -->
                    <Form  ref="formInline" :model="formInline" :rules="ruleValidate" >
                <FormItem prop="title">
    <md-field style="width:50%;display:inline-block" >
      <label>Title</label>
      <md-input v-model="formInline.title" ></md-input>
    </md-field>
     <md-button class="md-raised md-primary" @click="createPrf()">Create a New Protflio</md-button>
<Button type="ghost"  icon="checkmark" slot="append" </Button>
                        <!-- <Input type="text" v-model="formInline.title" placeholder="Title">
                        <Button type="ghost"  icon="checkmark" slot="append" @click="createPrf()"></Button>
                        </Input> -->
                    </FormItem>
            </Form>
  
  <md-card v-for="(pro,index) in profList" :key="pro.title">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title"> {{ pro.title }}</div>
          <div class="md-subhead">This Protflio has {{pro.element.length}} stocks</div>
        </md-card-header-text>

        <md-card-media >
          <img :src="imageLink(index)" alt="People">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button @click="trasToChild(pro)" v-bind:class="{ 'md-primary': pro.isSeclected }">Detail</md-button>
        <md-button @click="deleteProf(pro)">Delete</md-button>
      </md-card-actions>
    </md-card>
<!-- <div class="proflioCard" v-for="pro in profList" :key="pro.title"> -->
  <!-- <div class="polaroid"> -->
    <!-- <a @click="deleteProf(pro)"><Icon type="close-circled"  class="closeIcon" @click="deleteProf(pro)"></Icon></a> -->
  <!-- <img src="../../static/image/1.png" alt="Norway" style="width:100%">

    <div class="container" v-bind:class="{ act: pro.isSeclected }" @click="trasToChild(pro)" >
      {{ pro.title }}
    </div>
  </div>
</div> -->


<div  v-for="p in profList" :key="p.index" v-if="p.isSeclected " >  
                <Select v-model="stockCode" filterable class="section" @input="addStock(p)" size="small">
             <Option v-for="item in stockList" :value="item.code" :key="item.name">{{ item.code }}----------{{item.name}}</Option>
             </Select>
<table v-if="showTable">
    <tr>
    <th>Symbol</th>
    <th>Open</th>
     <th>Close</th>
    <th>Change</th>
    <th>% Chg</th>
    <th>Vollume</th>
    <th>Chart</th>
    <th>Delete</th>
    </tr>
  </table>
<stockcard v-for="i in p.element" :key="i.index" v-bind:code="i" v-on:listenToChildeEvent="deleteCode"></stockcard> 
           </div>
            <!-- </Card> -->
</div>
</template>
<script>
import { EventBus } from "./event-bus.js";
import stockInProf from "./stockInProf.vue";
import stockcard from "./stockcard.vue";
export default {
  name: "userProtfile",
  data() {
    const validateTitle = (rule, value, callback) => {
      this.profList.forEach(element => {
        if (element.title === value) {
          callback(new Error("Protflio exit"));
        }
      });
      callback();
    };
    return {
      showAdd: false,
      showTable: true,
      parentMsg: [],
      profList: [],
      stockList: "",
      stockCode: "MOQ",
      titleList: [],
      formInline: {
        title: ""
      },
      ruleValidate: {
        title: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          },
          { validator: validateTitle, trigger: "blur" }
        ]
      }
    };
  },
  computed: {     
        },
  components: {
    stockInProf,
    stockcard
  },
  created: function() {
    this.$http
      .post(
        "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getPf",
        JSON.stringify({ email: localStorage.mail })
      )
      .then(
        response => {
          this.profList = response.data.prof;
          this.profList.forEach(e => {
            e.isSeclected = false;
          })
        },
        response => {
          console.log(response);
        }
      ),
      this.$http.get("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getCompanyInfo").then(
        response => {
          this.stockList = response.data.company;
        },
        response => {
          console.log("服务器请求失败");
        }
      );
  },
  mounted: function() {
    EventBus.$on("addToPf", data => {
      this.profList.forEach(e => {
        if (e.title === "default") {
          e.element.push(data);
          this.showTable = true;
        }
      });
    const p = {
            email: localStorage.mail,
            prof: this.profList
          };
          this.$http
            .post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/createPf", JSON.stringify(p))
            .then(
              response => {
                console.log(response.data);
              },
              response => {
                console.log("error");
              }
            );
    });
  },
  methods: {
    //get Prof
    getProf() {
      this.$http
        .post(
          "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/getPf",
          JSON.stringify({ email: localStorage.mail })
        )
        .then(
          response => {
            this.profList = response.data.prof;
            console.log(this.profList);
          },
          response => {
            console.log(response);
          }
        );
    },
   imageLink(index){
            return 'https://picsum.photos/300/200/?image='+ index+'&gravity=east';},
    //create P
    createPrf() {
      this.$refs.formInline.validate(valid => {
        if (valid) {
          this.$Message.success("Success created!");
          //将新建的title加到本地的array中 ，然后在把整个array传到后台，更新这个array
          let newP = {
            title: this.formInline.title,
            element: [],
            isSeclected: false
          };
          this.profList.push(newP);
          const p = {
            email: localStorage.mail,
            prof: this.profList
          };
          this.$http
            .post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/createPf", JSON.stringify(p))
            .then(
              response => {
                console.log(response.data);
              },
              response => {
                console.log("error");
              }
            );
        } else {
          this.$Message.error("Try another Title!");
        }
      });
    },
    deleteProf(p) {
      if (p.title == "default") {
        this.$Message.error("can not delete the default one");
      } else {
        let a = this.profList.filter(element => element.title !== p.title);
        this.profList = a;
        const p2 = {
          email: localStorage.mail,
          prof: this.profList
        };
        this.$http
          .post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/createPf", JSON.stringify(p2))
          .then(
            response => {
            //   console.log(response);
            },
            response => {
            //   console.log(response);
            }
          );
      }
    },
    trasToChild(p) {
      this.profList.forEach(element => {
        element.isSeclected = false;
      });
      // this.color='rgb(79, 118, 202)';
      this.$set(p, "isSeclected", true);
      console.log(p.element);
      if (JSON.stringify(p.element) !== "[]") {
        this.showTable = true;
      } else {
        this.showTable = false;
      }
    },
    deleteCode: function(data) {
      console.log(data);
      for (let i = 0; i < this.profList.length; i++) {
        if (this.profList[i].isSeclected) {
          if (this.profList[i].title === "default") {
            EventBus.$emit("deleteInPf", true);
          }
          this.profList[i].element.splice(
            this.profList[i].element.indexOf(data),
            1
          );
          if (JSON.stringify(this.profList[i].element) === "[]") {
            this.showTable = false;
          }
        }
      }
      const p2 = {
        email: localStorage.mail,
        prof: this.profList
      };
      this.$http
        .post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/createPf", JSON.stringify(p2))
        .then(
          response => {
            console.log(response);
          },
          response => {
            console.log(response);
          }
        );
    },
    addStock(p) {
      this.showTable = true;
      p.element.push(this.stockCode);
      this.profList.forEach(element => {
        if (element.title === p.title) {
          element = p;
        }
      });
      const p1 = {
        email: localStorage.mail,
        prof: this.profList
      };
      this.$http
        .post("https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/createPf", JSON.stringify(p1))
        .then(
          response => {
            console.log(response.data);
          },
          response => {
            console.log("error");
          }
        );
      //向后台发送请求更新user
    }
  }
};
</script>
<style scoped>
.portflio-container{
  height: 600px;
  margin: 10px 40px;
}
.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px;
  text-align: center;
  width: 80px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
.addBtn {
  float: right;
  margin-top: -9px;
}
a {
  color: #000;
}
.act {
  /* border: red 1px solid; */
  /* background: rgb(79, 118, 202); */
  color: rgb(79, 118, 202);
  /* padding:0 0; */
  /* height: 100%; */
  /* width: 100%; */
}
.titleClass{
  margin-top: 20px;
    display: block;
    width: 60%;
}
.section {
  width: 40%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.proflioCard{
  margin-top: 20px;
  width: 220px;
  display: inline-block;
}
.polaroid {
  width: 90%;
  /* margin-right: 10px; */
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-bottom: 25px;
}
.container {
  text-align: center;
  padding: 10px 20px;
}
.closeIcon{
  position: absolute;
  margin-left: 190px;
  font-size: 20px;
  margin-top: -8px;
  color: silver;
}
</style>