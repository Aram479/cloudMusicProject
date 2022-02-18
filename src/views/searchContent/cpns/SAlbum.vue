<template>
  <div id="SAlbum">
    <div class="SAlbum-box">
      <!-- 专辑item项 -->
      <div
        class="Album-item"
        v-for="item in albumList"
        :key="item.id"
        @click="albumClick(item.id)"
      >
        <div class="Album-item-left">
          <!-- 图片 -->
          <el-image :src="item.picUrl">
            <template #placeholder>
              <img src="@/assets/img/no-img.bb9c4fe3.png" />
            </template>
          </el-image>
          <!-- 专辑名 -->
          <span
            class="album-name linelittle"
            v-html="lightKeyword(item.name, inputValue)"
          ></span>
        </div>
        <!-- 歌手 -->
        <span
          class="songer-name"
          v-html="lightKeyword(item.artist?.name, inputValue)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, ref } from "vue";
import { brightenKeyword } from "@/hooks/lightKeyword";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "SAlbum",
  props: {
    albumList: {
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
    /* 专辑点击事件 */
    const albumClick = (id: number) => {
      router.push(`/main/albumdetail/${id}`);
    };
    return {
      lightKeyword,
      albumClick,
    };
  },
  components: {},
});
</script>

<style scoped>
#SAlbum {
  margin-top: 10px;
}
.Album-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
}
.Album-item:nth-child(2n + 1) {
  background-color: #f9fafb;
}
.Album-item-left {
  flex: 6;
  display: flex;
  align-items: center;
}
.Album-item:hover {
  background-color: #f3f4f6;
}
.Album-item .el-image,
.Album-item img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
}
.album-name {
  width: 450px;
  font-size: 14px;
}
.songer-name {
  flex: 4;
  font-size: 13px;
}
</style>
