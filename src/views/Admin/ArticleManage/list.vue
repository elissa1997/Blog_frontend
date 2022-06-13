<template>
  <div id="ArticleManageList">

    <div class="searchWarp">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="search.title" placeholder="文章标题">
          </a-input>
        </a-form-item>
        <a-form-item v-if="dict">
          <a-select style="width: 200px" placeholder="文章分类" v-model="search.category">
            <a-select-option :value="option.key" v-for="option in dict.category" :key="option.key">{{option.value}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="dict">
          <a-select style="width: 200px" placeholder="文章状态" v-model="search.status">
            <a-select-option :value="option.key" v-for="option in dict.status" :key="option.key">{{option.value}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="searchApply"><icon-search theme="outline" :strokeWidth="3"/> 搜索 </a-button>
          <a-button @click="searchRest"><icon-clear theme="outline" :strokeWidth="3"/> 重置 </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="opeartWarp">
      <a-button type="primary" @click="add"><icon-write theme="outline" :strokeWidth="3"/> 撰写新文章 </a-button>
      <a-button type="danger" :disabled="articleList.selectedRowKeys.length === 0"><icon-delete theme="outline" :strokeWidth="3"/> 删除 </a-button>
    </div>

    <div class="tableWarp">
      <a-table 
        rowKey="id"
        :row-selection="{ selectedRowKeys: articleList.selectedRowKeys, onChange: tableSelectChange }"
        :pagination="false"
        :columns="articleList.columns"
        :data-source="articleList.data"
        :scroll="{y:'auto'}"
      >
        <span slot="created_at" slot-scope="created_at">{{$dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span v-if="dict" slot="category" slot-scope="category">{{translate(dict, 'category', category).value}}</span>
        <span v-if="dict" slot="status" slot-scope="status">{{translate(dict, 'status', status).value}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="edit(record)"><icon-writing-fluently theme="outline" :strokeWidth="3"/> 编辑 </a-button>
          <a-divider type="vertical" />
          <a-button type="link"><icon-delete theme="outline" :strokeWidth="3"/> 删除 </a-button>
        </span>
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
import { Button, Table, Pagination, Form, Input, Select, Divider } from 'ant-design-vue';
import { list } from "@/network/article.js";
import { dict } from "@/network/static.js";
import { translate, resetObj, filterObj } from "@/util/tool.js";
export default {
  name: "ArticleManageList",
  props: {},
  components: {
    [Table.name]: Table,
    [Pagination.name]: Pagination,
    [Button.name]: Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [Divider.name]: Divider
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
          { title: 'ID', dataIndex: 'id', width: 80},
          { title: '标题', dataIndex: 'title'},
          { title: '创建时间', dataIndex: 'created_at', scopedSlots: { customRender: 'created_at' }, width: 160},
          { title: '分类', dataIndex: 'category', scopedSlots: { customRender: 'category' }, width: 100, align: 'center'},
          { title: '评论', dataIndex: 'commentsNum', width: 80, align: 'center'},
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, width: 100, align: 'center'},
          { title: '操作', scopedSlots: { customRender: 'action' }, width: 220, align: 'center'},
        ],
        data: undefined
      },
      search: {
        title: undefined,
        category: undefined,
        status: undefined
      },
      dict: undefined
    }
  },
  methods: {
    translate,
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

    searchApply() {
      this.page.offset = 1;
      this.page.limits = 10;
      this.getArticleList();
    },

    // 搜索重置
    searchRest() {
      resetObj(this.search);
      this.page.offset = 1;
      this.page.limits = 10;
      this.getArticleList();
    },

    // 点击撰写新文章
    add() {
      this.$router.push({
        path: "/admin/articleedit",
        query: {
          type: "add"
        }
      })
    },

    // 点击编辑
    edit(record) {
      this.$router.push({
        path: "/admin/articleedit",
        query: {
          id: record.id,
          type: "edit"
        }
      })
    }
  },
  mounted() {
    this.getDict();
    this.getArticleList();
  },
  computed: {
    articleList_params: function() {
      return {
        search: filterObj(this.search),
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

  ::v-deep .ant-btn .i-icon {
    margin-right: 5px;
  }
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
  ::v-deep .ant-table-body{
    height: calc(100vh - (60px + 30px + 20px + 40px + 42px + 64px + 42px)) !important;
    overflow-y: auto;
  }
}

.paginationWarp {
  margin-top: 10px;
}
</style>