<template>
  <div id="Djprogram" v-if="djprogramList.length">
    <HomeListTitle title="主播电台" />
    <MusicList :musicList="djprogramList" itemHeight="88px" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import HomeListTitle from "./homeListTitle.vue";
import MusicList from "@/components/music-list/musicList.vue";
import { DjPrgms } from "../types";
export default defineComponent({
  name: "Djprogram",
  props: {
    djprogramList: {
      type: Array as PropType<DjPrgms[]>,
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

<style scoped></style>
