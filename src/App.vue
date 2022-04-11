<template>
  <div id="app">
    <navBar/>
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN.js';
import navBar from "@/components/navBar.vue";

export default {
  name: "App",
  components: {
    [ConfigProvider.name]: ConfigProvider,
    navBar
  },
  data() {
    return {
      locale: zhCN
    }
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
