<template>
  <div id="rankOfficial">
    <!-- 官方榜 -->
    <div class="official">
      <div class="offi-title">
        <i class="iconfont icon-netease-cloud-music-fill"></i>
        <span class="title">官方榜</span>
      </div>
      <div class="offi">
        <div
          class="offi-item"
          :style="{ backgroundColor: offiBgc[index1] }"
          v-for="(item1, index1) in officialList"
          :key="index1"
        >
          <!-- 左边图片 -->
          <div class="offi-item-left" @click="rankClick(item1.id)">
            <div class="left-img-title" :style="{ color: offiColor[index1] }">
              {{ item1.name }}
            </div>
            <div class="left-img-box">
              <i class="iconfont icon-netease-cloud-music-line"></i>
              <i class="iconfont icon-icon-test"></i>
              <el-image :src="item1.coverImgUrl"></el-image>
            </div>
          </div>
          <!-- 右边列表 -->
          <div class="offi-item-right">
            <!-- 前三首歌 -->
            <div
              class="right-item"
              v-for="(item2, index2) in item1.tracks"
              :key="index2"
              @click="rankClick(item1.id)"
            >
              <span class="right-index">{{ index2 + 1 }}.</span>
              <div class="right-name">
                <span class="first" :style="{ color: offiColor[index1] }">{{
                  item2.first
                }}</span>
                <i>-</i>
                <span class="second">{{ item2.second }}</span>
              </div>
            </div>
            <div class="view-all" @click="rankClick(item1.id)">
              <span class="title">查看全部</span>
              <el-icon>
                <ArrowRight />
              </el-icon>
            </div>
          </div>
          <div class="update">{{ item1.updateFrequency }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "rankOfficial",
  props: {
    officialList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    //官方榜背景色
    const offiBgc = reactive(["#f3e0e7", "#e1ebea", "#e2e6ef", "#f2e0e0"]);
    const offiColor = reactive(["#ed3079", "#26998b", "#3a71c1", "#e22626"]);
    /* 点击图片跳转排行歌单 */
    const rankClick = (id: number) => {
      router.push(`/main/playlistdetail/${id}`);
    };
    return {
      offiBgc,
      offiColor,
      rankClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.offi-title {
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
}
.offi-title .iconfont {
  font-size: 30px;
  color: red;
  margin-right: 5px;
}
.offi-title .title {
  font-weight: bold;
}
.offi {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.offi-item {
  position: relative;
  display: flex;
  margin: 10px;
  width: 100%;
  margin: 10px 0px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}
.offi-item-left {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 30px;
}
.left-img-title {
  font-size: 25px;
  color: pink;
  font-weight: 700;
  margin-bottom: 10px;
}
.left-img-box {
  position: relative;
}
.left-img-box .iconfont {
  position: absolute;
  z-index: 1;
  color: white;
}
.left-img-box > .icon-netease-cloud-music-line {
  top: -25px;
  left: 5px;
  font-size: 30px;
  opacity: 0;
  transition: all 0.5s ease;
}
.left-img-box > .icon-icon-test {
  bottom: 5px;
  right: -35px;
  font-size: 30px;
  font-weight: bold;

  transition: all 0.5s ease;
}
.left-img-box {
  width: 130px;
  height: 130px;
  border-radius: 10px;
  transition: all 0.4s ease;
  overflow: hidden;
}
.left-img-box:hover {
  transform: translateY(-7px);
}
.left-img-box:hover > .icon-netease-cloud-music-line {
  transform: translateY(30px);
  opacity: 1;
}
.left-img-box:hover > .icon-icon-test {
  transform: translateX(-40px);
  opacity: 1;
}
.offi-item-right {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
}
.right-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  font-size: 13px;
  border-radius: 5px;
  margin: 0 auto;
  transition: all 0.1s ease;
}
/* .right-item:nth-child(2n + 1) {
  background-color: #fafafa;
} */
.right-item:hover {
  background-color: #f5f5f5;
  transform: scale(1.05);
  width: 98%;
}
.right-name .second {
  color: #818181;
}
.right-name > i {
  margin: 0px 5px;
  color: #818181;
}
.view-all {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: red;
}
.view-all .title {
  margin-left: 10px;
}
.right-index {
  margin: 0 8px;
  color: red;
  font-weight: bold;
}
.update {
  position: absolute;
  top: 5px;
  right: 12px;
  font-size: 12px;
  color: #acacac;
}
</style>
