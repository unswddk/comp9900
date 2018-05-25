<template>
 <div class="page-container" id="app">
<md-app  md-mode="fixed" id="app">
  <md-app-toolbar class="md-small md-dense md-primary">
    <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
                 <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">{{massage}}</span>
          </div>

          <div class="md-toolbar-section-end">
            <md-menu>
              <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>
          <md-menu-content style="margin-top:40px;">
              <md-menu-item v-if="!username">
                    <md-button class="md-accent"  type="text"  @click="modal2 = true" ><span style='color:rgb(89, 126, 206)'>Sign In</span></md-button>
                    <md-button class="md-accent"  @click="modal1 = true"> <span style="color:rgb(89, 126, 206)">Sign Up</span></md-button>
              </md-menu-item>
              <md-menu-item v-if="username">
                     <md-avatar class="md-avatar-icon md-primary">
                  <md-icon>face</md-icon>
              </md-avatar>{{username}}
                    
                    <md-button  class="md-accent" @click="logout"> <span style="color:rgb(89, 126, 206)">Log Out</span></md-button>
              </md-menu-item>
          </md-menu-content>
          </md-menu>
          </div>
      </div>
  

     <Modal
        v-model="modal2"
        title="Login"
        okText="Submit"
        cancelText="Cancel"
        @on-ok="login"
        @on-cancel="handleLoginReset">
          <Form ref="loginformValidate" :model="loginformValidate" label-position="left" :rules="ruleValidate" :label-width="80">
         <FormItem label="E-mail" prop="mail">
            <Input v-model="loginformValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
         <FormItem label="Password" prop="password">
            <Input v-model="loginformValidate.password"  type="password" placeholder="Enter your password"></Input>
            <a @click="changePswd()" style="float:right">forgot password</a>
        </FormItem>
         </Form>
</Modal>
<Modal
        v-model="modal1"
        title="Fill this form to create a new an Account"
        okText="Submit"
        cancelText="Cancel"
        @on-ok="signup"
        @on-cancel="handleReset">
        <Form ref="formValidate" :model="formValidate" label-position="left" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
         <FormItem label="Password" prop="password">
            <Input v-model="formValidate.password" type="password" placeholder="Enter your password"></Input>
        </FormItem>
         <FormItem label="Comfirm Password" prop="passwdCheck">
            <Input v-model="formValidate.passwdCheck" type="password" placeholder="Enter your password again"></Input>
        </FormItem>
        <FormItem label="Gender" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
    </Form>
    </Modal>
 </md-app-toolbar>
 <md-app-drawer :md-active.sync="menuVisible" >
        <md-toolbar class="md-transparent" md-elevation="0">Navigation</md-toolbar>

        <md-list>

     <md-list-item>
            <md-icon>home</md-icon>
            <span class="md-list-item-text"><router-link to="/">Home</router-link></span>
          </md-list-item>

          <md-list-item>
            <md-icon>trending_up</md-icon>
            <span class="md-list-item-text"><router-link to="/stocks">Stockes</router-link></span>
          </md-list-item>

          <md-list-item>
            <md-icon>attach_money</md-icon>
            <span class="md-list-item-text"><router-link to="/trading">Trading</router-link>
            </span>
          </md-list-item>
            <!-- <md-list-item>
            <md-icon>turned_in</md-icon>
            <span class="md-list-item-text"><router-link to="/portflio">Portfolio</router-link></span>
          </md-list-item>
          <md-list-item> -->
            <md-icon>verified_user</md-icon>
            <span class="md-list-item-text"><router-link to="/portfolioInBc">Portfolio Share SyStem</router-link></span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
    <md-app-content>
        <router-view />
    </md-app-content>
    </md-app>
    </div>
        <!-- <Myfooter /> -->
</template>
<script>
import VueResource from 'vue-resource';
import Vuex from 'vuex'
import { mapGetters } from 'vuex'
import { EventBus } from "./components/event-bus";
import Vue from "vue";
import Myhead from './components/head'
import stockcard from './components/stockcard'
import VCharts from "v-charts";
import Myfooter from './components/footer'
import web3 from 'web3';
import LazyRender from 'vue-lazy-render'
import Trend from "vuetrend";
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)
Vue.use(LazyRender)
Vue.use(web3)
Vue.use(Trend);
Vue.use(VCharts);
// import stockInProf from './components/stockInProf'
Vue.use(Vuex)
Vue.use(VueResource);
export default {
  name: 'App',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.formValidate.passwdCheck !== "") {
          this.$refs.formValidate.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.formValidate.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      massage: "FCLMonsters",
      value1: "",
      menuVisible: false,
      modal1: false,
      modal2: false,
      username: localStorage.username,
      loginformValidate: {
        mail: "",
        password: "",
        ruleValidate: {
          mail: [
            {
              required: true,
              message: "Mailbox cannot be empty",
              trigger: "blur"
            },
            {
              type: "email",
              message: "Incorrect email format",
              trigger: "blur"
            }
          ],
          password: [
            {
              required: true,
              message: "Please enter password",
              trigger: "blur"
            },
            {
              type: "string",
              min: 6,
              message: "The password length cannot be less than 6 bits",
              trigger: "blur"
            }
          ]
        }
      },
      formValidate: {
        name: "",
        mail: "",
        gender: "",
        password: "",
        passwdCheck: ""
        // date: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "Mailbox cannot be empty",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
        ],
        password: [
          { required: true, message: "Please enter password", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        passwdCheck: [
          { required: true, message: "Please enter password", trigger: "blur" },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          },
          { validator: validatePassCheck, trigger: "blur" }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ]
      }
    };
  },
  components: {
    stockcard,
    Myfooter,
  },  
  mounted: function() {
    EventBus.$on("successChangePwd", data => {
      this.username = data;
    });
  },
  beforeCreate(){
    console.log('registerWeb3 Action dispatched from cart-dapp.vue')
    this.$store.dispatch('registerWeb3')
    this.$store.dispatch('getPortfolioCall')
    this.$store.dispatch('getContractInstance');
  },
  methods: {
    signup() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          const user = {
            username: this.formValidate.name,
            email: this.formValidate.mail,
            password: this.formValidate.password,
            gender: this.formValidate.gender,
            prof: [
              {
                title: "default",
                element: [],
                isSeclected: true
              }
            ]
          };
          this.$http
            .post(
              "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/user",
              JSON.stringify(user)
            )
            .then(
              response => {
                // console.log(response.body);
                if (response.status == 200) {
                  this.$store.commit("isLogin", response.data);
                  localStorage.username = response.data.username;
                  localStorage.mail = response.data.email;
                  localStorage.token = response.data.token;
                  this.username = localStorage.username;
                  EventBus.$emit("login", this.username);
                }
              },
              response => {
                // 响应错误回调
                console.log("服务器请求失败");
              }
            );

          this.$Message.success("Success!");
          //这里像后台发送用户信息经行注册
        } else {
          this.$Message.error("Fail!");
          this.$refs.formValidate.resetFields();
        }
      });
    },
    login() {
      this.$refs.loginformValidate.validate(valid => {
        if (valid) {
          this.$http
            .post(
              "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/login",
              JSON.stringify({
                email: this.loginformValidate.mail,
                password: this.loginformValidate.password
              })
            )
            .then(
              response => {
                if (response.status == 200) {
                  localStorage.username = response.body.data.Item.username;
                  localStorage.mail = response.body.data.Item.email;
                  localStorage.token = response.body.data.token;
                  this.username = localStorage.username;
                  EventBus.$emit("login", this.username);
                  this.$router.push({ path: "/" });
                }
              },
              response => {
                console.log("login error");
              }
            );
        } else {
          this.$Message.error("Fail!");
          this.$refs.loginformValidate.resetFields();
        }
      });
    },
    handleLoginReset() {
      this.$refs.loginformValidate.resetFields();
    },
    handleReset() {
      this.$refs.formValidate.resetFields();
    },
    changePswd() {
      this.$http
        .post(
          "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/changePswd",
          JSON.stringify({
            email: this.loginformValidate.mail
          })
        )
        .then(
          response => {
            // console.log(response);
            this.$Message.success("Success Send Email");
          },
          response => {
            // console.log(response);
            this.$Message.error("Email sending failed");
          }
        );
    },
    logout() {
      this.$store.dispatch("clearUser");
      localStorage.removeItem("mail");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.username = "";
      EventBus.$emit("logout", this.username);
      this.$router.push({ path: "/" });
    }
  }
}
</script>
<style>
/*  */
.md-app {
    max-height: 100%;
    /* border: 1px solid rgba(#000, .12); */
  }
   .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
