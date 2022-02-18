<template>
  <!-- 列表区域 -->
  <div id="playList" v-if="playList.length !== 0">
    <div class="commend-paylist">
      <!-- 每个歌单 -->
      <div
        :class="['paylist-item', !item.creator && 'lastFive']"
        :key="index"
        v-for="(item, index) in playList"
        @click="playListClick(item.id)"
      >
        <!-- 图片 -->
        <el-image :src="item.picUrl || item.coverImgUrl">
          <template #placeholder>
            <img src="@/assets/img/no-img.bb9c4fe3.png" />
          </template>
        </el-image>
        <p class="paylist-item-title">{{ item.name }}</p>
        <PlayListBefore
          :playCount="item.playCount"
          :author="item.creator?.nickname"
          :update="item.updateFrequency"
          :musicCount="item.trackCount"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from 'vue-router'
import PlayListBefore from "@/baseui/playListBefore/playListBefore.vue";
export default defineComponent({
  name: "playList",
  props: {
    playList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter()
    /* 歌单点击事件 */
    const playListClick = (id:number)=>{
      router.push(`/main/playlistdetail/${id}`)
    }
    return {
      router,
      playListClick
    };
  },
  components: {
    PlayListBefore,
  },
});
</script>

<style scoped lang="scss">
.commend-paylist {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}
.paylist-item {
  position: relative;
  width: calc(20% - 20px);
  margin-top: 20px;
  margin-right: 25px;
  &:nth-child(5n) {
    /* 每行最后1个元素 */
    margin-right: 0px;
  }
  &:nth-child(-n + 5) {
    /* 每行最后1个元素 */
    margin-top: 0px;
  }
}
.paylist-item .el-image {
  cursor: pointer;
  width: 100%;
  height: 80%;
  border-radius: 10px;
  transition: all 0.4s ease;
}
.paylist-item img {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.paylist-item > .el-image:hover {
  transform: scale(1.05);
}
.paylist-item-title {
  font-size: 13px;
  margin-top: 3px;
}
</style>
