<template>
  <div id="cmdPlayList" v-if="commendList.length">
    <!-- 推荐歌单 -->
    <HomeListTitle title="推荐歌单" routerPath="/main/playlist" />
    <!-- 歌单列表区域 -->
    <PlayList :playList="commendList" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IcmdPlay } from "../types";
import HomeListTitle from "./homeListTitle.vue";

import PlayList from "@/components/play-list/playList.vue";
export default defineComponent({
  name: "cmdPlayList",
  props: {
    commendList: {
      type: Array as PropType<IcmdPlay[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
  components: {
    HomeListTitle,
    PlayList,
  },
});
</script>

<style scoped></style>
