<template>
  <div id="AlbumDetail" v-if="route.params.id == albumDetail.detail?.album?.id">
    <!-- 头部详情区域 -->
    <ListDetailTop
      :detailTopInfo="albumDetail.detail?.album"
      detailType="专辑"
    />
    <!-- 专辑导航 -->
    <ListDetailNav
      :navList="navList"
      :commentTotal="albumDetail.comments?.total"
      @titleClick="titleClick"
    />
    <!-- 歌曲列表 -->
    <ListDetail :musicList="albumDetail.detail?.songs" v-if="isShow == 0" />
    <!-- 评论页面 -->
    <Comment
      :commentInfo="albumDetail.comments"
      :pageInfo="alumCmtResData"
      v-else-if="isShow == 1"
      @changeCurrent="changeCurrent"
    />
    <!-- 歌手描述 -->
    <AlbumDesc
      :description="albumDetail.detail?.album.description"
      v-else-if="isShow == 2"
    />
    <Loading v-else />
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
import AlbumDesc from "./cpns/albumDesc.vue";
export default defineComponent({
  name: "AlbumDetail",
  setup() {
    const route = useRoute();
    const state: any = useState("Detail", ["albumDetail"]);
    const store = useStore();
    const isShow = ref(0);
    /* 歌单评论请求数据 */
    const alumCmtResData = reactive({
      id: route.params.id,
      limit: 30,
      offset: 0,
    });
    /* 因配合push过来的跳转,此处用watchEffect处理 */
    // store.dispatch("Detail/getAlbumDetail", route.params.id);
    // store.dispatch("Detail/getAlbumCmt", alumCmtResData);
    /* 导航列表 */
    const navList = reactive(["歌曲列表", "评论", "专辑详情"]);
    /* 导航点击事件 */
    const titleClick = (index: number) => {
      isShow.value = index;
    };
    /* 评论页数改变事件 */
    const changeCurrent = (page: number) => {
      state.commentList.value.comments.length = 0;
      alumCmtResData.offset = (page - 1) * alumCmtResData.limit;
      store.dispatch("Detail/getAlbumCmt", alumCmtResData);
    };
    /* 当路由id变化则重新请求数据 */
    watch(
      () => route.params.id,
      () => {
        if (route.path.indexOf("/main/albumdetail") !== -1) {
          store.dispatch("Detail/getAlbumDetail", route.params.id);
          store.dispatch("Detail/getAlbumCmt", alumCmtResData);
        }
      },{
        immediate:true,
      }
    );
    return {
      ...state,
      isShow,
      navList,
      route,
      alumCmtResData,
      titleClick,
      changeCurrent,
    };
  },
  components: {
    ListDetailTop,
    ListDetail,
    ListDetailNav,
    Comment,
    Loading,
    AlbumDesc,
  },
});
</script>

<style scoped></style>
