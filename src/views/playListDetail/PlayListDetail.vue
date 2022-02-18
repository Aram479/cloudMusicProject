<template>
  <div id="PlayListDetail" v-if="route.params.id == listDetail.id">
    <!-- 歌单头部详情区域 -->
    <ListDetailTop :detailTopInfo="listDetail" detailType="歌单" />
    <!-- 歌单导航 -->
    <ListDetailNav
      :navList="navList"
      :commentTotal="commentList.total"
      @titleClick="titleClick"
    />
    <!-- 歌曲列表 -->
    <ListDetail :musicList="listDetail.tracks" v-if="isShow == 0" />
    <!-- 评论页面 -->
    <Comment
      :commentInfo="commentList"
      v-else-if="isShow == 1"
      :pageInfo="listCmtResData"
      @changeCurrent="changeCurrent"
    />
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import ListDetailTop from "@/components/list-detail/listDetailTop.vue";
import ListDetail from "@/components/list-detail/listDetail.vue";
import Comment from "@/components/list-detail/Comment/Comment.vue";
import Loading from "@/baseui/loading/loading.vue";
import ListDetailNav from "@/components/list-detail/listDetailNav.vue";
import router from "@/router";
export default defineComponent({
  name: "PlayListDetail",
  emits: ["changeCurrent"],
  setup() {
    const route = useRoute();
    const store = useStore();
    const state: any = useState("Detail", ["listDetail", "commentList"]);
    const isShow = ref(0);
    let curtpage = ref(1);
    /* 导航列表 */
    const navList = reactive(["歌曲列表", "评论"]);
    /* 歌单详情请求数据 */
    const listResData = reactive({
      id: route.params.id,
      offset: 0,
    });

    /* 歌单评论请求数据 */
    const listCmtResData = reactive({
      id: route.params.id,
      limit: 30,
      offset: 0,
    });
    /* 此处处理转移至下面watchEffect */
    // store.dispatch("Detail/getPlayListDetai", route.params.id);
    // store.dispatch("Detail/getListAllMusic", listResData);
    // store.dispatch("Detail/getListCommentUrl", listCmtResData);
    /* 导航点击事件 */
    const titleClick = (index: number) => {
      isShow.value = index;
    };
    /* 评论页数改变事件 */
    const changeCurrent = (page: number) => {
      state.commentList.value.comments.length = 0;
      listCmtResData.offset = (page - 1) * listCmtResData.limit;
      store.dispatch("Detail/getListCommentUrl", listCmtResData);
    };
    /* 当路由id变化则重新请求数据 */
    watch(
      () => route.params.id,
      () => {
        if (route.path.indexOf("/main/playlistdetail") !== -1) {
          store.dispatch("Detail/getPlayListDetai", route.params.id);
          store.dispatch("Detail/getListAllMusic", listResData);
          store.dispatch("Detail/getListCommentUrl", listCmtResData);
        }
      },
      {
        immediate: true,
      }
    );
    return {
      isShow,
      ...state,
      route,
      listResData,
      listCmtResData,
      navList,
      curtpage,
      titleClick,
      changeCurrent,
    };
  },
  components: {
    ListDetailTop,
    ListDetail,
    Comment,
    Loading,
    ListDetailNav,
  },
});
</script>

<style scoped>
.songsNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  margin: 20px 0px;
  border-bottom: 1px solid #f2f2f2;
}
.Nav-left > * {
  margin-left: 20px;
  padding: 12px 0px;
  font-size: 15px;
  color: #7f7f7f;
}
.Nav-left > *:hover {
  cursor: pointer;
  color: black;
}
.active {
  border-bottom: 2px solid red;
  color: red;
  font-weight: 700;
}
.active:hover {
  color: red;
}
</style>
