<template>
  <div id="SSheet">
    <div class="SSheet-box">
      <!-- 歌单item项 -->
      <div
        class="Sheet-item"
        v-for="item in sheetList"
        :key="item.id"
        @click="sheetClick(item.id)"
      >
        <div class="Sheet-item-left">
          <!-- 图片 -->
          <el-image :src="item.coverImgUrl">
            <template #placeholder>
              <img src="@/assets/img/no-img.bb9c4fe3.png" />
            </template>
          </el-image>
          <!-- 歌单名 -->
          <span
            class="sheet-name linelittle"
            v-html="lightKeyword(item.name, inputValue)"
          ></span>
        </div>
        <!-- 曲目数 -->
        <span class="song-count">{{ item.trackCount }}首</span>
        <!-- 创建者 -->
        <span class="creator-name">{{ item.creator.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, ref } from "vue";
import { brightenKeyword } from "@/hooks/lightKeyword";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SSheet",
  props: {
    sheetList: {
      type: Array,
      default: () => [],
    },
    inputValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();
    /* 关键字高亮 */
    const lightKeyword = brightenKeyword;
    /* 歌单点击事件 */
    const sheetClick = (id: number) => {
      router.push(`/main/playlistdetail/${id}`);
    };
    return {
      lightKeyword,
      sheetClick,
    };
  },
  components: {},
});
</script>

<style scoped>
#SSheet {
  margin-top: 10px;
}
.Sheet-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
}
.Sheet-item:nth-child(2n + 1) {
  background-color: #f9fafb;
}
.Sheet-item-left {
  flex: 4;
  display: flex;
  align-items: center;
}
.Sheet-item:hover {
  background-color: #f3f4f6;
}
.Sheet-item-left .el-image,
.Sheet-item-left img {
  width: 60px !important;
  height: 60px !important;
  border-radius: 5px;
  margin-right: 10px;
}
.sheet-name {
  width: 500px;
  font-size: 13px;
}
.song-count {
  flex: 3;
  font-size: 12px;
}
.creator-name {
  flex: 3;
  font-size: 12px;
}
</style>
