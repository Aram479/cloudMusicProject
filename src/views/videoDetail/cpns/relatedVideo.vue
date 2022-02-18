<template>
  <div id="relatedVideo">
    <div
      class="music-mvv"
      v-for="item in relatedList"
      :key="item.id"
      @click="videoClick(item.id || item.vid)"
    >
      <!-- 左边视频 -->
      <div class="mv-play">
        <div class="play-all">
          <span class="play-sanjiao"></span>
        </div>
        <!-- 图片 -->
        <el-image :src="item.cover || item.coverUrl">
          <template #placeholder>
            <img src="@/assets/img/no-img-video.png" />
          </template>
        </el-image>
      </div>
      <!-- 右边信息 -->
      <div class="mv-descc">
        <p class="mv-name morelittle">{{ item.name || item.title }}</p>
        <p
          class="mv-artist"
          v-if="item.artists"
          @click.stop="artistClick(item.artists[0].id)"
        >
          {{ item.artists[0].name }}
        </p>
        <p class="mv-artist" v-else>{{ item.creator[0].userName }}</p>
      </div>
      <!-- 播放量和时间 -->
      <div class="video-icon">
        <div class="playCount">
          <i class="iconfont icon-play4"></i>
          <span v-thousand>{{ item.playCount || item.playTime }}</span>
        </div>
        <div class="durction">
          {{ $filters.formatTime(item.duration, "mm:ss") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "relatedVideo",
  props: {
    relatedList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    /* 视频点击事件 */
    const videoClick = (id: number | string) => {
      router.push(`/videodetail/${id}`);
    };
    /* 歌手点击事件 */
    const artistClick = (id: number) => {
      router.push(`/main/artistdetail/${id}`);
    };
    return {
      videoClick,
      artistClick,
    };
  },
  components: {},
});
</script>

<style scoped>
#relatedVideo {
  position: relative;
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  font-size: 12px;
}
.music-mvv {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1px 0px;
}
.mv-descc {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  position: relative;
  top: 0;
  left: 10px;
  width: 100%;
  height: 100%;
}
.mv-name {
  font-size: 13px;
}
.mv-artist {
  font-size: 12px;
  color: #ccc;
}
.music-mv {
  position: relative;
  display: flex;
  width: 230px;
  height: 130px;
  margin: 0 15px;
  margin-bottom: 80px;
}
.mv-desc p {
  position: relative;
  bottom: -135px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
p:nth-child(3) {
  color: #ccc;
}
.play-all {
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 1;
  right: 0;
  color: white;
}
.play-all > * {
  margin: 5px 3px;
}
.play-sanjiao {
  width: 0;
  height: 0;
  border-color: transparent white transparent transparent;
  border-style: solid;
  border-width: 8px 8px 0 0;
  transform: rotate(-45deg);
}
.mv-time {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
  color: white;
}
.video-icon {
  position: absolute;
  height: 100%;
  color: white;
}
.video-icon .playCount {
  position: relative;
  top: 5px;
  left: 105px;
  font-weight: bold;
  font-size: 12px;
}
.video-icon .iconfont{
  font-size: 12px;
  margin-right: 3px;
}
.video-icon .durction {
   position: absolute;
   left: 115px;
   bottom: 10px;
   font-weight: bold;
}
.el-image,
img {
  width: 150px;
  height: 85px;
  border-radius: 5px;
}
</style>
