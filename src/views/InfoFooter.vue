<template>
  <div id="InfoFooter" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="container">
      <!-- <toy/> -->
      <div class="block">
        <anpu/>
      </div>
      <div class="block">
        <div class="title">
          <icon-cube-three theme="outline"  :strokeWidth="3"/>
          <span>Powered by</span>
        </div>
        <div class="content">
          <!-- <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/Vue.png')" alt=""></div>
            <div class="name">Vue.js</div>
          </div> -->

          <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/AntDesign.png')" alt=""></div>
            <div class="name">Ant Design</div>
          </div>

          <!-- <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/IconPark.png')" alt=""></div>
            <div class="name">IconPark</div>
          </div> -->

          <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/HUAWEI.png')" alt=""></div>
            <div class="name">HUAWEI Cloud</div>
          </div>

          <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/EggJS.png')" alt=""></div>
            <div class="name">EggJS</div>
          </div>

        </div>
      </div>
      <div class="block">
        <div class="title">
          <icon-link-three theme="outline" :strokeWidth="3"/>
          <!-- <icon-cube-three theme="outline"  :strokeWidth="3"/> -->
          <span>Related Links</span>
        </div>

        <div class="content">
          <div class="link">
            <a href="https://freessl.cn/" target="_blank">
              <div class="icon"><img :src="require('@/assets/icon/footLink/freessl.png')" alt=""></div>
              <div class="name">FreeSSL</div>
            </a>
          </div>

          <div class="link">
            <a href="https://pan.makedream.site/" target="_blank">
              <div class="icon"><img :src="require('@/assets/icon/footLink/alist.png')" alt=""></div>
              <div class="name">AList存储</div>
            </a>
          </div>

          <!-- <div class="link">
            <a href="https://github.com/elissa1997" target="_blank">
              <div class="icon"><img :src="require('@/assets/icon/brandIcon/github.png')" alt=""></div>
              <div class="name">GitHub</div>
            </a>
          </div>

          <div class="link">
            <a href="https://www.facebook.com/profile.php?id=100004061595831" target="_blank">
              <div class="icon"><img :src="require('@/assets/icon/brandIcon/facebook.png')" alt=""></div>
              <div class="name">Facebook@Elissa Liu</div>
            </a>
          </div> -->

          <!-- <div class="brand">
            <div class="icon"><img :src="require('@/assets/icon/brandIcon/EggJS.png')" alt=""></div>
            <div class="name">EggJS</div>
          </div> -->

        </div>

      </div>

    </div>
  </div>
</template>

<script>
// import toy from "@/components/toy.vue";
import anpu from "@/components/anpu.vue";
export default {
  name: "InfoFooter",
  props: {},
  components: {
    anpu
  },
  data() {
    return {
    }
  },
  methods: {},
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#InfoFooter{
  background-color: $footer-backGround-color;
  min-height: 20vh;
}


.container {
  margin: 0 auto;
  // height: 280px;
  padding: 40px 10px;

  display: flex;

  .block{
    padding: 10px;
    .title {
      ::v-deep .i-icon {
        margin-right: 10px;
        // color: #12c2e9;
      }
      display: flex;
      align-items: center;
      font-size: 19px;
      line-height: 40px;
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 5px;
      border-bottom: 1px solid #b5b5b5a6;
    }

    .content {
      // padding: 0px 10px;
      .brand ,.link a{
        display: flex;
        align-items: center;
        .icon{
          margin-right: 10px;
          img {
            width: 20px;
            height: 20px;
            object-fit: cover;
          }
        }
        .name{

        }
      }

      .brand:not(:last-of-type){
        margin-bottom: 10px;
      }

      .link:not(:last-of-type){
        margin-bottom: 10px;
      }
    }
  }
}

.mobile {
  .container {
    width: 100%;
    flex-direction: column;

    .block {
      width: 100%;
    }
  }
}

.desktop {
  .container {
    width: 1100px;
    justify-content: space-between;

    .block {
      width: 30%;
    }
  }
}
</style>