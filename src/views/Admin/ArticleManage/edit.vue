<template>
  <div id="ArticleManageEdit">
    <div class="head">
      <a-button type="link" @click="back"><icon-arrow-left theme="outline" :strokeWidth="3"/></a-button>
      {{(type === 'edit') ? '编辑文章' : '添加文章'}}
    </div>
    <load :loading="dataLoading" :height="`80vh`" v-if="dataLoading"/>
    <div class="editWarp" v-else>
      <a-form :layout="`horizontal`">
        <a-row :gutter="20">
          <a-col :span="16">
            <a-form-item>
              <a-input v-model="articleDetail.title" placeholder="请输入文章简介" />
            </a-form-item>

            <a-form-item>
              <a-textarea
                v-model="articleDetail.content"
                placeholder="Autosize height with minimum and maximum number of lines"
                :auto-size="{ minRows: 2, maxRows: 32 }"
              />
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <a-form-item label="封面连接"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-input v-model="articleDetail.cover" placeholder="请输入封面URL" />
            </a-form-item>

            <a-form-item label="封面预览"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <img class="coverPreview" :src="articleDetail.cover" style="width: 100%;" />
            </a-form-item>

            <a-form-item label="文章分类"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-select style="width: 100%" placeholder="文章分类" v-model="articleDetail.category">
                <a-select-option :value="option.key" v-for="option in dict.category" :key="option.key">{{option.value}}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="文章状态"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-select style="width: 100%" placeholder="文章状态" v-model="articleDetail.status">
                <a-select-option :value="option.key" v-for="option in dict.status" :key="option.key">{{option.value}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import load from "@/components/public/loading.vue";
import { Button, Modal, Form, Input, Row, Col, Select } from 'ant-design-vue';
import { detail } from "@/network/article.js";
import { dict } from "@/network/static.js";
Modal.install(Vue)

export default {
  name: "ArticleManageEdit",
  props: {},
  components: {
    load,
    [Button.name]: Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Row.name]: Row,
    [Col.name]: Col,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option
  },
  data() {
    return {
      dataLoading: true,
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      },
      dict: undefined,
      type: undefined,
      id: undefined,
      articleDetail: undefined,
    }
  },
  methods: {
    getRouteQuery() {
      this.type = this.$route.query.type;
      this.id = this.$route.query.id;
    },
    // 获取字典
    getDict() {
      dict("article").then(res => {
        this.dict = res;
      })
    },
    // 编辑时获取文章详情
    getDetail() {
      if (this.type === 'edit') {
        detail(this.articleDetail_params).then(res => {
          if (res.status === 200) {
            this.articleDetail = res.data;
          }
        }).finally(() => {
          this.dataLoading = false;
        })
      }
    },
    back() {
      let this_ = this;
      Modal.confirm({
        title: '保存提示',
        content: '确认返回吗？',
        okText: '返回',
        cancelText: '取消',
        onOk() {
          this_.$router.go(-1);
        },
        onCancel() {},
      });
    },
  },
  mounted() {
    this.getRouteQuery();
    this.getDict();
    this.getDetail();
  },
  computed: {
    articleDetail_params: function() {
      return {
        a_id: this.id
      }
    },
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#ArticleManageEdit{
  margin: 15px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;

  height: calc(100vh - ($navBar-height + 30px));
  overflow-y: auto;
}

.head {
  display: flex;
  align-items: center;

  font-size: 16px;
}

.editWarp {
  padding: 10px;

  .coverPreview {
    border-radius: 5px;
  }
}
</style>