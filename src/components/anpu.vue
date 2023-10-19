<template>
  <div id="anpu">
    <div class="img">
      <img :src="require('@/assets/img/footer_anpu.png')">
    </div>
    <aplayer
      :music="{
        title: '关于我爱你',
        artist: '张悬',
        src: 'https://cdn.makedream.site/blog/audio/%E5%85%B3%E4%BA%8E%E6%88%91%E7%88%B1%E4%BD%A0-%E5%BC%A0%E6%82%AC.mp3',
        pic: 'https://cdn.makedream.site/blog/audio/%E5%85%B3%E4%BA%8E%E6%88%91%E7%88%B1%E4%BD%A0-%E5%BC%A0%E6%82%AC.jpg'
      }"
    />
  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  name: "anpu",
  props: {},
  components: {
    Aplayer
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#anpu{
  .img {
    width: 100%;
    padding-bottom: 15px;
    img {
      width: 70%;
    }
  }
  .audio {
    // height: 20px;
  }
}
</style>