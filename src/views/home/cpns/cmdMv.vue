<template>
  <div id="cmdMv" v-if="cmdMvList.length">
    <HomeListTitle title="推荐MV" />
    <MvList :mvList="cmdMvList" :isSonger="cmdMvSonger" :isBlod="true" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import HomeListTitle from "./homeListTitle.vue";
import MvList from "@/components/mv-list/mvList.vue";
import { CommendMv } from "../types";
export default defineComponent({
  name: "cmdMv",
  props: {
    cmdMvList: {
      type: Array as PropType<CommendMv[]>,
      default: () => [],
    },
  },
  setup(props) {
    /* 获取每个歌的歌手 */
    const cmdMvSonger = computed(() =>
      props.cmdMvList.map((item: any) =>
        item.artists.map((item: any) => item.name).join("/")
      )
    );
    return {
      cmdMvSonger,
    };
  },
  components: {
    HomeListTitle,
    MvList,
  },
});
</script>

<style scoped></style>
