<template>
  <div id="Home" :class="{ mobile:  $store.state.style.screenWidth < 920 , desktop: $store.state.style.screenWidth >= 920}">
    <div class="container">
      <!-- <div class="card" >
        <div class="cover">
          <img :src="require('@/assets/img/defaultCover/covebg1.jpg')">
        </div>
        <div class="text">
          <div class="title">文章标题</div>
          <div class="summary"></div>
        </div>
      </div> -->

      <div class="card"  v-for="item in articleList" :key="item.id" @click="toArticleDetail(item)">
        <div class="cover">
          <img v-if="!item.cover" :src="require('@/assets/img/defaultCover/coverbg'+random(1,3)+'.jpg')">
          <img v-else :src="item.cover">
        </div>
        <div class="text">
          <div class="title">{{item.title}}</div>
          <div class="meta">
            <!-- <span class="metaItem author">
              <icon-user theme="outline" size="18" :strokeWidth="3"/>
              {{item.author}}
            </span> -->
            <span class="metaItem time">
              <icon-calendar theme="outline" size="18" :strokeWidth="3"/>
              {{$dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}}
            </span>
            <span class="metaItem category">
              <icon-application-two theme="outline" size="18" :strokeWidth="3"/>
              {{$store.getters['dict/transDict']('article', 'category', item.category)}}
            </span>
            <span class="metaItem comment">
              <icon-comment theme="outline" size="18" :strokeWidth="3"/>
              {{item.comments.length}}
            </span>
          </div>
          <div class="summary">
            <template v-if="parseMarkdown(item.content, 155)">
              {{parseMarkdown(item.content, ($store.state.style.screenWidth &lt; 920)?90:175)}}......
            </template>
            <template v-else>暂无摘要</template>
          </div>
        </div>
      </div>

      

      <div class="paginationWarp">
        <a-pagination 
          v-model="page.offset"
          :total="page.total"
          :pageSize="page.limits"
          show-size-changer
          :page-size-options="page.limitsOptions"
          @change="offsetChange"
          @showSizeChange="limitsChange"
        />
      </div>

    </div>
  </div>
</template>

<script>
import { Pagination } from 'ant-design-vue';
import { list } from '@/network/article.js';
import { random,parseMarkdown } from "@/util/tool.js";
export default {
  name: "Home",
  props: {},
  components: {
    [Pagination.name]: Pagination
  },
  data() {
    return {
      page: {
        offset: Number(this.$route.query.page) || 1,
        limits: 5,
        total: 0,
        limitsOptions: ['5', '10', '15', '20'],
      },
      articleList: undefined
    }
  },
  methods: {
    random,
    parseMarkdown,

    // 获取文章列表
    getArticleList() {
      list(this.articleList_params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.count;
          this.articleList = res.data.rows;
        }
      })
    },

    // 页码改变
    offsetChange(page, pageSize) {
      this.page.offset = page;
      this.page.limits = pageSize;
      this.getArticleList();
    },

    // 页面条数改变
    limitsChange(page, pageSize) {
      this.page.offset = 1;
      this.page.limits = pageSize;
      this.getArticleList();
    },

    // 查看文章详情
    toArticleDetail(item) {
      this.$router.push({
        path: '/article',
        query: {
          id: item.id
        }
      })
    }
  },
  async mounted() {
    await this.$store.dispatch('dict/cacheDict', {
      fileName: 'dict_article',
      mutationsName: 'SET_ARTICLE'
    });
    this.getArticleList();
  },
  computed: {
    articleList_params: function() {
      return {
        offset: this.page.offset,
        limits: this.page.limits,
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#Home{
  background-color: $backGround-color;
  overflow: auto;
}

.container {
  
  box-sizing: border-box;
  min-height: 50vh;
  .card {
    cursor: pointer;
    width: 100%;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0px 0px 20px #0000000a;

    .text{
      box-sizing: border-box;

      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .meta{
        display: flex;
        align-items: center;
        margin: 10px 0px;

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
          // border: 1px solid;
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
      .summary {
        font-size: 14px;
        color: #999;
        word-wrap: break-word;
        word-break: break-all;
        white-space: normal;
      }
    }
  }

  .paginationWarp{
    margin: 20px 0px;
    text-align: center;

    ::v-deep .ant-select-selection,::v-deep .ant-pagination-item-link, ::v-deep .ant-pagination-item {
      border: 0px!important;
    }
  }
}



.mobile {
  .container {
    @include containerMobileWidth;
    .card {
      // height: 400px;
      display: flex;
      flex-direction: column;
      .cover{
        width: 100%;
        height: 180px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      }

      .text {
        padding: 10px;
        .summary {
          line-height: 28px;
        }
      }
    }

    .card:not(:last-of-type){
      margin-bottom: 40px;
    }
  }
}

.desktop {
  .container {
    @include containerDesktopWidth;
    .card{
      height: 250px;
      display: flex;
      .cover{
        width: 250px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }

      .text {
        width: calc(100% - 250px);
        padding: 15px;

        .summary {
          line-height: 35px;
          max-height: calc(250px - 30px - 21px - 51px);
          overflow: hidden;
        }
      }
    }

    .card:not(:last-of-type){
      margin-bottom: 50px;
    }
  }
}
</style>
