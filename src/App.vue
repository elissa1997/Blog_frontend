<template>
  <div id="app">
    <NavBar/>
    <a-config-provider :locale="locale">
      <router-view/>
    </a-config-provider>
    <InfoFooter v-if="$route.meta.footer"/>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN.js';
import NavBar from "@/views/NavBar.vue";
import InfoFooter from "@/views/InfoFooter.vue";

export default {
  name: "App",
  components: {
    [ConfigProvider.name]: ConfigProvider,
    NavBar,
    InfoFooter
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
