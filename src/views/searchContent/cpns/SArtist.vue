<template>
  <div id="SArtist">
    <div class="SArtist-box">
      <div
        class="Artist-item"
        v-for="item in artistList"
        :key="item.id"
        @click="songerClick(item.id)"
      >
        <el-image :src="item.img1v1Url">
          <template #placeholder>
            <img src="@/assets/img/no-img.bb9c4fe3.png" />
          </template>
        </el-image>
        <span
          class="songer-name"
          v-html="lightKeyword(item.name, inputValue)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { brightenKeyword } from "@/hooks/lightKeyword";
export default defineComponent({
  name: "SArtist",
  props: {
    artistList: {
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
    /* 歌手点击事件 */
    const songerClick = (id: number) => {
      router.push(`/main/artistdetail/${id}`);
    };
    return {
      lightKeyword,
      songerClick,
    };
  },
  components: {},
});
</script>

<style scoped>
#SArtist {
  margin-top: 10px;
}
.Artist-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
}
.Artist-item:nth-child(2n + 1) {
  background-color: #f9fafb;
}
.Artist-item:hover {
  background-color: #f3f4f6;
}
.Artist-item .el-image,
.Artist-item img {
  width: 60px;
  height: 60px;
  border-radius: 5px;
  margin-right: 10px;
}
.songer-name {
  font-size: 14px;
}
</style>
