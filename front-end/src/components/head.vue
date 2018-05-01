<template>
<div>
<div class="header-container">
  <span class="logo"><b><strong>
{{ massage }}</strong></b>
  </span>
<!-- <Icon type="plus"></Icon> -->
<ButtonGroup size="large" shape="circle" class="icon-login" v-if="!username">
<Button  type="text"  @click="modal2 = true" ><span style='color:rgb(89, 126, 206)'>Sign In</span></Button>
<Button  type="text"  @click="modal1 = true"> <span style="color:rgb(89, 126, 206)">Sign Up</span></Button>
</ButtonGroup>
<ButtonGroup size="small" shape="circle" class="icon-login" v-if="username">
<Button  type="text"  disabled><span style='color:rgb(89, 126, 206)'>{{username}}</span></Button>
<Button  type="text"  @click="logout"> <span style="color:rgb(89, 126, 206)">Log Out</span></Button>
</ButtonGroup>
 <Modal
        v-model="modal2"
        title="Login"
        okText="Summit"
        cancelText="Cancel"
        @on-ok="login"
        @on-cancel="handleLoginReset">
          <Form ref="loginformValidate" :model="loginformValidate" label-position="left" :rules="ruleValidate" :label-width="80">
         <FormItem label="E-mail" prop="mail">
            <Input v-model="loginformValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
         <FormItem label="Password" prop="password">
            <Input v-model="loginformValidate.password"  type="password" placeholder="Enter your password"></Input>
            <a @click="changePswd()" style="float:right">forget password</a>
        </FormItem>
         </Form>
</Modal>
<Modal
        v-model="modal1"
        title="Fill this form to create a new an Account"
        okText="Summbit"
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
        <!-- <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
        </FormItem> -->
    </Form>
    </Modal>
</div>
<sector class="sector"></sector>
</div>
</template>
<script>
import { EventBus } from "./event-bus.js";
import sector from "./sector.vue";
// import "vue-awesome/icons";
export default {
  name: "Myheader",
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
      massage: "FLCMansters",
      value1: "",
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
  components: { sector },
  mounted: function() {
    EventBus.$on("successChangePwd", data => {
      this.username = data;
    });
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
                // console.log(response.data);
                if (response.status == 200) {
                  // this.$store.commit("isLogin", response.data);
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
            this.$Message.success(response.body);
          },
          response => {
            // console.log(response);
            this.$Message.error(response);
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
};
</script>

<style>
.header-container {
  background: #fafafa;
  height: 65px;
  top: 0;
  display: block;
  /* position:fixed; */
  width: 100%;
  /* position: absolute; */
  /* border-bottom:  1px rgb(231, 230, 228); */
}
.logo {
  float: left;
  width: 80px;
  margin-top: 10px;
  margin-left: 40px;
  height: 20px;
  font-size: 30px;
  font-family: cursive;
  color: rgb(79, 118, 202);
}
.icon-login {
  margin-top: 19px;
  float: right;
  color: rgb(79, 118, 202);
  margin-right: 40px;
}
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.sector {
  background: #fafafa;
  bottom: 0;
}
</style>