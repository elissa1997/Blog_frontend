<template>
  <div id="Article" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <!-- <remote-css href="https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.5.1/katex.min.css"></remote-css> -->
    <div class="container article">

      <template v-if="!loading">
        <div class="head" :style="`background-image: url(${articleDetail.cover})`">
          <div class="backFilter"></div>
          <div class="text">
            <div class="title">{{articleDetail.title}}</div>
            <div class="meta">

              <span class="metaItem author">
                <icon-user theme="outline" :strokeWidth="3"/>
                {{articleDetail.author}}
              </span>
              <span class="metaItem time">
                <icon-calendar theme="outline" :strokeWidth="3"/>
                {{$dayjs(articleDetail.createdAt).format('YYYY-MM-DD HH:mm')}}
              </span>
              <span class="metaItem category">
                <icon-application-two theme="outline" :strokeWidth="3"/>
                {{articleDetail.category}}
              </span>
              <span class="metaItem comment">
                <icon-comment theme="outline" :strokeWidth="3"/>
                {{articleDetail.commentsNum}}
              </span>
            </div>
          </div>
        </div>

        <div id="markdown" class="content">
          <!-- {{articleDetail.content}} -->
          <!-- <vue-markdown @rendered="renderFinsh">{{articleDetail.content}}</vue-markdown> -->
            <div id="tex" v-html="compiledMarkdown"></div>

        </div>

        <div class="commentsWarp">
          <commentsList ref="commentsList" :comments="comments"/>
        </div>

        <div class="replyCommentWarp">
          <replyComment/>
        </div>


      </template>
    </div>


  </div>
</template>

<script>
import { marked } from "marked";
import Prism from "prismjs";
import katex from 'katex';
import 'katex/dist/katex.css';
import renderMathInElement from 'katex/contrib/auto-render/auto-render';
import commentsList from '@/components/comments.vue';
import replyComment from '@/components/replyComment.vue';
import { listToTree, nestComment } from '@/util/tool.js';
import { detail } from "@/network/article.js";
import { listByArticle } from "@/network/comment.js";


export default {
  name: "Article",
  props: {},
  components: {
    commentsList,
    replyComment
  },
  data() {
    return {
      loading: true,
      articleDetail: undefined,
      comments: undefined,
    }
  },
  methods: {
    renderMathInElement,
    getArticleDetail() {


      detail(this.articleDetail_params).then(res => {
        if (res.status === 200) {
          this.articleDetail = res.data;
        }
      }).finally(() => {
        this.loading = false;
        this.$nextTick(() => {
          Prism.highlightAll();
        });
        setTimeout(() => {
          this.renderTex();
        }, 300);
      })
    },

    getArrticleComment() {
      listByArticle(this.listByArticle_params).then(res => {
        if (res.status === 200) {
          nestComment(res.data.rows);
          this.comments = nestComment(res.data.rows);
        }
      })
    },

    renderTex() {
      const renderOption = {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '$', right: '$', display: false},
          {left: "\\(", right: "\\)", display: false},
          {left: "\\[", right: "\\]", display: true}
        ],
        strict: "ignore",
        throwOnError : true,
        // displayMode: true
      }
      const el = document.getElementById('tex');
      this.renderMathInElement(el, renderOption);

      // const el = document.getElementsByClassName('test');
      // for (let i of el) {
      //   this.renderMathInElement(i, renderOption);

      // }
      
    },
  },
  mounted() {
    this.getArticleDetail();
    this.getArrticleComment();

    // 添加回复成功(事件总线)
    this.$EventBus.$on("commentAddSucess", () => {
      this.getArrticleComment;
    })
  },
  computed: {
    articleDetail_params: function() {
      return {
        a_id: this.$route.query.id
      }
    },
    listByArticle_params: function() {
      return {
        a_id: this.$route.query.id
      }
    },
    compiledMarkdown() {
      return marked(this.articleDetail.content);
    },

  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Article{
  background-color: $backGround-color;
}

.container {
  min-height: 50vh;
  margin: 0px auto;

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
  
  .article{
    width: 100%;
    
    .head{
      height: 200px;
      .text{
        padding: 0 10px;
        align-items: center;
        text-align: center;
      }
    }

    .content{
      padding: 10px 20px;
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
  
  .article {
    width: 1100px;
    padding: 50px 0px;

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
      width: 1100px;
      padding: 40px 80px;
    }
    .replyCommentWarp{
      width: 100%;
      padding: 40px 80px;
    }
  }

}
</style>