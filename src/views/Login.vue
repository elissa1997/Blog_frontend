<template>
  <div id="Login" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="card">
      <div class="pic" :style="`background-image: url(${bingPic_url})`" v-if="bingPic">
        <div class="oneWord">
          <div class="copyright">{{bingPic.copyright}}</div>
        </div>
      </div>
      <div class="login">
        <div class="formWarp">
          <div class="title">
            <div class="text">后台登录</div>
            <div class="subText">Welcome back.</div>
          </div>
          <div class="inputWarp">
            <a-input v-model="username" placeholder="请输入账号" />
          </div>
          <div class="inputWarp">
            <a-input-password v-model="password" placeholder="请输入密码" />
          </div>
          <div class="btnWarp">
            <a-button type="primary" style="width: 40%;" @click="handleLogin">登录</a-button>
            <a-button style="width: 40%;">重置</a-button>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { Input, Button } from 'ant-design-vue'
import { bingPic } from "@/network/thirdParty.js";
import { login } from "@/network/user.js";
import { loginSuccess } from "@/util/auth.js";
export default {
  name: "Login",
  props: {},
  components: {
    [Input.name]: Input,
    [Input.Password.name]: Input.Password,
    [Button.name]: Button,
  },
  data() {
    return {
      bingPic: undefined,
      username: undefined,
      password: undefined
    };
  },
  methods: {
    getBingPic() {
      bingPic(this.bingPic_params).then((res) => {
        this.bingPic = res.images[0];
      });
    },

    // 点击登录按钮
    handleLogin() {
      login(this.login_data).then((res) => {
        if (res.status == 200) {
          loginSuccess(res.token);
        }else{
          this.$message.error(res.msg);
        }
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
    bingPic_url: function () {
      return process.env.VUE_APP_PROXY_BING + this.bingPic.url;
    },


    login_data: function () {
      return {
        name: this.username,
        password: this.password,
      }
    }
  },
  mounted() {
    this.getBingPic();
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
    box-sizing: border-box;
    .login{
      display: flex;
      justify-content: center;
      align-items: center;
      .formWarp{
        .title{
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 30px;
  
          .text{
            font-size: 25px;
            font-weight: 100;
            color: transparent;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-image: -webkit-linear-gradient(180deg,#379eff,#00ceab);

          }

          .subText{
            font-size: 14px;
            font-weight: 100;
          }
        }

        .inputWarp{
          margin-bottom: 30px;
        }

        .btnWarp{
          display: flex;
          justify-content: space-between;
          align-items: center;

        }
        
      }
    }

  }

.mobile {
  padding: 10vh 20px;
  .card {
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 20px #0000000a;

    .pic{
      display: none;
    }

    .login{
      height: 50vh;
      width: 100%;

      .formWarp{
        width: 80%;
      }
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
      height: 50vh;
      width: 50%;

      .formWarp{
        width: 65%;
      }
    }

  }
}

</style>