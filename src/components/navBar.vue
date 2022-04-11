<template>
  <div id="navBar">
    <div class="warp" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
      <div class="logo">
        <img :src="require('../assets/logo.png')">
        <icon-application-menu v-if="$store.state.style.screenWidth < 920" theme="filled" size="18" @click="mobile.navDisplay = !mobile.navDisplay"/>
      </div>


      <div class="navWarp" :class="{openNav: mobile.navDisplay}">
        <a-menu v-model="current" :mode="($store.state.style.screenWidth < 920)?'inline':'horizontal'" :overflowedIndicator="mobileIcon" style="width: 100%">
          <a-menu-item key="home"> 主页 </a-menu-item>
          <a-menu-item key="music"> 音乐 </a-menu-item>
          <a-menu-item key="friend"> 友链 </a-menu-item>
          <a-menu-item key="about" > 关于 </a-menu-item>
          <a-menu-item key="toolbox" > 工具箱 </a-menu-item>
        </a-menu>
      </div>

    </div>
  </div>
</template>

<script>
import { Menu, Icon } from 'ant-design-vue'

export default {
  name: "navBar",
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
      current: ['home'],
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
  },
  mounted() {
    
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#navBar{
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 15px #00000017;
  z-index: 10;
  position: relative;
}

.mobile {
  min-height: $navBar-height;
  position: relative;
  .logo {
    background-color: #fff;
    z-index: 10;
    position: relative;
    height: $navBar-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 10px;
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
    box-shadow: 0px 0px 15px #00000017;
    border-top: 1px solid #b9b9b9;
  }

  .openNav {
    top: 59px;
  }
}

.desktop {
  width: 900px;
  height: $navBar-height;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
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
}

</style>