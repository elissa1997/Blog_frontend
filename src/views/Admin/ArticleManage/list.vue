<template>
  <div id="ArticleManageList">

    <div class="searchWarp">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="search.title" placeholder="文章标题">
          </a-input>
        </a-form-item>
        <a-form-item v-if="$store.state.dict.article">
          <a-select style="width: 200px" placeholder="文章分类" v-model="search.category">
            <a-select-option :value="option.key" v-for="option in $store.getters['dict/getDictObj']('article', 'category')" :key="option.key">{{option.value}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="$store.state.dict.article">
          <a-select style="width: 200px" placeholder="文章状态" v-model="search.status">
            <a-select-option :value="option.key" v-for="option in $store.getters['dict/getDictObj']('article', 'status')" :key="option.key">{{option.value}}</a-select-option>
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
      <a-button type="danger" :disabled="articleList.selectedRowKeys.length === 0" @click="delMultiple"><icon-delete theme="outline" :strokeWidth="3"/> 删除 </a-button>
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
        <span slot="comments" slot-scope="comments">{{comments.length}}</span>
        <span slot="created_at" slot-scope="created_at">{{$dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}}</span>
        <span v-if="$store.state.dict.article" slot="category" slot-scope="category">{{$store.getters['dict/transDict']('article', 'category', category)}}</span>
        <span v-if="$store.state.dict.article" slot="status" slot-scope="status">{{$store.getters['dict/transDict']('article', 'status', status)}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="edit(record)"><icon-writing-fluently theme="outline" :strokeWidth="3"/> 编辑 </a-button>
          <a-divider type="vertical" />
          <a-button type="link" @click="delSingle(record)"><icon-delete theme="outline" :strokeWidth="3"/> 删除 </a-button>
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
import Vue from 'vue';
import { Button, Table, Pagination, Form, Input, Select, Divider, Modal } from 'ant-design-vue';
import { list, del } from "@/network/article.js";
import { resetObj, filterObj } from "@/util/tool.js";
Modal.install(Vue);

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
          { title: '评论', dataIndex: 'comments', scopedSlots: { customRender: 'comments' }, width: 80, align: 'center'},
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
    // 获取文章列表
    getArticleList() {
      list(this.articleList_params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.count;
          this.articleList.data = res.data.rows;
        }
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
    },
    // 删除多个
    delMultiple() {
      let this_ = this;
      Modal.confirm({
        title: '删除提示',
        content: '确认删除多条吗？',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          del(this_.del_data).then(res => {
            if (res.status == 200) {
              this_.$message.success('删除成功');
              this_.getArticleList();
            }
          })
        },
        onCancel() {},
      });
    },

    // 删除单个
    delSingle(record) {
      let this_ = this;
      Modal.confirm({
        title: '删除提示',
        content: '确认删除此条吗？',
        okText: '删除',
        cancelText: '取消',
        onOk() {
          del({id: record.id}).then(res => {
            if (res.status == 200) {
              this_.$message.success('删除成功');
              this_.getArticleList();
            }
          })
        },
        onCancel() {},
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('dict/cacheDict', {
      fileName: 'article',
      mutationsName: 'SET_ARTICLE'
    });

    console.log(this.$store.getters['dict/transDict']('article', 'category', 1));
    this.getArticleList();
  },
  computed: {
    articleList_params: function() {
      return {
        search: filterObj(this.search),
        offset: this.page.offset,
        limits: this.page.limits,
      }
    },
    del_data: function () {
      return {
        id: this.articleList.selectedRowKeys
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
  // ::v-deep .ant-table-body{
  //   max-height: calc(100vh - (60px + 30px + 20px + 40px + 42px + 64px + 42px)) !important;
  //   overflow-y: auto;
  // }
}

.paginationWarp {
  margin-top: 10px;
}
</style>