<template>
  <div id="newMusic" v-if="newMusicList.length">
    <!-- 最新音乐 -->
    <HomeListTitle title="最新音乐" routerPath="/main/latestMusic" />
    <MusicList :musicList="newMusicList" itemHeight="58px" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { INewMusic } from "../types";
import HomeListTitle from "./homeListTitle.vue";
import MusicList from "@/components/music-list/musicList.vue";
export default defineComponent({
  name: "newMusic",
  props: {
    newMusicList: {
      type: Array as PropType<INewMusic[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
  components: {
    HomeListTitle,
    MusicList,
  },
});
</script>

<style scoped lang="scss"></style>
