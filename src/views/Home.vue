<template>
  <div id="Home">
    <div class="container" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
      <div class="card"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {},
  components: {},
  data() {
    return {
      screenWidth: undefined,
    }
  },
  methods: {

  },
  mounted() {
    
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Home{
  background-color: $backGround-color;
}

.container {
  min-height: 50vh;
  margin: 0px auto;
  .card {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: #fff;
  }
}

.mobile {
  width: calc(100vw - 20px);
  padding: 20px 0px;
}

.desktop {
  width: 900px;
  padding: 50px 0px;
}
</style>
