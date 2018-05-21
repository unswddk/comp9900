<template>
  <div>
<portfolioCard v-for="(value,key) in allPortfolio" v-bind:message="value" v-bind:pkey="key" :key="key"style="display:inline-block"></portfolioCard>
 <md-button class="md-dense md-raised md-primary" @click="showDialog = true">ADD MY portfolio Card</md-button>
<md-dialog :md-active.sync="showDialog">
        <md-dialog-title class="md-title">Portfolio</md-dialog-title>
          <md-divider></md-divider>
          <md-dialog-content>
    <form novalidate @submit.prevent="validateUser" >
        <!-- <div>h</div> -->
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('firstName')">
                <label for="first-name">Portfolio Name</label>
                <md-input name="first-name" id="first-name" v-model="form.firstName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">The Portfolio name is required</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Invalid Portfolio name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('lastName')">
                <label for="last-name">Owner Name</label>
                <md-input name="last-name" id="last-name"  v-model="form.lastName" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">The Owner name is required</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Invalid Owner name</span>
              </md-field>
            </div>
          </div>
        <div class="md-layout-item md-small-size-100">
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" :disabled="sending" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </div>
        <md-progress-bar md-mode="indeterminate" v-if="sending" />
     <md-dialog-actions>
         <md-button type="submit" class="md-primary" :disabled="sending">Create</md-button>
         <md-button class="md-accent" @click="showDialog = false">Close</md-button>
      </md-dialog-actions>
      <md-snackbar :md-active.sync="userSaved">The Portfolio {{ lastUser }} was saved with success!</md-snackbar>
    </form></md-dialog-content>
   </md-dialog>
  </div>
</template>
<script>
import portfolioCard from './portfolioCard.vue'
import { validationMixin } from 'vuelidate'
import { required,email,minLength,maxLength} from 'vuelidate/lib/validators'

export default {
    name: 'portfolioInBc',
    mixins: [validationMixin],
    data: () => ({
      form: {
        firstName: null,
        lastName: null,
        email: null,
      },
      userSaved: false,
      showDialog:false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        firstName: {
          required,
          minLength: minLength(3)
        },
        lastName: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email
        }
      }
    },
    computed:{
        allPortfolio(){
            return this.$store.state.allPortfolio
        }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]
        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.firstName = null
        this.form.lastName = null
        this.form.email = null
      },
      saveUser () {
        this.sending = true
        // Instead of this timeout, here you can call your API
       this.$store.state.portfolioInstace().createPortfolio(
           this.$store.state.web3.coinbase,
          web3.fromAscii( this.form.firstName),
          web3.fromAscii(this.form.lastName),
          web3.fromAscii(this.form.email),
            {
                from: this.$store.state.web3.coinbase,
                gas:3000000,
            },(err,resule) => {
                if(err){
                    console.log(err);
                }else{
            console.log("================createPortfolio====================")
            console.log(resule);
            this.lastUser = `${this.form.firstName} ${this.form.lastName}`
            this.userSaved = true
            this.sending = false
            this.clearForm()}
        });
      },
      validateUser () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    },
  components:{
      portfolioCard
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
    .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
