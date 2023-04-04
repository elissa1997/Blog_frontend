<template>
  <div id="About" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
    <div class="container">
      <div class="profile">

        <div class="headImgWarp">
          <img class="headImg" :src="avatarByemail('524948583@qq.com')"/>
        </div>


        <div class="text">
          
          <div class="baseInfo">
            <span class="name">Elissa_liu</span>
            <div class="job">
              <icon-handbag theme="outline" :strokeWidth="3"/>
              <span>Front-end Developer / Technical Art</span>
            </div>
            <div class="unit">
              <icon-city theme="outline" :strokeWidth="3"/>
              <span>Anhui Institute of Hydraulic Research</span>
            </div>
          </div>

          <div class="socialNetwork">
            <div class="text">Contact me</div>
            <div class="linksWarp">
              <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/email.png')"></a>
              <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/weibo.png')"></a>
              <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/github.png')"></a>
              <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/twitter.png')"></a>
              <a class="linkItem"><img :src="require('@/assets/icon/brandIcon/facebook.png')"></a>
            </div>
          </div>

        </div>


      </div>

      <div class="skill">
        
        <div class="title">Skills</div>

        <div class="itemWarp">
          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/vue.png')"/>
            <div class="nameAndBar">
              <div class="name">Vue.js</div>
              <a-progress :percent="80" status="active" />
            </div>
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/nodejs.png')"/>
            <div class="nameAndBar">              
              <div class="name">Node.js</div>
              <a-progress :percent="70" status="active" />
            </div>
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/ui.png')"/>
            <div class="nameAndBar">              
              <div class="name">PhotoShop / Figma</div>
              <a-progress :percent="40" status="active" />
            </div>
          </div>

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/UnrealEngine.png')"/>
            <div class="nameAndBar">              
              <div class="name">Unreal Engine</div>
              <a-progress :percent="60" status="active" />
            </div>
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
    display: flex;


    .headImgWarp {
      background-image: url(~@/assets/img/bg-2.png);
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .headImg {
        border-radius: 50%;
        width: 120px;
        height: 120px;
        border: 2px solid transparent;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #222, #222), linear-gradient(270deg, #00c6ff, #0072ff);

        box-shadow: 0px 0px 20px 1px #1890ff;
      }
    }

    .text {
      // color: #000;
      .baseInfo {
        .name {
          font-weight: 700;
          width: fit-content;
          color: transparent;
          background-image: linear-gradient(-90deg, #00c6ff, #0072ff);
          -webkit-background-clip: text;
          background-clip: text;
        }
      }

      
      .socialNetwork {
        display: flex;
        flex-direction: column;
        .text {
          background-image: linear-gradient(-90deg, #00c6ff, #0072ff);
          border-radius: 10px;
          color: #fff;
          padding: 0 10px;
          margin-bottom: 20px;
          width: fit-content;
        }

        .linksWarp {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .linkItem {
            text-align: center;
            img {
              width: 30px;
              height: 30px;
            }
          }
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
        justify-content: space-between;
  
        .icon {
          // position: absolute;
          width: 40px;
          height: 40px;
        }

        .nameAndBar {
          width: calc(100% - 40px - 20px);
          .name {
            font-size: 15px;
          }
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

        .img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

  }

}

.mobile {
  .container {
    @include containerMobileWidth;

      .profile {
        flex-direction: column;
        align-items: center;

        .headImgWarp {
          width: 100%;
          height: 130px;
        }

        .text {
          .baseInfo {
            margin-top: 40px;
            text-align: center;
            line-height: 50px;

            .name {
              font-size: 20px;
            }

            .job, .unit {
              display: flex;
              align-items: center;
              justify-content: center;

              .i-icon {
                margin-right: 10px;
              }
            }
          }
  
          .socialNetwork {
            margin-top: 40px;
            align-items: center;
            
  
            .text {
              font-size: 20px;
              line-height: 40px;
            }
  
            .linksWarp {
              width: 300px;
            }
          }
        }

      }

      .skill {
        .itemWarp {
          grid-template-columns: repeat(1, 1fr);
        }
      }

  }
}

.desktop {
  .container {
    @include containerDesktopWidth;

      .profile {
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;

        .headImgWarp {
          width: 430px;
          height: 350px;
        }

        .text {
          .baseInfo {
            // font-size: 23px;
            line-height: 50px;

            .name {
              font-size: 23px;
            }

            .job, .unit {
              font-size: 16px;
              display: flex;
              align-items: center;

              .i-icon {
                margin-right: 10px;
              }
            }
          }
  
          .socialNetwork {
            margin-top: 40px;
            justify-content: space-between;
            .text {
              font-size: 23px;
              line-height: 50px;
            }
            .linksWarp {
              // width: 200px;
            }
          }
        }
        
      }

      .skill {

        .itemWarp {
          grid-template-columns: repeat(2, 1fr);
        }
      }

  }
}

</style>