<template>
<div class="circ">
  <div class="load">{{value}} </div>
  <div class="hands"></div>
  <div class="body"></div>
  <div class="head">
    <div class="eye"></div>
  </div>
</div>
</template>
<script>

export default {
  name: "predition",
  data() {
    return {
        value:"prediting . . ."
    };
  }
};


</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Julius+Sans+One);
/* html {
  width: 50px;
  height: 50px;
} */
/* body {
  margin: 0px;
  padding: 0px;
  background-color: black;
} */
.eye {
  width: 20px;
  height: 8px;
  background-color: white;
  border-radius: 0px 0px 20px 20px;
  position: relative;
  left: 10px;
  top: 40px;
  box-shadow: 40px 0px 0px 0px white;
}
.head {
  -webkit-backface-visibility: hidden;
  position: relative;
  margin: -250px auto;
  width: 80px;
  height: 80px;
  background-color: black;
  border-radius: 50px;
  box-shadow: inset -4px 2px 0px 0px rgb(146, 144, 144);
  -webkit-animation: headAnim 1.5s infinite alternate; 
  -webkit-animation-timing-function: ease-out;
}
.body {
  position: relative;
  margin: 90px auto;
  width: 140px;
  height: 120px;
  background-color: black;
  border-radius: 50px/25px;
  box-shadow: inset -5px 2px 0px 0px rgb(146, 144, 144);
  -webkit-animation: bodyAnim 1.5s infinite alternate;
  -webkit-animation-timing-function: ease-out;
}
@-webkit-keyframes headAnim {
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
@-webkit-keyframes bodyAnim {
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
.circ {
  -webkit-backface-visibility: hidden;
  margin: 60px auto;
  width: 180px;
  height: 180px;
  /* background-color: white; */
  border-radius: 0px 0px 50px 50px;
  position: relative;
  z-index: -1;
  left: 0%;
  top: 20%;
  overflow: hidden;
}
.hands {
  -webkit-backface-visibility: hidden;
  margin-top: 140px;
  width: 120px;
  height: 120px;
  position: absolute;
  background-color: black;
  border-radius: 20px;
  box-shadow: -1px -4px 0px 0px white;
  -webkit-transform: rotate(45deg);
  top: 75%;
  left: 16%;
  z-index: 1;
  -webkit-animation: bodyAnim 1.5s infinite alternate;
  -webkit-animation-timing-function: ease-out;
}
.load {
  position: absolute;
  width: 7ch;
  height: 32px;
  text-align: left;
  line-height: 32px;
  margin: -10px auto;
  -webkit-font-smoothing: antialiased;
  font-family: 'Julius Sans One', sans-serif;
  font-size: 28px;
  font-weight: 400;
  color: black;
  left: 2%;
  top: 5%;
  -webkit-animation: fontAnim 3.75s infinite;
  -webkit-animation-timing-function: ease-out;
  word-wrap: break-word;
  display: block;
  overflow: hidden;
}
@-webkit-keyframes fontAnim {
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
</style>