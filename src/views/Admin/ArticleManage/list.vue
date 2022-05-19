<template>
  <div id="ArticleManageList">

    <div class="searchWarp">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="search.user" placeholder="Username">
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input v-model="search.password" type="password" placeholder="Password">
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary"> 搜索 </a-button>
          <a-button > 重置 </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="opeartWarp">
      <a-button type="primary"> 撰写新文章 </a-button>
      <a-button type="primary"> 删除 </a-button>
    </div>

    <div class="tableWarp">
      <a-table 
        rowKey="id"
        :row-selection="{ selectedRowKeys: articleList.selectedRowKeys, onChange: tableSelectChange }"
        :pagination="false"
        :columns="articleList.columns"
        :data-source="articleList.data"
        :scroll="{y:'calc(100vh - (60px + 30px + 20px + 40px + 42px + 64px + 42px))'}"
      >
        <span slot="created_at" slot-scope="created_at">{{$dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}}</span>
      </a-table>
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
</template>

<script>
import { Button, Table, Pagination, Form, Input } from 'ant-design-vue';
import { list } from "@/network/article.js";
import { dict } from "@/network/static.js";
export default {
  name: "ArticleManageList",
  props: {},
  components: {
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input
  },
  data() {
    return {
      page: {
        offset: Number(this.$route.query.page) || 1,
        limits: 10,
        total: 0,
        limitsOptions: ['10', '15', '20'],
      },
      articleList: {
        selectedRowKeys: [],
        columns: [
          { title: 'ID', dataIndex: 'id'},
          { title: '标题', dataIndex: 'title'},
          { title: '创建时间', dataIndex: 'created_at', scopedSlots: { customRender: 'created_at' },},
          { title: '分类', dataIndex: 'category'},
          { title: '评论数量', dataIndex: 'commentsNum'},
          { title: '状态', dataIndex: 'status'},
        ],
        data: undefined
      },
      search: {
        user: undefined,
        password: undefined
      },
      dict: undefined
    }
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      list(this.articleList_params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.count;
          this.articleList.data = res.data.rows;
        }
      })
    },

    // 获取字典
    getDict() {
      dict("article").then(res => {
        this.dict = res;
      })
    },

    // 表格行选择
    tableSelectChange(keys) {
      this.articleList.selectedRowKeys = keys;
      console.log(keys);
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
  },
  mounted() {
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
#ArticleManageList{
  margin: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}

.searchWarp{
  ::v-deep .ant-btn:not(:last-of-type){
    margin-right: 10px;
  } 
}

.opeartWarp{
  margin-top: 10px;
  ::v-deep .ant-btn:not(:last-of-type){
    margin-right: 10px;
  }
}

.tableWarp {
  margin-top: 10px;
  // ::v-deep .ant-table-tbody{
  //   max-height: calc(100vh - (60px + 30px + 20px + 40px + 42px + 64px + 42px));
  //   overflow-y: auto;
  // }
}

.paginationWarp {
  margin-top: 10px;
}
</style>