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
              <a-input v-model="articleDetail.title" placeholder="请输入文章标题" />
            </a-form-item>

            <a-form-item style="margin-bottom: 0px">
              <v-md-editor v-model="articleDetail.content" class="edit"></v-md-editor>
            </a-form-item>
          </a-col>

          <a-col :span="8">
            <!-- <a-form-item label="预览文章"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-switch v-model="preview" />
            </a-form-item> -->

            <a-form-item label="文章作者"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-input v-model="articleDetail.cover" placeholder="请输入文章作者" />
            </a-form-item>

            <a-form-item label="封面连接"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <a-input v-model="articleDetail.cover" placeholder="请输入封面URL" />
            </a-form-item>

            <a-form-item label="封面预览"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol">
              <img class="coverPreview" :src="articleDetail.cover" style="width: 100%;"/>
            </a-form-item>

            <a-form-item label="文章分类"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol" v-if="dict">
              <a-select style="width: 100%" placeholder="文章分类" v-model="articleDetail.category">
                <a-select-option :value="option.key" v-for="option in dict.category" :key="option.key">{{option.value}}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="文章状态"  :label-col="layout.labelCol" :wrapper-col="layout.wrapperCol" v-if="dict">
              <a-select style="width: 100%" placeholder="文章状态" v-model="articleDetail.status">
                <a-select-option :value="option.key" v-for="option in dict.status" :key="option.key">{{option.value}}</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :label-col="layout.labelCol" :wrapper-col="{ span: 20, offset: 4 }">
              <a-button type="primary" @click="save">保存</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import load from "@/components/public/loading.vue";
import { Button, Modal, Form, Input, Row, Col, Select, Switch } from 'ant-design-vue';
import { detail, add, update } from "@/network/article.js";
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
    [Select.Option.name]: Select.Option,
    [Switch.name]: Switch,
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
      }else if (this.type === 'add') {
        this.articleDetail = {
          title: undefined,
          content: undefined,
          cover: undefined,
          category: undefined,
          status: undefined,
        }
        setTimeout(() => {
          this.dataLoading = false;
        }, 200);
      }
    },
    // 保存文章
    save() {
      // this.articleDetail.content = this.articleDetail.content.replace(/\n/g, "<br>");
      if (this.type === 'edit') {

        let update_data = {
          id: this.id,
          updateData: this.save_data
        }
        update(update_data).then(res => {
          if (res.status === 200) {
            this.$message.success('修改文章成功');
            this.$router.go(-1);
          }else{
            this.$message.error('修改文章失败，请重试');
          }
        })


      }else if (this.type === 'add') {
        add(this.save_data).then(res => {
          if (res.status === 200) {
            this.$message.success('撰写新文章成功');
            this.$router.go(-1);
          }else{
            this.$message.error('撰写新文章失败，请重试');
          }
        })
      }
    },

    // 返回列表
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
  created() {
    VueMarkdownEditor.use(vuepressTheme, {
      Prism,
    });
    VueMarkdownEditor.use(createKatexPlugin());
    Vue.use(VueMarkdownEditor);
  },
  computed: {
    articleDetail_params: function() {
      return {
        a_id: this.id
      }
    },

    save_data() {
      delete this.articleDetail.comments
      this.articleDetail.updatedAt = this.$dayjs().toDate();
      return this.articleDetail
    }
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
  
  .edit {
    height: calc(100vh - (60px + 30px + 20px + 32px + 20px + 40px + 24px));
    z-index: 1;
  }

  .coverPreview {
    border-radius: 5px;
    max-height: 260px;
    object-fit: cover;
    object-position: center;
  }
}
</style>