<template>
  <div id="toy">
    <div class="main-wrapper">
      <div class="sphere-wrapper">

        <div class="plane" :class="`plane-${nums}`" v-for="(nums, index) in 12" :key="index">
          <div class="spoke" :class="`spoke-${nums}`" v-for="(nums, index) in 36" :key="index">
            <div class="dot"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "toy",
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#toy{
  position: relative;
  height: 100%;
  overflow: hidden;
}

// -----------------------------------------------------
// If you like this, be sure to also check my Jellyfish
// pen that was inspired by this one:
// https://codepen.io/iamlark/pen/opyBNy
// -----------------------------------------------------

.main-wrapper {
  display: flex;
  position: absolute;
  transform-style: preserve-3d;
  perspective: 400px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
}
.sphere-wrapper {
  transform-style: preserve-3d;
  width: 300px;
  height: 300px;
  position: relative;
  animation: rotate3d 10s linear infinite;
}
.plane {
  position: absolute;
  transform-style: preserve-3d;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.spoke {
  transform-origin: 0 0;
  transform-style: preserve-3d;
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100px;
  width: 0px;
}
.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ffffff;
  left: -3px;
  top: 100%;
  transform: rotateX(90deg);
}
.spoke.spoke-1 {
  transform: rotateZ(10deg);
}
.spoke.spoke-2 {
  transform: rotateZ(20deg);
}
.spoke.spoke-3 {
  transform: rotateZ(30deg);
}
.spoke.spoke-4 {
  transform: rotateZ(40deg);
}
.spoke.spoke-5 {
  transform: rotateZ(50deg);
}
.spoke.spoke-6 {
  transform: rotateZ(60deg);
}
.spoke.spoke-7 {
  transform: rotateZ(70deg);
}
.spoke.spoke-8 {
  transform: rotateZ(80deg);
}
.spoke.spoke-9 {
  transform: rotateZ(90deg);
}
.spoke.spoke-10 {
  transform: rotateZ(100deg);
}
.spoke.spoke-11 {
  transform: rotateZ(110deg);
}
.spoke.spoke-12 {
  transform: rotateZ(120deg);
}
.spoke.spoke-13 {
  transform: rotateZ(130deg);
}
.spoke.spoke-14 {
  transform: rotateZ(140deg);
}
.spoke.spoke-15 {
  transform: rotateZ(150deg);
}
.spoke.spoke-16 {
  transform: rotateZ(160deg);
}
.spoke.spoke-17 {
  transform: rotateZ(170deg);
}
.spoke.spoke-18 {
  transform: rotateZ(180deg);
}
.spoke.spoke-19 {
  transform: rotateZ(190deg);
}
.spoke.spoke-20 {
  transform: rotateZ(200deg);
}
.spoke.spoke-21 {
  transform: rotateZ(210deg);
}
.spoke.spoke-22 {
  transform: rotateZ(220deg);
}
.spoke.spoke-23 {
  transform: rotateZ(230deg);
}
.spoke.spoke-24 {
  transform: rotateZ(240deg);
}
.spoke.spoke-25 {
  transform: rotateZ(250deg);
}
.spoke.spoke-26 {
  transform: rotateZ(260deg);
}
.spoke.spoke-27 {
  transform: rotateZ(270deg);
}
.spoke.spoke-28 {
  transform: rotateZ(280deg);
}
.spoke.spoke-29 {
  transform: rotateZ(290deg);
}
.spoke.spoke-30 {
  transform: rotateZ(300deg);
}
.spoke.spoke-31 {
  transform: rotateZ(310deg);
}
.spoke.spoke-32 {
  transform: rotateZ(320deg);
}
.spoke.spoke-33 {
  transform: rotateZ(330deg);
}
.spoke.spoke-34 {
  transform: rotateZ(340deg);
}
.spoke.spoke-35 {
  transform: rotateZ(350deg);
}
.plane.plane-1 {
  transform: rotateY(15deg);
}
.plane.plane-2 {
  transform: rotateY(30deg);
}
.plane.plane-3 {
  transform: rotateY(45deg);
}
.plane.plane-4 {
  transform: rotateY(60deg);
}
.plane.plane-5 {
  transform: rotateY(75deg);
}
.plane.plane-6 {
  transform: rotateY(90deg);
}
.plane.plane-7 {
  transform: rotateY(105deg);
}
.plane.plane-8 {
  transform: rotateY(120deg);
}
.plane.plane-9 {
  transform: rotateY(135deg);
}
.plane.plane-10 {
  transform: rotateY(150deg);
}
.plane.plane-11 {
  transform: rotateY(165deg);
}
.spoke-0 .dot,
.spoke-36 .dot {
  animation: pulsate .5s infinite 0s alternate both;
  background-color: #ff9955;
}
.spoke-1 .dot,
.spoke-35 .dot {
  animation: pulsate .5s infinite 0.05555555555555555s alternate both;
  background-color: #ffb555;
}
.spoke-2 .dot,
.spoke-34 .dot {
  animation: pulsate .5s infinite 0.1111111111111111s alternate both;
  background-color: #ffd255;
}
.spoke-3 .dot,
.spoke-33 .dot {
  animation: pulsate .5s infinite 0.16666666666666666s alternate both;
  background-color: #ffee55;
}
.spoke-4 .dot,
.spoke-32 .dot {
  animation: pulsate .5s infinite 0.2222222222222222s alternate both;
  background-color: #f4ff55;
}
.spoke-5 .dot,
.spoke-31 .dot {
  animation: pulsate .5s infinite 0.2777777777777778s alternate both;
  background-color: #d7ff55;
}
.spoke-6 .dot,
.spoke-30 .dot {
  animation: pulsate .5s infinite 0.3333333333333333s alternate both;
  background-color: #bbff55;
}
.spoke-7 .dot,
.spoke-29 .dot {
  animation: pulsate .5s infinite 0.3888888888888889s alternate both;
  background-color: #9fff55;
}
.spoke-8 .dot,
.spoke-28 .dot {
  animation: pulsate .5s infinite 0.4444444444444444s alternate both;
  background-color: #82ff55;
}
.spoke-9 .dot,
.spoke-27 .dot {
  animation: pulsate .5s infinite 0.5s alternate both;
  background-color: #66ff55;
}
.spoke-10 .dot,
.spoke-26 .dot {
  animation: pulsate .5s infinite 0.5555555555555556s alternate both;
  background-color: #55ff60;
}
.spoke-11 .dot,
.spoke-25 .dot {
  animation: pulsate .5s infinite 0.6111111111111112s alternate both;
  background-color: #55ff7d;
}
.spoke-12 .dot,
.spoke-24 .dot {
  animation: pulsate .5s infinite 0.6666666666666666s alternate both;
  background-color: #55ff99;
}
.spoke-13 .dot,
.spoke-23 .dot {
  animation: pulsate .5s infinite 0.7222222222222222s alternate both;
  background-color: #55ffb5;
}
.spoke-14 .dot,
.spoke-22 .dot {
  animation: pulsate .5s infinite 0.7777777777777778s alternate both;
  background-color: #55ffd2;
}
.spoke-15 .dot,
.spoke-21 .dot {
  animation: pulsate .5s infinite 0.8333333333333334s alternate both;
  background-color: #55ffee;
}
.spoke-16 .dot,
.spoke-20 .dot {
  animation: pulsate .5s infinite 0.8888888888888888s alternate both;
  background-color: #55f4ff;
}
.spoke-17 .dot,
.spoke-19 .dot {
  animation: pulsate .5s infinite 0.9444444444444444s alternate both;
  background-color: #55d7ff;
}
.spoke-18 .dot,
.spoke-18 .dot {
  animation: pulsate .5s infinite 1s alternate both;
  background-color: #55bbff;
}
@keyframes rotate3d {
  0% {
    transform: rotate3d(1, 1, 1, 0deg);
  }
  25% {
    transform: rotate3d(1, 1, 1, 90deg);
  }
  50% {
    transform: rotate3d(1, 1, 1, 180deg);
  }
  75% {
    transform: rotate3d(1, 1, 1, 270deg);
  }
  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
}
@keyframes pulsate {
  0% {
    transform: rotateX(90deg) scale(.3) translateZ(20px);
  }
  100% {
    transform: rotateX(90deg) scale(1) translateZ(0px);
  }
}
.animista-badge {
  font: normal 15px/1.5 sans-serif;
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: rgba(255, 255, 255, 0.8);
  padding: .5em 1em;
}
a {
  color: #ff6060;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}


</style>