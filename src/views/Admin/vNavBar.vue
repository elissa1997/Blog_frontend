<template>
  <div id="vNavBar">
    <a-menu
      class="vMenu"
      mode="inline"
      :selectedKeys="current"
    >
      <a-menu-item key="Setting">
        <span class="anticon"><icon-setting-two theme="outline" size="16" :strokeWidth="3"/></span>
        <span>系统设置</span>
      </a-menu-item>
      <a-menu-item key="Article">
        <router-link to="/admin/articlelist">
          <span class="anticon"><icon-view-list theme="outline" size="16" :strokeWidth="3"/></span>
          <span>文章管理</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="Comment">
        <router-link to="/admin/commentlist">
          <span class="anticon"><icon-comment theme="outline" size="16" :strokeWidth="3"/></span>
          <span>评论管理</span>
        </router-link>
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
      current: ['Setting'],
    };
  },
  methods: {
    getActive() {
      setTimeout(() => {
        this.current[0] = this.$route.meta.active[1]
        this.$forceUpdate();
      }, 150);
    }
  },
  mounted() {
    this.getActive();
  },
  watch: {
    '$route': function(to, from) {
      this.getActive();
    }
  },
};
</script>
<style lang="scss" scoped>
#vNavBar {
  width: $vNavBar-width;
}

.vMenu {
  height: calc(100vh - $navBar-height);
}
</style>