<template>
  <div id="Links" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="container">

      <div class="links">
        <div class="card" v-for="item in links" :key="item.link">
          <a :href="item.link" target="_blank">
            <div class="warp">
              <img class="icon" :src="item.link+'favicon.ico'" :onerror="errorImg">
              <!-- {{checkExists(item.link+'favicon.ico')}} -->
              <div class="name">{{item.name}}</div>
            </div>
          </a>
        </div>
      </div>

      <div class="tips">
        <p>申请友链只需在评论处留下链接与博客名称，我在确认可以正常访问后会添加至后台</p>
        <p>友链使用favicon.ico图标，若抓取不到将使用默认图标<img class="icon" :src="require('@/assets/icon/link.png')">替代</p>
        
      </div>

      <div class="commentsWarp">
        <comments v-if="comments" ref="comments" :comments="comments" :id="aId" @addCommentSuccess="commentsData"/>
      </div>
    </div>
  </div>
</template>

<script>
import { Alert } from "ant-design-vue";
import { json } from "@/network/static.js";
import { list } from "@/network/comment.js";
import comments from '@/components/comments.vue';

export default {
  name: "Links",
  props: {},
  components: {
    [Alert.name]: Alert,
    comments
  },
  data() {
    return {
      aId: 9002,
      page: {
        offset: Number(this.$route.query.page) || 1,
        limits: 10,
        total: 0,
        limitsOptions: ['10', '15', '20'],
      },
      links: undefined,
      comments: undefined
    }
  },
  methods: {
    // 获取友情链接数据
    linksData() {
      json('links').then(res => {
        if (res) {
          this.links = res;
        }
      })
    },

    // 获取评论
    commentsData() {
      list(this.commentList_params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.count;
          this.comments = res.data.rows;
        }
      })
    },

    // 检测图片是否存在
    checkExists(src) {
      let imgObj = new Image();
      imgObj.src = src;
      console.log(imgObj.width);
      if (imgObj.fileSize > 0 || (imgObj.width > 0 && imgObj.height > 0) ) {
        return src;
      }else {
        return require('@/assets/icon/link.png');
      }
    }
  },
  mounted() {
    this.linksData();
    this.commentsData();
  },
  computed: {
    commentList_params: function() {
      return {
        search: {
          aId: this.aId
        },
        // offset: this.page.offset,
        // limits: this.page.limits,
      }
    },

    errorImg: function () {
      return `this.src="${require('@/assets/icon/link.png')}"`
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Links{
  background-color: $backGround-color;
  overflow: auto;
}

.container {
  
  box-sizing: border-box;
  .links {
    display: grid;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    box-sizing: border-box;
    
    .card {
      background-color: #fff;
      box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
      @include cardShadow;

      .warp {      
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          box-shadow: 0px 0px 5px #00000036;
          border: solid 2px #fff;
        }

        .name {
          font-size: 16px;
          font-weight: 700;
        }
      }

    }
  }

  .tips {
    box-sizing: border-box;
    padding: 10px 20px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 5px;

    p {
      margin: 10px 0;
    }

    border-left: solid 4px #1890ff;

    .icon {
      width: 30px;
      height: 30px;
    }
  }

  .commentsWarp {
    background-color: #fff;
    width: 100%;
    margin-top: 40px;
    max-height: 60vh;
    overflow-y: auto;
  }

}

.mobile {
  .container {
    @include containerMobileWidth;
    .links {
      grid-template-columns: repeat(2, 1fr);
    }

    .commentsWarp {
      padding: 20px 10px;
    }
  }
}


.desktop {
  .container {
    @include containerDesktopWidth;

    .links{
      grid-template-columns: repeat(5, 1fr);
    }

    .commentsWarp {
      padding: 40px 80px;
    }
  }
}
</style>