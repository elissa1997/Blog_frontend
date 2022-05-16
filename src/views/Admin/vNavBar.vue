<template>
  <div id="vNavBar">
    <a-menu
      class="vMenu"
      mode="inline"
      :default-selected-keys="['1']"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <span class="anticon"><icon-setting-two theme="outline" size="16" :strokeWidth="3"/></span>
        <span>系统设置</span>
      </a-menu-item>
      <a-menu-item key="2"> 
        <span class="anticon"><icon-view-list theme="outline" size="16" :strokeWidth="3"/></span>
        <span>文章管理</span>
      </a-menu-item>
      <a-menu-item key="3"> 
        <span class="anticon"><icon-comment theme="outline" size="16" :strokeWidth="3"/></span>
        <span>评论管理</span> 
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue'
export default {
  name: "vNavBar",
  props: {},
  components: {
    [Menu.name]: Menu,
    [Icon.name]: Icon,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Menu.Item.name]: Menu.Item,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {},
  mounted() {
    console.log(this.$route)
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
#vNavBar {
  width: 200px;
}

.vMenu {
  height: calc(100vh - $navBar-height);
}
</style>