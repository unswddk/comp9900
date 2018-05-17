<template>
  <!-- <div class="add-item-button"> -->
          <md-button class="md-fab md-mini  md-primary"  @click="addStock()">
          <md-icon>add</md-icon>
    </md-button>
      <!-- <Button type="primary" shape="circle" icon="android-add" @click="addStock()"></Button> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "addItemButton",
  props: ["code", "amount", "price"],
  data() {
    return {};
  },
  methods: {
    addStock() {
      console.log(this.code + this.amount + this.price);
      this.$store.state.contractInstance().insertItem(
        this.$store.state.web3.coinbase,
        web3.fromAscii(this.code),
        web3.fromAscii("new"),
        this.amount,
        this.price*100,
        {
          gas: 300000,
          from: this.$store.state.web3.coinbase
        },
        (err, result) => {
            console.log(result);
        }
      );
    }
  }
};
</script>
<style scoped>
.add-item-button {
  margin-left: -10px;
  display: inline-block;
}
</style>
