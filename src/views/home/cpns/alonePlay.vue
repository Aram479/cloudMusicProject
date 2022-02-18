<template>
  <div id="alonePlay" v-if="aloneList.length">
    <!-- 独家放送 -->
    <HomeListTitle title="独家放送" routerPath="/main/alone" />
    <!-- 独家放送列表区域 -->
    <MvList :mvList="aloneList" :isUnderLine="true" v-show="aloneList.length <=4" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IAlonePlay } from "../types";
import HomeListTitle from "./homeListTitle.vue";
import MvList from "@/components/mv-list/mvList.vue";
export default defineComponent({
  name: "alonePlay",
  props: {
    aloneList: {
      type: Array as PropType<IAlonePlay[]>,
      default: () => [],
    },
  },
  setup() {
    return {};
  },
  components: {
    HomeListTitle,
    MvList,
  },
});
</script>

<style scoped></style>
