<template>
  <div id="comments">

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
            <span class="reply" v-if="item.parentId !== 0">{{item.parentName}}</span>
            <span class="time">{{$dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}}</span>
          </div>
          <div class="content">
            {{item.text}}
            <div class="replyBtn" @click="reply(item)">
              <icon-back theme="filled" size="14" fill="#9b9b9b" :strokeWidth="3"/>
            </div>
          </div>
          <template v-if="Array.isArray(item.reply)">
            <comments :comments="item.reply"/>
          </template>
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

export default {
  name: "comments",
  props: {
    comments: {
      type: Array,
      default: undefined
    }
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    avatarByemail(email) {
      let hash = md5(email.replace(/^\s*|\s*$/g,"").toLowerCase());
      return `https://cravatar.cn/avatar/${hash}?s=60`
    },
    reply(item) {
      console.log(item);
      this.$emit('reply', item);
    }
  },
  mounted() {},
  computed: {
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
#comments{
  width: 100%;
  margin-top: 10px;
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