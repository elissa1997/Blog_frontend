<template>
  <div id="loading">
    <div class="warp" :style="`height: ${height}`">
      <a-spin size="large" :tip="text"/>
    </div>
  </div>
</template>

<script>
import { spin } from 'ant-design-vue'

export default {
  name: "loading",
  props: {
    height: {
      type: String,
      default: "100%"
    },
    text: {
      type: String,
      default: "加载中..."
    }
  },
  components: {
    [spin.name]: spin
  },
  data() {
    return {}
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#loading{}

.warp {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>