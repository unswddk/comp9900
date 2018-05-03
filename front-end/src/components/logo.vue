<template>
<div class="box">
  <div class="inner">
    <span>FCL Monsters</span>
  </div>
  <div class="inner">
    <span>FCL monsters</span>
  </div>
</div>
</template>
<script>

export default {
  name: "logo",
  data() {
    return {
    };
  }
};
</script>
<style>
.box { 
	display: flex;
}

.box .inner {
	width: 32px;
	height: 16px;
	line-height: 16px;
	font-size: 0.64em;
	font-family: sans-serif;
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
}

.box .inner:first-child {
	background-color: black;
	color: antiquewhite;
	transform-origin: left;
	transform: perspective(48px) rotateY(-67.3deg);
}

.box .inner:last-child {
	background-color: black;
	color: antiquewhite;
	transform-origin: right;
	transform: perspective(48px) rotateY(67.3deg);
}

.box .inner span {
	position: absolute;
	animation: marquee 5s linear infinite;
}

.box .inner:first-child span {
	animation-delay: 5s;
	left: -100%;
}

@keyframes marquee {
	from {
		left: 100%;
	}

	to {
		left: -100%;
	}
}
</style>