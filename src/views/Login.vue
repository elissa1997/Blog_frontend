<template>
  <div id="Login" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="card">
      <div class="pic">
        <div class="oneWord" v-if="hitokoto">
          <div class="hitokoto">“ {{hitokoto.hitokoto}} ”</div>
          <div class="author" v-if="hitokoto.from_who">—— {{hitokoto.from_who}}</div>
        </div>
      </div>
      <div class="login">登录</div>
    </div> 
  </div>
</template>

<script>
import { bingPic, hitokoto } from "@/network/thirdParty.js";
export default {
  name: "Login",
  props: {},
  components: {},
  data() {
    return {
      hitokoto: undefined
    };
  },
  methods: {
    getBingPic() {
      bingPic(this.bingPic_params).then((res) => {
        console.log(res);
      });
    },

    getHitokoto() {
      hitokoto(this.hitokoto_params).then((res) => {
        this.hitokoto = res;
      });
    }
  },
  computed: {
    bingPic_params: function () {
      return {
        format: "js",
        idx: "0",
        n: "1",
        nc: "1614319565639",
        pid: "hp",
        FORM: "BEHPTB",
        uhd: "0"
      };
    },

    hitokoto_params: function () {
      return {
        c: "c",
        c: "d",
        c: "e",
        c: "f",
        c: "h",
        c: "k",
        encode: "json",
      }
    }
  },
  mounted() {
    this.getHitokoto();
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
#Login {
  background-color: $backGround-color;
  display: flex;
  align-items: center;
  justify-content: center;
}

  .card {
    min-height: 50vh;

    .login{
      padding: 10px;
    }

  }

.mobile {
  padding: 10vh 0;
  .card {
    width: calc(100vw - 20px);
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 20px #0000000a;

    .pic{
      display: none;
    }

    .login{
      width: 100%;
    }

  }
}

.desktop {
  padding: 20vh 0;
  .card {
    width: 900px;
    display: flex;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 20px #0000000a;

    .pic{
      // height: 100%;
      width: 50%;
      background-image: url(https://api.oneneko.com/v1/bing_today);
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      position: relative;
      .oneWord {
        backdrop-filter: blur(5px);
        border-bottom-left-radius: 5px;
        width: 100%;
        position: absolute;
        bottom: 0px;
        padding: 10px 20px;
        color:#fff;
        background-image: linear-gradient(0deg,#00000099 ,#ffffff00);
        .hitokoto{
          font-size: 18px;
          // font-weight: bold;
        }

        .author{
          text-align: end;
          font-size: 14px;
          // font-weight: bold;
        }
      }
    }

    .login{
      // height: 100%;
      width: 50%;
    }

  }
}

</style>