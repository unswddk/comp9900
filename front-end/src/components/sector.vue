<template>
<div class="sector">
    <!-- Consumer Discretionary: {{ consumerDiscretionary }} -->
    <!-- Consumer Staples: {{consumerStaples}} -->
    Energy: <changeInfo v-bind:message="energy"></changeInfo>
    Financials: <changeInfo v-bind:message="financials"></changeInfo>
    Health Care: <changeInfo v-bind:message="financials"></changeInfo>
    Industrials:<changeInfo v-bind:message="industrials"></changeInfo>
    Information Technology: <changeInfo v-bind:message="informationTechnology"></changeInfo>
    Materials: <changeInfo v-bind:message="materials"></changeInfo>
    RealEstate: <changeInfo v-bind:message="realEstate"></changeInfo>
    Telecommunication Services: <changeInfo v-bind:message="telecommunicationServices"></changeInfo>
    Utilities: <changeInfo v-bind:message="utilities"></changeInfo>
</div>
</template>
<script>
// import "vue-awesome/icons";
import changeInfo from "./change";
export default {
  name: "sector",
  data() {
    return {
      value: "",
      consumerDiscretionary:"",
      consumerStaples:'',
      energy:'',
      financials:'',
      healthCare:'',
      industrials:'',
      informationTechnology:'',
      materials:'',
      realEstate:'',
      telecommunicationServices:'',
      utilities:'',
    };
  },
  components:{
      changeInfo
  },
  created:function(){
    this.$http
      .get(
        "https://www.alphavantage.co/query?function=SECTOR&apikey=D29LHM3HC6349901"
      )
      .then(response=>{
          console.log(response.body["Rank A: Real-Time Performance"]);
          let data = response.body["Rank A: Real-Time Performance"];
          this.consumerDiscretionary =data["Consumer Discretionary"];
          this.consumerStaples = data["Consumer Staples"];
          this.energy = data["Energy"];
          this.financials = data["Financials"];
          this.healthCare= data["Health Care"];
          this.industrials = data["Industrials"];
          this.informationTechnology = data["Information Technology"];
          this.materials = data["Materials"];
          this.realEstate=data["Real Estate"];
          this.telecommunicationServices=data["Telecommunication Services"];
          this.utilities = data["Utilities"];
      },
      response=>{})
  }
};
</script>

<style>
.sector{
    font-size: 10px;
    text-align: center;
}
</style>