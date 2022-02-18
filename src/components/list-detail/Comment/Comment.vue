<template>
  <div id="Comment" v-if="commentInfo.comments?.length">
    <div class="banner-title" v-if="commentInfo.hotComments">
      热门评论({{ commentInfo.hotComments.length }})
    </div>
    <CommentItem
      v-for="(hot, index1) in commentInfo.hotComments"
      :commentItem="hot"
      :key="index1"
    ></CommentItem>
    <div class="banner-title">最新评论({{ commentInfo.total }})</div>
    <CommentItem
      v-for="(New, index2) in commentInfo.comments"
      :commentItem="New"
      :key="index2"
    ></CommentItem>
  </div>
  <div class="no-comment" v-else-if="commentInfo.total == 0">暂无评论数据~</div>
  <Loading v-else />
  <!-- 分页器 -->
  <Pagination
    v-if="pageInfo.limit < commentInfo.total"
    :pageInfo="pageInfo"
    :total="commentInfo.total"
    :curtPage="curtpage"
    @changeCurrent="changeCurrent"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CommentItem from "./CommentItem.vue";
import Loading from "@/baseui/loading/loading.vue";
import Pagination from "@/baseui/pagination/pagination.vue";
export default defineComponent({
  name: "Comment",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    pageInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["changeCurrent"],
  setup(props, { emit }) {
    let curtpage = ref(1);
    const changeCurrent = (page: number) => {
      curtpage.value = page;
      emit("changeCurrent", page);
    };
    return {
      curtpage,
      changeCurrent,
    };
  },
  components: {
    CommentItem,
    Loading,
    Pagination,
  },
});
</script>

<style scoped>
.banner-title {
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0px;
  color: rgb(83, 83, 83);
}
.no-comment {
  position: relative;
  color: #666;
  text-align: center;
  top: 70px;
}
</style>
