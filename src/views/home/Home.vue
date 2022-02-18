<template>
  <!-- 骨架屏 -->
  <Skeleton v-if="!isShow" />
  <div id="home" v-else>
    <!-- 轮播图 -->
    <Swiper :swiperList="swiperList" />
    <!-- 推荐歌单 -->
    <CmdPlayList :commendList="commendList" />
    <!-- 独家放送 -->
    <AlonePlay :aloneList="aloneList" />
    <!-- 最新音乐 -->
    <NewMusic :newMusicList="newMusicList" />
    <!-- 推荐mv -->
    <CmdMv :cmdMvList="commendMvList" />
    <!-- 主播电台 -->
    <DjprogramVue :djprogramList="djprogramList" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
import { isShowApi } from "@/utils/isAllApi";
import Swiper from "@/baseui/swiper/swiper.vue";
import CmdPlayList from "./cpns/cmdPlayList.vue";
import AlonePlay from "./cpns/alonePlay.vue";
import NewMusic from "./cpns/newMusic.vue";
import CmdMv from "./cpns/cmdMv.vue";
import DjprogramVue from "./cpns/Djprogram.vue";
import Skeleton from "./cpns/skeleton.vue";
export default defineComponent({
  name: "Home",
  setup() {
    const store = useStore();
    const state: any = useState("Home", [
      "swiperList",
      "commendList",
      "aloneList",
      "newMusicList",
      "commendMvList",
      "djprogramList",
    ]);
    /* vuex获取接口数据 */
    store.dispatch("Home/getSwiperList");
    store.dispatch("Home/getCommendList");
    store.dispatch("Home/getAloneList");
    store.dispatch("Home/getnewMusicList");
    store.dispatch("Home/getCmdMvList");
    store.dispatch("Home/getDjprogramList");
    //当前页面所有请求完毕则显示页面内容
    const isShow = isShowApi(state);
    return {
      ...state,
      isShow,
    };
  },
  components: {
    Skeleton,
    Swiper,
    CmdPlayList,
    AlonePlay,
    NewMusic,
    CmdMv,
    DjprogramVue,
  },
});
</script>

<style scoped lang="scss">
#home > * {
  margin-bottom: 40px !important;
}
#home > *:last-child {
  margin-bottom: 0 !important;
}
.el-skeleton {
  margin: 50px 0px;
}
</style>
