<template>
  <div id="musicList">
    <div class="newMusic-list">
      <!-- :style="{ height: itemHeight }" -->
      <div
        :class="['newMusic-list-item', currentId === item.id && 'active']"
        v-for="(item, index) in musicList"
        :key="item.id"
        @click="newMscItemClick(item, item.id)"
      >
        <!-- 索引,点击切换音乐图标 -->
        <span
          class="newMusic-list-index"
          v-minTenIndex
          v-if="currentId !== item.id"
          >{{ index + 1 }}</span
        >
        <i class="iconfont icon-icon_horn newMusic-list-index" v-else></i>
        <!-- 图片 -->
        <el-image
          :src="item.picUrl"
          :style="{ height: itemHeight, width: itemHeight }"
        ></el-image>
        <!-- 右边文本 -->
        <div class="newMusic-list-right">
          <h5>{{ item.rcmdText || item.name }}</h5>
          <div class="newMusic-songer linelittle">
            {{ newMusicSonger[index] || item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
export default defineComponent({
  name: "musicList",

  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    itemHeight: {
      type: String,
      default: () => "60px",
    },
  },
  setup(props) {
    const state = useState("player", ["currentId"]);
    const store = useStore();
    const isActive = ref(-1);
    /* 点击最新音乐添加背景色 */
    const newMscItemClick = (item: any, id: number) => {
      isActive.value = +id;
      //播放音乐,电台不播
      if (item.type) {
        store.dispatch("player/setCurrentSong", id);
      }
    };
    /* 获取每个歌的歌手 */
    const newMusicSonger = computed(() =>
      props.musicList.map((item: any) =>
        item.song?.artists.map((item: any) => item.name).join("/")
      )
    );
    return {
      ...state,
      isActive,
      newMscItemClick,
      newMusicSonger,
    };
  },
  components: {},
});
</script>

<style scoped lang="scss">
.newMusic-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.newMusic-list-index {
  width: 8%;
  text-align: center;
  font-size: 13px;
  color: #666;
}
.newMusic-list-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 48%;
  padding: 10px 0px;
  margin: 5px 0px;
  border-radius: 5px;
}
.newMusic-list-item:hover {
  background: #f5f5f5;
}
.newMusic-list-right {
  display: flex;
  width: 75%;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 8px;
}
.newMusic-list-right > h5 {
  font-size: 14px;
}
.newMusic-list-right > * {
  margin: 5px 0px;
}
.newMusic-list-item > .el-image {
  border-radius: 5px;
}
.newMusic-songer {
  font-size: 12px;
  color: #666;
}
.active {
  background-color: #e2e2e2 !important;
  color: red;
  .newMusic-list-index {
    color: red;
  }
}
.icon-icon_horn {
  font-size: 15px;
}
</style>
