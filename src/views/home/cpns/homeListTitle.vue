<template>
  <div id="homeListTitle">
    <div class="commend-title" @click="titleClick(routerPath)">
      <span>{{ title }}</span>
      <el-icon :size="15">
        <ArrowRight />
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "homeListTitle",
  props: {
    title: {
      type: String,
      default: "",
    },
    routerPath: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();
    const titleClick = (routerPath: string) => {
      router.push(routerPath);
    };
    return {
      titleClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.commend-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 10px 0px;
}
</style>
