<template>
  <div id="About" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
    <div class="container">
      <div class="profile">

        <div class="headWarp">
          <img class="headImg" :src="avatarByemail('524948583@qq.com')"/>
          <div class="baseInfo">
            <div class="name">Elissa_liu</div>
            <div class="career">Front-end Development / Technical Art</div>
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

      <div class="skill">
        
        <div class="title">Skills</div>

        <div class="itemWarp">
          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/vue.png')"/>
            <div class="name">Vue.js</div>
            <a-progress :percent="80" status="active" />
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/nodejs.png')"/>
            <div class="name">Node.js</div>
            <a-progress :percent="70" status="active" />
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/figma.png')"/>
            <div class="name">UI/UX</div>
            <a-progress :percent="60" status="active" />
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/UnrealEngine.png')"/>
            <div class="name">Unreal</div>
            <a-progress :percent="40" status="active" />
          </div>
        </div>
      </div>

      <div class="project">

        <div class="title">Projects</div>

        <div class="itemWarp">

          <div class="item">
            <img class="img" :src="require('@/assets/img/defaultCover/coverbg1.jpg')"/>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { Progress } from "ant-design-vue"
import { avatarByemail } from "@/util/tool.js";
export default {
  name: "About",
  props: {},
  components: {
    [Progress.name]: Progress
  },
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
        background-image: linear-gradient(to right, #222, #222), linear-gradient(270deg, #00c6ff, #0072ff);
  
        box-shadow: 0px 0px 6px 1px #1890ff;
      }

      .baseInfo {
        .name {
          font-size: 20px;
          font-weight: 700;
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

  .skill {
    margin-top: 50px;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      color: transparent;
      background-image: linear-gradient(0deg, #00c6ff, #0072ff);
      -webkit-background-clip: text;
      background-clip: text;
    }

    .itemWarp {
      margin-top: 20px;
      display: grid;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      box-sizing: border-box;
  
      .item {
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        display: flex;
        align-items: center;
        // position: relative;
        .name {
          font-size: 20px;
          padding-left: 10px;
        }
  
        .icon {
          // position: absolute;
          width: 20px;
          height: 20px;
        }
      }
    }

  }

  .project {
    margin-top: 50px;

    .title {
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      color: transparent;
      background-image: linear-gradient(0deg, #00c6ff, #0072ff);
      -webkit-background-clip: text;
      background-clip: text;
    }

    .itemWarp {
      margin-top: 20px;
      display: grid;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      box-sizing: border-box;
  
      .item {
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
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

      .skill {
        .itemWarp {
          grid-template-columns: repeat(1, 1fr);
          .item {
            .name {
              width: 140px;
            }
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

      .skill {

        .itemWarp {
          grid-template-columns: repeat(2, 1fr);
          .item {
            .name {
              width: 120px;
            }
          }
        }
      }

  }
}

</style>