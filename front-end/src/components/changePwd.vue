<template>
<div class="changePwd-form">

   <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            </Input>
                      <!-- <md-field>
      <label>New Password</label>
      <md-input v-model="formInline.password"></md-input>
    </md-field> -->
        </FormItem>
         <md-button class="md-primary" @click="handleSubmit('formInline')">Update</md-button>
    </Form>

    </div>
</template>
<script>
import { EventBus } from "./event-bus.js";
export default {
  name: "changePwd",
  data() {
    return {
      value: "",
      id: this.$route.params.id,
      formInline: {
        password: ""
      },
      ruleInline: {
        password: [
          {
            required: true,
            message: "Please fill in the password.",
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
    };
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "https://fazet6wlh9.execute-api.us-east-1.amazonaws.com/dev/changePwd",
              JSON.stringify({
                token: this.$route.params.id,
                password: this.formInline.password
              })
            )
            .then(response => {
                localStorage.username = response.body.username;
                localStorage.mail = response.body.email;
                this.$Message.success("Success!");
                this.$router.push({ path: "/" });
                EventBus.$emit("successChangePwd", localStorage.username);
            }, response => {
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    }
  }
};
</script>
<style >
.changePwd-form {
  margin: 0 0;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>