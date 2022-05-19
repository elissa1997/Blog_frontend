<template>
  <div id="Admin">
    <vNavBar/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import vNavBar from "@/views/Admin/vNavBar.vue";
export default {
  name: "Admin",
  props: {},
  components: {
    vNavBar
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
#Admin{
  display: flex;
}

.main {
  background-color: $backGround-color;
  width: calc(100% - $vNavBar-width);
}
</style>