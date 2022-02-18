<template>
  <div id="artistListDetail">
    <!-- 热门50首 -->
    <div class="hot-song">
      <!-- 左边内容：图片 -->
      <div class="left-box">
        <img src="@/assets/img/top-50.png" />
      </div>
      <!-- 右边热门歌曲列表 -->
      <div class="right-box">
        <!-- 头部标题 -->
        <div class="header">
          <span class="hot-title">热门50首</span>
          <i
            class="iconfont icon-play"
            @click="songAllClick(albumList[0].id)"
          ></i>
        </div>
        <!-- 歌曲列表 -->
        <div class="song-list">
          <div
            class="songs-item"
            v-for="(item, index) in albumList.slice(0, maxLength)"
            :key="item"
            @click="itemClick(item.id)"
          >
            <!-- 索引 -->
            <div class="index" v-minTenIndex v-show="currentId != item.id">
              {{ index + 1 }}
            </div>
            <!-- 播放图标 -->
            <i
              class="iconfont icon-icon_horn index active"
              v-show="currentId == item.id"
            ></i>
            <!-- 歌名和描述 -->
            <div class="name">
              <span>{{ item.name }}</span>
              <span v-show="item.alia[0]" style="margin-left: 15px"
                >({{ item.alia[0] }})</span
              >
            </div>
            <!-- 播放时间 -->
            <div class="duration">
              {{ $filters.formatTime(item.dt, "mm:ss") }}
            </div>
          </div>
        </div>
        <!-- 显示更多歌曲 -->
        <div class="show-more" v-show="maxLength != 50" @click="hotTitleClick">
          <span class="more-title">查看全部50首热门歌曲</span>
          <i class="iconfont icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useState } from '@/hooks/mapGet/index.js'
export default defineComponent({
  name: "artistListDetail",
  props: {
    albumList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = useState('player',['currentId'])
    const store = useStore();
    const isActive = ref(0);
    const maxLength = ref(10);
    const { albumList } = toRefs(props);
    //存储当前列表所有歌曲id为数组
    const songIds = computed(() => albumList.value.map((song: any) => song.id));
    /* 歌曲点击事件 */
    const itemClick = (id: number) => {
      isActive.value = id;
      //播放当前歌曲
      store.dispatch("player/setSongListByIds", {
        ids: songIds.value,
        currentId: id,
      });
    };
    /* 点击播放全部 */
    const songAllClick = (id: number) => {
      store.dispatch("player/setSongListByIds", {
        ids: songIds.value,
        currentId: songIds.value[0],
      });
    };
    /* 热门歌曲50点击事件 */
    const hotTitleClick = () => {
      maxLength.value = 50;
    };
    return {
      ...state,
      isActive,
      maxLength,
      itemClick,
      hotTitleClick,
      songAllClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.hot-song {
  padding-top: 20px;
  margin-bottom: 40px;
  display: flex;
}
.left-box > img {
  width: 150px;
  height: 150px;
  border-radius: 8px;
  margin-right: 60px;
}
.right-box {
  flex: 1;
}
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.header .icon-play {
  cursor: pointer;
  font-size: 25px;
  color: #666666;
}
.hot-title {
  margin-right: 30px;
  font-size: 16px;
  color: #333;
}
.songs-item {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  font-size: 12px;
  cursor: pointer;
}
.songs-item:nth-child(2n + 1) {
  background-color: #fafafa;
}
.index {
  color: #bbb;
  padding: 0 16px;
}
.name {
  color: #333;
  flex: 1;
}
.duration {
  color: #bbb;
  margin-right: 80px;
}
.show-more {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 34px;
  align-items: center;
  margin-right: 30px;
  cursor: pointer;
  background-color: #fbfbfb;
}
.show-more .icon-right {
  font-size: 13px;
  color: #999;
}
.more-title {
  font-size: 13px;
  color: #999;
  margin-right: 4px;
}
.active {
  color: red;
}
</style>
