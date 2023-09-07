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
        
        <div class="title">
          <span>Skills</span>
        </div>

        <div class="itemWarp">
          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/Vue.png')"/>
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

          <div class="item">
            <img class="icon" :src="require('@/assets/icon/brandIcon/ArcgisPro.png')"/>
            <div class="nameAndBar">              
              <div class="name">ArcGIS Pro</div>
              <a-progress :percent="60" status="active" />
            </div>
          </div>

        </div>
      </div>

      <div class="project">

        <div class="title">
          <span>Projects</span>
        </div>

        <div class="itemWarp">

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/FloodWarningPlatform.jpg')"/>
              <div class="name">Anhui Province flood control early warning platform</div>
            </div>

            <div class="detail">
              <ul>
                <li>Participated in the early development of the platform's UI framework and was involved in the construction of the public map.</li>
                <li>Developed some business modules and optimized the real-time video component delay issue.</li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/HuaiRiveTransferLine.jpg')"/>
              <div class="name">Anhui Province water transfer platform water transmission lines</div>
            </div>

            <div class="detail">
              <ul>
                <li>Independently completed the frontend development of the water pipeline business function.</li>
                <li>Implemented multi-layer overlay, management, and query functions based on ArcGIS JS.</li>
                <li>Implemented data charting, report querying, frontend exporting, and other functions.</li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/HEC-RAS.jpg')"/>
              <div class="name">Based on HEC-RAS hydrological calculations</div>
            </div>

            <div class="detail">
              <ul>
                <li>Hec-ras is used to simulate the dynamic characteristics of mountain flood independently</li>
                <li>The results of calculation under different conditions such as water level and discharge relation, specific drop and open boundary are tried</li>
                <li>Use nodejs to batch clean the output data and output to ArcGIS Pro</li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/Mike21.jpg')"/>
              <div class="name">Based on MIKE Zero® 21 hydrodynamic simulation</div>
            </div>

            <div class="detail">
              <ul>
                <li>Independently completed DEM data extraction and pre-processing for oblique photography in a certain region.</li>
                <li>Simulated and calculated the mountain flood situation in a two-dimensional hydraulic model using the water level-flow relationship curve.</li>
                <li>Extracted the calculation results to an SHP file and displayed them using ArcGIS for JS.</li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/wsAndswApp.jpg')"/>
              <div class="name">Anhui Province Water Saving Platform & Water Resources Platform APP</div>
            </div>

            <div class="detail">
              <ul>
                <li>Independently completed the frontend development of the H5 pages within the APP.</li>
                <li>Implemented business data query functions for both water conservation and water resource platforms.</li>
                <li>Enabled access to internal network IP and public domain name via HTTPS, and launched a WeChat mini-program version simultaneously.</li>
              </ul>
            </div>
          </div>

          <div class="item">
            <div class="imgWarp">
              <img class="img" :src="require('@/assets/img/projects/UnReal.jpg')"/>
              <div class="name">Based on Unreal engine visualization scene of XiangHongDian Reservoir</div>
            </div>

            <div class="detail">
              <ul>
                <li>Independently completed surface reduction optimization, block merging, and manually modeled the sluice gate of the Xianghongdian Reservoir using 3Dmax's oblique photography model.</li>
                <li>Integrated oblique photography data, DEM elevation data, and remote sensing image data to build a virtual scene.</li>
                <li>Collaborated with the designer to complete the UI interface design and functionality interaction.</li>
                <li>Used the Fluid Flux plug-in to achieve physical water flow effects and used the Niagara system to create water jet particle effects.</li>
              </ul>
            </div>
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
      span {
        font-size: 20px;
        font-weight: 500;
        color: transparent;
        background-image: linear-gradient(-90deg, #00c6ff, #0072ff);
        -webkit-background-clip: text;
        background-clip: text;
      }
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
      span {
        font-size: 20px;
        font-weight: 500;
        color: transparent;
        background-image: linear-gradient(-90deg, #00c6ff, #0072ff);
        -webkit-background-clip: text;
        background-clip: text;
      }
    }

    .itemWarp {
      margin-top: 20px;
      display: grid;
      grid-column-gap: 20px;
      grid-row-gap: 20px;
      box-sizing: border-box;
  
      .item {
        // padding: 10px;
        background-color: #fff;
        border-radius: 5px;

        .imgWarp {
          position: relative;
          .img {
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            width: 100%;
            height: 50%;
            object-fit: cover;
            object-position: center center;
          }
          .name {
            position: absolute;
            bottom: 0px;
            padding: 20px 10px 10px;

            width: 100%;
            // height: 30px;

            color: #fff;
            font-size: 16px;
            background-image: linear-gradient(0deg, #00000099, #ffffff00);
          }
        }

        .detail {
          box-sizing: border-box;
          padding: 10px;
          p {
            margin-bottom: 0px !important;
          }
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

      .itemWarp {
        grid-template-columns: repeat(1, 1fr);
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

      .project {

        .itemWarp {
          grid-template-columns: repeat(2, 1fr);
        }
      }

  }
}

</style>