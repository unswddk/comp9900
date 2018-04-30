<template>
<div class="changePwd-form">
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Update</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import { EventBus } from "./event-bus.js";
// import "vue-awesome/icons";
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
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>