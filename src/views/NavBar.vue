<template>
  <div id="NavBar" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="container">
      <div class="logo">
        <img :src="require('@/assets/icon/logo_text.svg')">
        <icon-application-menu v-if="$store.state.style.screenWidth < 1100" theme="filled" size="18" @click="mobile.navDisplay = !mobile.navDisplay"/>
      </div>


      <div class="navWarp" :class="{openNav: mobile.navDisplay}">
        <a-menu :selectedKeys="current" :mode="($store.state.style.screenWidth < 1100)?'inline':'horizontal'" :overflowedIndicator="mobileIcon" style="width: 100%">
          <a-menu-item key="Home"><router-link to="/"> 主页 </router-link></a-menu-item>
          <!-- <a-menu-item key="music"> 音乐 </a-menu-item> -->
          <a-menu-item key="Links"><router-link to="/links"> 友链 </router-link></a-menu-item>
          <a-menu-item key="About" ><router-link to="/about"> 关于 </router-link></a-menu-item>
          <a-menu-item key="toolbox" > 工具箱 </a-menu-item>
          <a-menu-item key="Admin" ><router-link to="/admin">  后台 </router-link></a-menu-item>
        </a-menu>
      </div>

    </div>
  </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue'

export default {
  name: "NavBar",
  props: {},
  components: {
    [Menu.name]: Menu,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Menu.Item.name]: Menu.Item,
    [Menu.ItemGroup.name]: Menu.ItemGroup,
    [Icon.name]: Icon,
  },
  data() {
    return {
      current: ['Home'],
      screenWidth: undefined,
      mobile: {
        navDisplay: false,
      }
    }
  },
  methods: {
    mobileIcon() {
      return <icon-application-menu theme="filled" size="18"/>
    },

    getActive() {
      setTimeout(() => {
        this.current[0] = this.$route?.meta.active[0]
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
  }
}
</script>
<style lang="scss" scoped>
#NavBar{
  background-color: #fff;
  box-shadow: 0px 0px 15px #00000017;
  z-index: 10;
  position: relative;
}

.container {
  @include NavContainerWidth;
  height: $navBar-height;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

}

.mobile {
  .container {
    @include NavMobileWidth;
    .logo {
      width: 100%;
      background-color: #fff;
      position: relative;
      height: $navBar-height;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10;
      img {
        height: 40px;
      }
    
    }
  
    .navWarp {
      @include animation_cubic-bezier;
      z-index: 9;
      position: absolute;
      width: 100%;
      top: -100vh;
      left: 0px;
      box-shadow: 0px 0px 15px #00000017;
      border-top: 1px solid #e6e6e6;
    }
  
    .openNav {
      top: $navBar-height;
    }
  }
}

.desktop {
  .container {
    @include NavDesktopWidth;
    .logo {

      img{
        height: 40px;
        padding: 0px 20px;
      }
    }

    .navWarp{
      max-width: 50%;

      ::v-deep .ant-menu-horizontal {
        border-bottom: unset;
      }

      ::v-deep .ant-menu-horizontal > .ant-menu-item {
        line-height: calc($navBar-height - 3px);
      }
    }

    ::v-deep .ant-menu-horizontal {
      .ant-menu-submenu-horizontal:last-of-type {
        display: none;
      }
    }
  }
}

</style>