<template>
  <div id="headNav">
    <!-- 顶部切换导航 -->
    <div class="nav">
      <div class="nav-head">
        <!-- 新歌速递/新碟上架 -->
        <div
          :class="['nav-title', isHead == item && 'active']"
          v-for="item in navHead"
          :key="item"
          @click="navHeadClick(item)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "headNav",
  setup(props, { emit }) {
    const navHead = reactive(["新歌速递", "新碟上架"]);
    const isHead = ref("新歌速递");
    /* 导航点击切换颜色 */
    const navHeadClick = (item: string) => {
      isHead.value = item;
      emit("navChange", item);
    };
    return {
      isHead,
      navHead,
      navHeadClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.nav {
  text-align: center;
  margin-bottom: 30px;
}
.nav-head {
  display: inline-flex;
  font-size: 13px;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 1px solid #cd0101;
  box-sizing: content-box;
  overflow: hidden;
  border-radius: 16px;
}
.nav-title {
  cursor: pointer;
  line-height: 2rem;
  padding: 0px 25px;
  border-radius: 16px;
}
.active {
  color: #fff;
  font-weight: bold;
  background-color: #cd0101;
}
</style>
