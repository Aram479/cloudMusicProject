<template>
  <div id="ArtistDetail" v-if="route.params.id == artistDetail?.artist?.id">
    <!-- 歌手头部详情 -->
    <ListDetailTop :detailTopInfo="artistDetail.artist" detailType="歌手" />
    <!-- 导航 -->
    <ListDetailNav
      :navList="navList"
      @titleClick="titleClick"
      style="margin-bottom: 20px"
    />
    <!-- 歌手热门50首 -->
    <ArtistListDetail v-if="isShow == 0" :albumList="artistDetail.album" />
    <!-- 歌手mv -->
    <VideoList
      v-else-if="isShow == 1"
      :videoList="artistDetail.mv"
      :isShowLoading="false"
      :isScroll="false"
      :isBlod="true"
    />
    <!-- 歌手详情描述 -->
    <ArtistSyno v-else-if="isShow == 2" :artistDesc="artistDetail.desc" />
    <Loading v-else></Loading>
  </div>
  <Loading v-else />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import Loading from "@/baseui/loading/loading.vue";
import ListDetailTop from "@/components/list-detail/listDetailTop.vue";
import ListDetailNav from "@/components/list-detail/listDetailNav.vue";
import ArtistListDetail from "@/components/list-detail/artistListDetail.vue";
import VideoList from "@/components/video-list/videoList.vue";
import ArtistSyno from "./cpns/artistSyno.vue";
export default defineComponent({
  name: "ArtistDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    const state: any = useState("Detail", ["artistDetail"]);
    /* 导航列表 */
    const navList = reactive(["热门50首", "MV", "歌手详情"]);
    const isShow = ref(0);
    // store.dispatch("Detail/getArtistDetail", route.params.id);
    // store.dispatch("Detail/getArtistAlbum", route.params.id);
    // store.dispatch("Detail/getArtistMv", route.params.id);
    // store.dispatch("Detail/getArtistDesc", route.params.id);
    /* 标题点击事件 */
    const titleClick = (index: number) => {
      isShow.value = index;
    };
    /* 当路由id变化则重新请求数据 */
    watch(
      () => route.params.id,
      () => {
        if (route.path.indexOf("/main/artistdetail") !== -1) {
          store.dispatch("Detail/getArtistDetail", route.params.id);
          store.dispatch("Detail/getArtistAlbum", route.params.id);
          store.dispatch("Detail/getArtistMv", route.params.id);
          store.dispatch("Detail/getArtistDesc", route.params.id);
        }
      },{
        immediate:true,
      }
    );
    return {
      isShow,
      route,
      ...state,
      navList,
      titleClick,
    };
  },
  components: {
    Loading,
    ListDetailTop,
    ListDetailNav,
    ArtistListDetail,
    VideoList,
    ArtistSyno,
  },
});
</script>

<style scoped></style>
