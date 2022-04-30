<template>
  <div id="replyComment" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">
    <div class="warp">

      <div class="meta">
        <a-input v-model="comment.userName" class="inline" placeholder="昵称" />
        <a-input v-model="comment.email" class="inline" placeholder="Email（用于区分用户和确定头像）" />
        <a-input v-model="comment.url" placeholder="你的网站URL" />
      </div>

      <div class="content">
        <a-textarea v-model="comment.text" placeholder="输入评论内容，华为云提供内容审核服务" :rows="7" />
      </div>

      <div class="actions">
        <a-button v-if="parentObj" @click="cancelReply">取消回复{{parentObj.userName}}</a-button>
        <a-button type="primary" @click="addComment">发布</a-button>
        
      </div>

      <!-- {{parentObj}} -->
      {{comment.ua}}

    </div>
    <!-- <a-input placeholder="昵称" /> -->
  </div>
</template>

<script>
import { Input, Button } from 'ant-design-vue';
import { add } from "@/network/comment.js";

export default {
  name: "replyComment",
  props: {
    parentObj: {
      type: Object,
      default: undefined
    }
  },
  components: {
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button,
  },
  data() {
    return {
      comment: {
        aId: this.$route.query.id,
        parentId: this.parentObj ? this.parentObj.id : 0,
        userName: undefined,
        email: undefined,
        url: undefined,
        agent: navigator.userAgent,
        text: undefined,
      }
    }
  },
  methods: {
    // 取消回复
    cancelReply() {
      this.$emit('update:parentObj', undefined);
    },

    // 增加评论
    addComment() {
      add(this.comment).then(res => {
        if (res.status === 200) {
          this.$message.success('评论成功');
          this.comment.text = undefined;
          this.$emit('update:parentObj', undefined);
          this.$emit('addCommentSuccess');
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  mounted() {},
  watch: {}
}
</script>
<style lang="scss" scoped>
#replyComment{}

.warp {
  .actions{
    margin-top: 10px;
    text-align: center;

    ::v-deep .ant-btn:not(:last-of-type) {
      margin-right: 10px;
    }
  }
}

.mobile{
  .warp{

    .meta{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      ::v-deep .ant-input:nth-of-type(2) {
        margin: 10px 0px;
      }
    }
  }
}

.desktop{
  
  .warp{

    .meta{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      
      ::v-deep .ant-input:nth-of-type(2) {
        margin: 0 10px;
      }
    }
  }
}
</style>