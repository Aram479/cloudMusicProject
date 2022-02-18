<template>
  <div id="songer" v-if="songerList.length">
    <div
      class="songer-list"
      v-for="item in songerList"
      :key="item.id"
      @click="songerClick(item.id)"
    >
      <!-- 图片 -->
      <el-image :src="item.picUrl">
        <template #placeholder>
          <img src="@/assets/img/no-img.bb9c4fe3.png" />
        </template>
      </el-image>
      <!-- 歌手 -->
      <p>{{ item.name }}</p>
    </div>
  </div>
  <div v-else class="none-title">
    <span>没有更多了哦~</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  name: "songer",
  props: {
    songerList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    /* 点击歌手跳转详情页 */
    const songerClick = (id: number) => {
      router.push(`/main/artistdetail/${id}`);
    };
    return {
      songerClick,
    };
  },
  components: {},
});
</script>

<style scoped lang="scss">
#songer {
  display: flex;
  flex-wrap: wrap;
}
.songer-list {
  width: calc(16.6% - 16px);
  margin-bottom: 30px;
  margin-right: 16px;
}
.songer-list > .el-image,
.songer-list img {
  width: 100%;
  height: 140px;
  box-sizing: border-box;
  border: 1px solid #ededed;
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
}
.songer-list > p {
  font-size: 14px;
  color: #333;
  cursor: pointer;
}
.none-title {
  height: 240px;
  display: flex;
  font-size: 14px;
  color: #c7c7c7;
  justify-content: center;
  align-items: center;
}
</style>
