<template>
  <div id="listDetailNav">
    <!-- 歌单导航 -->
    <div class="songsNav">
      <div class="Nav-left">
        <span
          v-for="(item, index) in navList"
          :key="item"
          :class="{ active: isActive == index }"
          :style="{ marginRight: navMarginR }"
          @click="titleClick(index)"
        >
          <span>{{ item }}</span>
          <span v-show="item == '评论'">({{ commentTotal }})</span>
        </span>
      </div>
      <!-- 搜索框 -->
      <!-- <div class="Nav-right" v-show="this.isActive == 0">
        <el-input
          size="mini"
          placeholder="搜索歌单音乐"
          prefix-icon="el-icon-search"
          v-model="searchText"
          @input="searchMusic"
          clearable
        ></el-input>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "listDetailNav",
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
    commentTotal: {
      type: Number,
      default: 0,
    },
    navColor: {
      type: String,
      default: "red",
    },
    navMarginR: {
      type: String,
      default: "20px",
    },
  },
  setup(props, { emit }) {
    const isActive = ref(0);
    /* 导航点击事件 */
    const titleClick = (index: number) => {
      if (isActive.value !== index) {
        emit("titleClick", index);
      }
      isActive.value = index;
    };
    return {
      isActive,
      titleClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.songsNav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 46px;
  margin-top: 20px;
  border-bottom: 1px solid #f2f2f2;
}
.Nav-left > * {
  margin-right: 20px;
  padding: 12px 0px;
  font-size: 15px;
  color: #7f7f7f;
}
.Nav-left > *:hover {
  cursor: pointer;
  color: black;
}
.active {
  border-bottom: 2px solid red;
  color: red;
  font-weight: 700;
}
.active:hover {
  color: red;
}
</style>
