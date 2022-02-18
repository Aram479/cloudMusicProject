<template>
  <div id="CommentItem">
    <div class="comments" v-if="Object.keys(commentItem).length !== 0">
      <div class="img"><img :src="commentItem.user.avatarUrl" /></div>
      <div class="title">
        <div class="all-title">
          <div>
            <span class="title-name">{{ commentItem.user.nickname }}：</span>
            <span class="title-comment">{{ commentItem.content }}</span>
          </div>

          <div class="back-title" v-if="commentItem.beReplied.length">
            <span class="title-backtname"
              >{{ commentItem.beReplied[0].user.nickname}}：</span
            >
            {{ commentItem.beReplied[0].content }}
          </div>
        </div>
        <span class="time">{{ $filters.formatTime(commentItem.time) }}</span>
      </div>
      <div class="like">
        <i class="iconfont">&#xe622;</i>
        <span>{{ commentItem.likedCount }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
export default defineComponent({
  name: "CommentItem",
  props: {
    commentItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const isLike = ref(false);
    const likeClick = () => {
      isLike.value = !isLike.value;
    };
    return {
      likeClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.comments {
  display: flex;
  align-items: top;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid rgb(233, 233, 233);
  font-size: 13px;
  text-align: center;
}

.img {
  flex: 5%;
  width: 42px;
  height: 42px;
}
.img img {
  border-radius: 21px;
}
.title {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  flex: 90%;
  text-align: left;
  margin-left: 5px;
}
.title-name {
  color: rgb(255, 118, 118);
}
.time {
  color: #d6d6d6;
}
.all-title {
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 5px;
}
.all-title > * {
  margin-bottom: 10px;
}
.back-title {
  display: flex;
  align-items: center;
  background-color: rgb(228, 228, 228);
  border-radius: 6px;
  padding: 10px 5px;
}
.title-backtname {
  color: rgb(253, 188, 128);
  font-size: 10px !important;
}

.like {
  display: flex;
  align-items: flex-end;
  flex: 5%;
  color: #c0c0c0;
}
.like .iconfont {
  font-size: 10px;
  margin-right: 5px;
  margin-bottom: 1px;
}
.like:hover {
  cursor: pointer;
  color: rgb(255, 70, 70);
}
.img img {
  height: 100%;
}
</style>
