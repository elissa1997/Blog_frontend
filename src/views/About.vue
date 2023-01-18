<template>
  <div id="About" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
    <div class="container">
      <div class="profile">

        <div class="headWarp">
          <img class="headImg" :src="avatarByemail('524948583@qq.com')"/>
          <div class="baseInfo">
            <div class="name">Elissa_liu</div>
            <div class="career">front-end development / technical art</div>
            <div class="unit">Anhui Institute of Hydraulic Research</div>
          </div>
        </div>

        <div class="socialNetwork">
          <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/email.png')"></a>
          <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/weibo.png')"></a>
          <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/github.png')"></a>
          <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/twitter.png')"></a>
          <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/facebook.png')"></a>
        </div>
      </div>

      <div class="skill"></div>
    </div>
  </div>
</template>

<script>
import { avatarByemail } from "@/util/tool.js";
export default {
  name: "About",
  props: {},
  components: {},
  data() {
    return {}
  },
  methods: {
    avatarByemail
    // // 通过email获取头像
    // avatarByemail(email) {
    //   if (email) {
    //     let hash = md5(email.replace(/^\s*|\s*$/g,"").toLowerCase());
    //     return `https://cravatar.cn/avatar/${hash}?s=60`
    //   }else{
    //     return `https://cravatar.cn/avatar/404`
    //   }
    // },
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#About{
  background-color: $backGround-color;
  overflow: auto;
}

.container {
  box-sizing: border-box;
  // background-color: #fff;
  padding: 10px;

  .profile {
    .headWarp {
      display: flex;

      .headImg {
        border-radius: 50%;
        width: 90px;
        height: 90px;
        border: 2px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #222, #222), linear-gradient(90deg, #8F41E9, #578AEF);
  
        box-shadow: 0px 0px 6px 1px #1c8ffa;
      }

      .baseInfo {
        .name {
          font-size: 20px;
          font-weight: 700;
        }
      }

    }
  }

  .socialNetwork {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    .linkItem {
      text-align: center;
      img {
        width: 40px;
        height: 40px;
      }
    }
  }
}

.mobile {
  .container {
    @include containerMobileWidth;

      .profile {
        .headWarp {
          flex-direction: column;
          align-items: center;
          .baseInfo {
            margin-top: 20px;
            text-align: center;
          }
        }

        .socialNetwork {
          .linkItem {
            width: 55px;
          }
        }
      }

  }
}

.desktop {
  .container {
    @include containerDesktopWidth;

      .profile {
        .headWarp {
          justify-content: center;
          align-items: center;
          .baseInfo {
            margin-left: 20px;
          }
        }

        .socialNetwork {
          .linkItem {
            width: 75px;
          }
        }
      }

  }
}

</style>