<template>
  <div id="comments" :class="{ mobile:  $store.state.style.screenWidth < 1100 , desktop: $store.state.style.screenWidth >= 1100}">

    <div class="addOrReply">
      <div class="meta">
        <a-input v-model="newComment.userName" class="inline" placeholder="昵称" />
        <a-input v-model="newComment.email" class="inline" placeholder="Email（用于区分用户和确定头像）" />
        <a-input v-model="newComment.url" placeholder="你的网站URL" />
      </div>


      <div class="content">
        <a-textarea v-model="newComment.text" placeholder="输入评论内容，华为云提供内容审核服务" :rows="7" />
      </div>

      <div class="actions">
        <a-button v-if="parentObj" @click="cancelReply">取消回复{{parentObj.userName}}</a-button>
        <a-button type="primary" @click="addComment">发布</a-button>
        
      </div>
    </div>

    <!-- <a-divider>With Text</a-divider> -->

    <template v-if="comments">
      <div class="commentItem" v-for="item in comments" :key="item.id">
        <div class="avatar">
          <img :src="avatarByemail(item.email)">
        </div>
        <div class="text">
          <div class="meta">
            <!-- <span>{{item.id}}</span> -->
            <span class="name">{{item.userName}}</span>
            <span class="at" v-if="item.parentId !== 0">@</span>
            <span class="reply" v-if="item.parentId !== 0">{{getParent(item.parentId).userName}}</span>
            <span class="time">{{$dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}}</span>
          </div>
          <div class="content">
            {{item.text}}
            <div class="replyBtn" @click="reply(item)">
              <icon-back theme="filled" size="14" fill="#9b9b9b" :strokeWidth="3"/>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      暂无评论
    </template>
  </div>
</template>

<script>
import md5 from 'md5';
import { Input, Button, Divider } from 'ant-design-vue';
import { add } from "@/network/comment.js";

export default {
  name: "comments",
  props: {
    comments: {
      type: Array,
      default: undefined
    }
  },
  components: {
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Button.name]: Button,
    [Divider.name]: Divider
  },
  data() {
    return {
      newComment: {
        aId: this.$route.query.id,
        parentId: this.parentObj ? this.parentObj.id : 0,
        userName: undefined,
        email: undefined,
        url: undefined,
        agent: navigator.userAgent,
        text: undefined,
      },
      parentObj: undefined
    }
  },
  methods: {
    // 通过email获取头像
    avatarByemail(email) {
      if (email) {
        let hash = md5(email.replace(/^\s*|\s*$/g,"").toLowerCase());
        return `https://cravatar.cn/avatar/${hash}?s=60`
      }else{
        return `https://cravatar.cn/avatar/404`
      }
    },

    // 获取父级评论对象
    getParent(id) {
      return this.comments.find(item => item.id == id);
    },

    // 点击回复
    reply(item) {
      this.parentObj = item;
    },

    // 取消回复
    cancelReply() {
      this.parentObj = undefined;
    },

    // 发布评论
    addComment() {
      add(this.newComment).then(res => {
        if (res.status === 200) {
          this.$message.success('评论成功');
          this.newComment.text = undefined;
          this.parentObj = undefined
          
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  mounted() {},
  computed: {
  },
  beforeDestroy() {
    this.$EventBus.$off("commentReply");
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#comments{
  width: 100%;
}

.mobile {
  .addOrReply .meta {
    align-items: center;
    flex-direction: column;
    input:not(:last-of-type) {
      margin-bottom: 10px;
    }
  }
}

.desktop {
  .addOrReply .meta {
    align-items: center;
    justify-content: space-between;
    input {
      width: calc(100% / 3 - 5px);
    }
  }
}

.addOrReply {
  margin-bottom: 20px;

  .meta {
    display: flex;
    margin-bottom: 10px;
  }

  .content {
    margin-bottom: 10px;
  }

  .actions {
    text-align: start;
    ::v-deep .ant-btn:not(:last-of-type) {
      margin-right: 10px;
    }
  }
}

.commentItem {
  width: 100%;

  // padding: 10px;
  display: flex;

  .avatar {
    margin-right: 10px;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }

  .text{
    max-width: calc(100% - 70px);

    .meta{
      color: #8c8c8c;
      font-size: 13px;
      line-height: 13px;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      .time{
        margin-left: 10px;
      }

      .name {
        background-color: #f0f0f0;
        padding: 4px;
        border-radius: 5px;
      }

      .at{
        margin: 0 5px;
      }

      .reply {
        background-color: #f0f0f0;
        padding: 4px;
        border-radius: 5px;
      }
    }

    .content {
      min-height: calc(60px - 25px);
      padding-right: 26px;
      position: relative;

      .replyBtn {
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: 6px;
      }
    }
  }
}

.commentItem:not(:last-of-type) {
  margin-bottom: 30px;
}
</style>