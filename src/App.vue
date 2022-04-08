<template>
  <div id="app">
    <navBar/>
    <router-view/>
  </div>
</template>

<script>
import navBar from "@/components/navBar.vue";

export default {
  name: "App",
  components: {
    navBar
  },
  methods: {
    clientWidthResize () {
      this.$store.commit('style/resizeWidth', Number(document.documentElement.clientWidth))
    }
  },
  mounted() {
    this.clientWidthResize()
    window.onresize = () => {
      this.clientWidthResize()
    }
  }
}
</script>

<style lang="scss">

</style>
