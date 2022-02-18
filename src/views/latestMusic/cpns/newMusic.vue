<template>
  <div id="newMusic">
    <div class="newMusic-box" v-if="newMusicList.length">
      <div
        class="music-item"
        v-for="(item, index) in newMusicList"
        :key="index"
        @click="itemClick(item.id)"
      >
        <!-- 索引 -->
        <span class="index" v-minTenIndex v-show="currentId !== item.id">{{
          index + 1
        }}</span>
        <!-- 图标 -->
        <i
          class="iconfont icon-icon_horn index"
          v-show="currentId == item.id"
        ></i>
        <!-- 图片 -->
        <el-image :src="item.album.blurPicUrl">
          <template #placeholder>
            <img src="@/assets/img/no-img.bb9c4fe3.png" />
          </template>
        </el-image>
        <!-- 音乐名 -->
        <div :class="['text', currentId == item.id && 'active']">
          {{ item.name }}
        </div>
        <!-- 歌手 -->
        <div class="songer linelittle">
          <span
            class="songer-item"
            v-for="songer in item.artists"
            :key="songer.id"
          >
            <span>{{ songer.name }}</span>
            <span class="slash">/</span>
          </span>
        </div>
        <!-- 专辑 -->
        <div class="album">{{ item.album.name }}</div>
        <!-- 时间 -->
        <div class="time">
          {{ $filters.formatTime(item.bMusic.playTime, "mm:ss") }}
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import Loading from "@/baseui/loading/loading.vue";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
export default defineComponent({
  name: "newMusic",
  props: {
    newMusicList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = useState("player", ["currentId"]);
    const store = useStore();
    const { newMusicList } = toRefs(props);
    /* 存储被点击的id */
    const isActive = ref(-1);
    /* 点击播放新歌 */
    const itemClick = (id: number) => {
      isActive.value = id;
      //存储当前列表所有歌曲id为数组
      const songIds = newMusicList.value.map((song: any) => song.id);
      //播放当前歌曲
      store.dispatch("player/setSongListByIds", {
        ids: songIds,
        currentId: id,
      });
    };
    return {
      ...state,
      isActive,
      itemClick,
    };
  },
  components: {
    Loading,
  },
});
</script>

<style scoped>
.music-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  cursor: pointer;
}
.music-item:nth-child(2n + 1) {
  background-color: #fafafa;
}
.music-item > .el-image,
.music-item img {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ededed;
  border-radius: 4px;
  margin: 0 10px;
}
.index {
  font-size: 13px;
  color: #b7b7b7;
  margin-left: 10px;
  padding: 0 4px;
}
.text {
  flex: 1;
  padding: 0 8px;
  box-sizing: border-box;
  color: #333;
  font-size: 13px;
}
.songer {
  width: 160px;
  padding: 0 8px;
  box-sizing: border-box;
  color: #666;
  font-size: 12px;
}
.album {
  width: 240px;
  padding: 0 8px;
  box-sizing: border-box;
  color: #666;
  font-size: 12px;
}
.time {
  width: 70px;
  color: #999;
  font-size: 12px;
}
.icon-icon_horn {
  color: red;
  font-size: 16px;
}
.active {
  color: red;
  font-weight: 700;
}
.songer .slash {
  margin: 0px 3px;
}

.songer-item:last-child > span:last-child {
  display: none;
}
</style>
