<template>
  <!-- 骨架屏 -->
  <Skeleton v-if="!isShow" />

  <div id="RankList" v-else>
    <!-- 官方榜 -->
    <RankOfficial :officialList="officialList" />
    <!-- 曲风榜 -->
    <div class="style">
      <div class="style-title nav-title">曲风榜</div>
      <PlayList :playList="styleList" />
    </div>
    <!-- 全球榜 -->
    <div class="global">
      <div class="global-title nav-title">全球榜</div>
      <PlayList :playList="globalList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { isShowApi } from "@/utils/isAllApi";
import PlayList from "@/components/play-list/playList.vue";
import RankOfficial from "./cpns/rankOfficial.vue";
import Skeleton from './cpns/skeleton.vue'
export default defineComponent({
  name: "RankList",
  setup() {
    const state: any = useState("RankList", [
      "rankList",
      "officialList",
      "styleList",
      "globalList",
    ]);
    const store = useStore();
    store.dispatch("RankList/getPlayListTag");
    //当前页面所有请求完毕则显示页面内容
    const isShow = isShowApi(state);
    return {
      ...state,
      isShow,
    };
  },
  components: {
    PlayList,
    RankOfficial,
    Skeleton
  },
});
</script>

<style scoped>
.nav-title {
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
}

.update {
  position: absolute;
  top: 5px;
  right: 12px;
  font-size: 12px;
  color: #acacac;
}
</style>
