<template>
  <div id="Alone">
    <!-- 独家放送列表 -->
    <MvList
      v-if="aloneList.length > 5"
      :mvList="aloneList"
      :isUnderLine="true"
    />
    <!-- 加载组件 -->
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
import MvList from "@/components/mv-list/mvList.vue";
import Loading from "@/baseui/loading/loading.vue";
export default defineComponent({
  name: "Alone",
  setup() {
    const store = useStore();
    const state: any = useState("Home", ["aloneList"]);
    /* 请求数据 */
    const aloneResInfo = reactive({
      limit: 100,
      offset: 0,
    });
    store.dispatch("Home/getAloneList", aloneResInfo);
    return {
      ...state,
    };
  },
  components: {
    MvList,
    Loading,
  },
});
</script>

<style scoped></style>
