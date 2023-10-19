<template>
  <div id="Article" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="container">

      <template v-if="!loading">
        <div class="head" :style="`background-image: url(${articleDetail.cover})`">
          <div class="backFilter"></div>
          <div class="text">
            <div class="title">{{articleDetail.title}}</div>
            <div class="meta">

              <!-- <span class="metaItem author" v-if="$store.state.user.loginUserInfo">
                <icon-user theme="outline" :strokeWidth="3"/>
                {{$store.getters['user/getLoginUserName'](articleDetail.author)}}
              </span> -->
              <span class="metaItem time">
                <icon-calendar theme="outline" :strokeWidth="3"/>
                {{$dayjs(articleDetail.createdAt).format('YYYY-MM-DD HH:mm')}}
              </span>
              <span class="metaItem category">
                <icon-application-two theme="outline" :strokeWidth="3"/>
                {{$store.getters['dict/transDict']('article', 'category', articleDetail.category)}}
              </span>
              <span class="metaItem comment">
                <icon-comment theme="outline" :strokeWidth="3"/>
                {{articleDetail.comments.length}}
              </span>
            </div>
          </div>
        </div>

        <div class="content">
          <!-- {{articleDetail.content}}
          <vue-markdown @rendered="renderFinsh">{{articleDetail.content}}</vue-markdown> -->
          <!-- <div id="tex" v-html="compiledMarkdown"></div> -->
          <!-- <markdown-it-vue id="markdown-body" ref="myMarkdownItVue" :content="articleDetail.content" :options="options" /> -->
          <markdown :content="articleDetail.content"/>
        </div>

        <!-- <markdown-it-vue class="content" :content="articleDetail.content" /> -->

        <div class="commentsWarp">
          <comments ref="comments" :comments="articleDetail.comments" :id="Number($route.query.id)" @addCommentSuccess="getArticleDetail"/>
        </div>



      </template>
    </div>


  </div>
</template>

<script>
import markdown from "@/components/public/markdown.vue";
import comments from '@/components/comments.vue';
import { detail } from "@/network/article.js";


export default {
  name: "Article",
  props: {},
  components: {
    markdown,
    comments,
  },
  data() {
    return {
      loading: true,
      articleDetail: undefined,
      comments: undefined,
    }
  },
  methods: {
    // renderMathInElement,
    getArticleDetail() {
      detail(this.articleDetail_params).then(res => {
        if (res.status === 200) {
          this.articleDetail = res.data;
        }
      }).finally(() => {
        this.loading = false;
      })
    },
  },
  async mounted() {
    await this.$store.dispatch('dict/cacheDict', {
      fileName: 'dict_article',
      mutationsName: 'SET_ARTICLE'
    });
    this.getArticleDetail();
  },
  computed: {
    articleDetail_params: function() {
      return {
        a_id: this.$route.query.id
      }
    },

  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Article{
  background-color: $backGround-color;
  overflow: auto;
}

.container {
  
  box-sizing: border-box;
  min-height: 50vh;

  .head{
    width: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;

    .backFilter{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      backdrop-filter: brightness(0.7);
    }

    .text{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      backdrop-filter: blur(7px);
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: center;

      .title{
        color: #fff;
        font-size: 32px;
        font-weight: 700;
      }

      .meta{
        display: flex;
        align-items: center;
        margin-top: 15px;

        .author{
          color: #fa8c16;
          background-color: #fff7e6;
        }

        .time{
          color: #13c2c2;
          background: #e6fffb;
        }

        .category {
          color: #1890ff;
          background: #e6f7ff;
        }

        .comment {
          color: #722ed1;
          background: #f9f0ff;
        }

        .metaItem{
          font-size: 14px;
          padding: 5px 10px;
          border-radius: 5px;
          display: inline-flex;
          align-items: center;
          ::v-deep .i-icon {
            margin-right: 5px;
          }
        }

        .metaItem:not(:last-of-type){
          margin-right: 15px;
        }
      }

    }
  }

  .content{
    background-color: #fff;
  }
  .commentsWarp{
    background-color: #fff;
    // border-top: 1px solid #e8e8e8;
  }
  .replyCommentWarp{
    background-color: #fff;
    // border-top: 1px solid #e8e8e8;
  }
}

.mobile{
  
  .container{
    @include containerMobileWidth;
    .head{
      height: 200px;
      .text{
        padding: 0 10px;
        align-items: center;
        text-align: center;
      }
    }

    .content{
      padding: 10px 10px;
    }
    
    .commentsWarp {
      width: 100%;
      padding: 20px 10px;
    }

    .replyCommentWarp{
      width: 100%;
      padding: 40px 10px;
    }
  }
}

.desktop{
  
  .container {
    @include containerDesktopWidth;

    .head{
      height: 300px;
      .text{
        padding: 0 0 0 80px;
      }
    }
    .content{
      padding: 40px 80px;
    }
  
    .commentsWarp {
      width: 100%;
      padding: 40px 80px;
    }
    .replyCommentWarp{
      width: 100%;
      padding: 40px 80px;
    }
  }

}
</style>