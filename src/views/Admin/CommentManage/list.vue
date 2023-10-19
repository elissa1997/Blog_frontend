<template>
  <div id="CommentManageList">

    <div class="searchWarp">
      <a-form layout="inline">
        <a-form-item>
          <a-input v-model="search.text" placeholder="评论内容">
          </a-input>
        </a-form-item>
        <a-form-item v-if="$store.state.dict.article">
          <a-select style="width: 200px" placeholder="评论状态" v-model="search.status">
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
      <!-- <a-button type="primary" @click="add"><icon-write theme="outline" :strokeWidth="3"/> 撰写新文章 </a-button> -->
      <a-button type="danger" :disabled="commentList.selectedRowKeys.length === 0" @click="delMultiple"><icon-delete theme="outline" :strokeWidth="3"/> 删除 </a-button>
    </div>

    <div class="tableWarp">
      <a-table 
        rowKey="id"
        :row-selection="{ selectedRowKeys: commentList.selectedRowKeys, onChange: tableSelectChange }"
        :pagination="false"
        :columns="commentList.columns"
        :data-source="commentList.data"
        :scroll="{y:'calc(100vh - (60px + 30px + 20px + 40px + 42px + 64px + 42px))', x:1600}"
      >
        <span slot="article" slot-scope="article">{{(article)? article.title : '无'}}</span>
        <span slot="agent" slot-scope="agent">{{parseUa(agent).os.name}} {{parseUa(agent).os.version}} {{parseUa(agent).browser.name}} {{parseUa(agent).browser.major}}</span>
        <span slot="url" slot-scope="url"><a :href="url" target="_blank" v-if="url"><icon-link-two theme="outline" size="18" :strokeWidth="3"/></a></span>
        <span slot="createdAt" slot-scope="createdAt">{{$dayjs(createdAt).format('YYYY-MM-DD HH:mm')}}</span>
        <span v-if="$store.state.dict.article" slot="status" slot-scope="status">{{$store.getters['dict/transDict']('article', 'status', status)}}</span>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="changeStatus(record)">
            <template v-if="record.status == 1"><icon-preview-close-one theme="outline" :strokeWidth="3"/> 隐藏</template>
            <template v-if="record.status == 0"><icon-preview-open theme="outline" :strokeWidth="3"/> 显示</template>
          </a-button>
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
import uaParser from 'ua-parser-js';
import { Button, Table, Pagination, Form, Input, Select, Divider, Modal } from 'ant-design-vue';
import { list, update, del } from "@/network/comment.js";
import { resetObj, filterObj } from "@/util/tool.js";
Modal.install(Vue);

export default {
  name: "CommentManageList",
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
      commentList: {
        selectedRowKeys: [],
        columns: [
          { title: 'ID', dataIndex: 'id', width: 80, fixed: 'left'},
          { title: '父ID', dataIndex: 'parentId', width: 80},
          { title: '内容', dataIndex: 'text', width: 300},
          { title: '所属文章', dataIndex: 'article', scopedSlots: { customRender: 'article' }, width: 200},
          { title: '用户名', dataIndex: 'userName', width: 100, align: 'center'},
          { title: '邮箱', dataIndex: 'email', width: 200, align: 'center'},
          { title: '网站', dataIndex: 'url', scopedSlots: { customRender: 'url' }, width: 80, align: 'center'},
          { title: 'UA', dataIndex: 'agent', scopedSlots: { customRender: 'agent' }, width: 190, align: 'center'},
          { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' }, width: 100, align: 'center'},
          { title: '创建时间', dataIndex: 'createdAt', scopedSlots: { customRender: 'createdAt' }, width: 160},
          { title: '操作', scopedSlots: { customRender: 'action' }, width: 220, align: 'center', fixed: 'right'},
        ],
        data: undefined
      },
      search: {
        text: undefined,
      }
    }
  },
  methods: {
    
    // 获取评论列表
    getCommentList() {
      list(this.commentList_params).then(res => {
        if (res.status === 200) {
          this.page.total = res.data.count;
          this.commentList.data = res.data.rows;
        }
      })
    },

    // 解析UA
    parseUa(agent) {
      const ua = uaParser(agent);
      return ua;
    },

    // 表格行选择
    tableSelectChange(keys) {
      this.commentList.selectedRowKeys = keys;
      console.log(keys);
    },

    // 页码改变
    offsetChange(page, pageSize) {
      this.page.offset = page;
      this.page.limits = pageSize;
      this.getCommentList();
    },

    // 页面条数改变
    limitsChange(page, pageSize) {
      this.page.offset = 1;
      this.page.limits = pageSize;
      this.getCommentList();
    },

    searchApply() {
      this.page.offset = 1;
      this.page.limits = 10;
      this.getCommentList();
    },

    // 搜索重置
    searchRest() {
      resetObj(this.search);
      this.page.offset = 1;
      this.page.limits = 10;
      this.getCommentList();
    },

    // 点击撰写新文章
    // add() {
    //   this.$router.push({
    //     path: "/admin/articleedit",
    //     query: {
    //       type: "add"
    //     }
    //   })
    // },

    // 改变状态
    changeStatus(record) {
      let update_data = {
        id: record.id,
        updateData: {
          status: !record.status
        }
      }
      update(update_data).then(res => {
        if (res.status == 200) {
          this.$message.success('修改成功');
          this.getCommentList();
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
              this_.getCommentList();
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
              this_.getCommentList();
            }
          })
        },
        onCancel() {},
      });
    }
  },
  async mounted() {
    await this.$store.dispatch('dict/cacheDict', {
      fileName: 'dict_article',
      mutationsName: 'SET_ARTICLE'
    });
    this.getCommentList();
  },
  computed: {
    commentList_params: function() {
      return {
        search: filterObj(this.search),
        offset: this.page.offset,
        limits: this.page.limits,
      }
    },

    del_data: function () {
      return {
        id: this.commentList.selectedRowKeys
      }
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#CommentManageList{
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