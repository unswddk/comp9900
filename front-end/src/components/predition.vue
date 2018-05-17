<template>
<div class="p-circ" >
  <div class="p-load">{{value}} </div>
  <div class="p-hands">
    <div class="p-heart" v-if="up"></div>
    <svg v-if="down" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" width="20px" height="20px" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#FF3F2E;" d="M466.9,59.6c-27-27.3-64.5-44.1-105.9-44.1c-3.9,0-7.8,0-11.4,0.6s-6.9,2.1-9.3,5.1
	c-0.3,0.3-0.3,0.3-0.3,0.3l-47.7,59.7L257,125.4l-0.4,0.5l-12.3,15.3c-2.4,3-3.6,6.6-3.3,10.2c0.3,3.6,1.8,6.9,4.5,9.6l11.5,11.5
	l28.1,28.4l39.6,39.6l-39.6,39.6L257,308.5l-0.4,0.4L245.5,320c-1.5,1.2-2.7,3-3.3,4.8c-0.9,1.8-1.2,3.6-1.2,5.7v57.6l-13.8-41.7
	l-14.1-41.7l26.7-27l16.8-16.8l0.4-0.4l9.5-9.5c3-2.7,4.5-6.6,4.5-10.5s-1.5-7.8-4.5-10.5l-9.9-9.9l-30.9-31.2l-40.8-40.8l26.4-43.8
	l26.4-44.1c2.1-3.6,2.4-7.5,1.5-11.4c-0.9-3.6-3-6.9-6.3-9h-0.3v-0.3c-0.3,0-0.3,0-0.3,0c-12-7.8-25.2-13.8-38.7-18
	c-13.8-3.9-28.2-6-42.6-6c-41.4,0-78.9,16.8-105.9,44.1C17.8,86.6,0,123.1,0,164.5c0,18.9,3.6,37.2,10.2,54.3s17.5,34,30.1,47.8
	l102.3,111.9l102.3,113.2c0,0,0,0,0.3,0c3.3,3.3,7.2,4.8,11.4,4.8c0.13,0,0.27,0,0.4-0.01c3.77-0.11,7.49-1.89,10.1-4.79
	l102.3-113.2l102.3-111.9c12.6-13.8,22.5-29.7,29.1-46.8s11.2-35.4,11.2-54.3C512,124.1,494.2,86.6,466.9,59.6z"/>
<g>
	<path style="fill:#CF0404;" d="M266.5,251l-9.5,9.5v-40l9.5,9.5c3,2.7,4.5,6.6,4.5,10.5S269.5,248.3,266.5,251z"/>
	<path style="fill:#CF0404;" d="M512,165.5c0,18.9-4.6,37.2-11.2,54.3s-16.5,33-29.1,46.8L369.4,378.5L267.1,491.7
		c-2.61,2.9-6.33,4.68-10.1,4.79V308.5l28.1-28.4l39.6-39.6l-39.6-39.6L257,172.5v-47.1l35.3-44.2L340,21.5c0,0,0,0,0.3-0.3
		c2.4-3,5.7-4.5,9.3-5.1c3.6-0.6,7.5-0.6,11.4-0.6c41.4,0,78.9,16.8,105.9,44.1C494.2,86.6,512,124.1,512,165.5z"/>
</g>
</svg>
  </div> 
  <div class="p-body">
  </div>
  <div class="p-head">
    <div class="p-eye" ></div>
  </div>
  </div>
</template>
<script>
export default {
  name: "predition",
  props: ["message"],
  data() {
    return {
      value: "predciting . . .",
      // value:'up',
      up: false,
      down: false,
      result: ""
    };
  },
  computed: {},
  watch: {
    message: function() {
      this.value="predciting . . .";
      console.log("============predition===========")
      this.up=false;
      this.down=false;
      this.$http
        .get(
          "https://e8k50ti6ka.execute-api.us-west-1.amazonaws.com/dev/?code=" +
            this.message
        )
        .then(
          response => {
            console.log(response.body);
            if(response.body.message=="up"){
              this.up=true;
              this.down=false;
              this.value="result is: up"
            }else{
              this.down = true;
              this.up=false;
              this.value="result is: down"
            }
          },
          response => {}
        );
    }
  }
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Julius+Sans+One);
.p-eye {
  width: 20px;
  height: 10px;
  background-color: white;
  border-radius: 20px 20px 2px 2px;
  position: relative;
  left: 10px;
  top: 30px;
  box-shadow: 40px 0px 0px 0px white;
}
.p-head {
  backface-visibility: hidden;
  position: relative;
  margin: -280px auto;
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 50px;
  box-shadow: inset -4px 2px 0px 0px rgb(146, 144, 144);
  animation: headAnim 2.5s infinite alternate;
  animation-timing-function: ease-out;
}
.p-body {
  position: relative;
  margin: 90px auto;
  width: 180px;
  height: 120px;
  background-color: black;
  border-radius: 50px/25px;
  box-shadow: inset -5px 2px 0px 0px rgb(146, 144, 144);
  animation: bodyAnim 2.5s infinite alternate;
  animation-timing-function: ease-out;
}
@keyframes headAnim {
  0% {
    top: 0px;
  }
  50% {
    top: 10px;
  }
  100% {
    top: 0px;
  }
}
@keyframes bodyAnim {
  0% {
    top: -5px;
  }
  50% {
    top: 10px;
  }
  100% {
    top: -5px;
  }
}
.p-circ {
  backface-visibility: hidden;
  margin: 60px auto;
  width: 180px;
  height: 180px;
  /* background-color: black; */
  border-radius: 0px 0px 50px 50px;
  position: relative;
  z-index: 0;
  left: 0%;
  top: 20%;
  overflow: hidden;
}
.p-hands {
  backface-visibility: hidden;
  margin-top: 140px;
  width: 120px;
  height: 120px;
  position: absolute;
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
  box-shadow: -1px -4px 0px 0px white;
  transform: rotate(45deg);
  top: 75%;
  left: 16%;
  z-index: 1;
  animation: bodyAnim 2.5s infinite alternate;
  animation-timing-function: ease-out;
}
.p-load {
  position: absolute;
  width: 7ch;
  height: 32px;
  text-align: left;
  line-height: 32px;
  margin: -15px auto;
  -webkit-font-smoothing: antialiased;
  font-family: "Julius Sans One", sans-serif;
  font-size: 20px;
  font-weight: 400;
  color: black;
  left: 2%;
  top: 5%;
  animation: fontAnim 3.75s infinite;
  animation-timing-function: ease-out;
  word-wrap: break-word;
  display: block;
  overflow: hidden;
}
@keyframes fontAnim {
  0% {
    width: 7ch;
  }
  16% {
    width: 8ch;
  }
  32% {
    width: 9ch;
  }
  48% {
    width: 10ch;
  }
  64% {
    width: 11ch;
  }
  80% {
    width: 12ch;
  }
  100% {
    width: 13ch;
  }
}
.p-heart {
  background-color: red;
  display: inline-block;
  height: 10px;
  margin: 10px 10px;
  position: relative;
  top: 0;
  transform: rotate(-90deg);
  width: 10px;
}

.p-heart:before,
.p-heart:after {
  content: "";
  background-color: red;
  border-radius: 50%;
  height: 10px;
  position: absolute;
  width: 10px;
}

.p-heart:before {
  top: -5px;
  left: 0;
}

.p-heart:after {
  left: 5px;
  top: 0;
}
svg {
  margin: 7px 7px;
  transform: rotate(-45deg);
}
</style>