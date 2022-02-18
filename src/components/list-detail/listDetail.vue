<template>
  <div id="listDetail">
    <div class="listDetail-box" v-if="musicList.length">
      <!-- 标题区域 -->
      <div class="list-title">
        <div
          :class="['title', item.class]"
          v-for="item in listTitle"
          :key="item"
        >
          {{ item.title }}
        </div>
      </div>
      <!-- 列表区域 -->
      <div class="list">
        <!-- 歌曲item项 -->
        <div
          class="list-item"
          v-for="(song, songIndex) in musicList"
          :key="song.id"
          v-show="song"
          @click="songItemClick(song.id)"
        >
          <!-- 播放图标 -->
          <i
            class="iconfont icon-icon_horn songIndex active"
            v-show="currentId == song.id"
          ></i>
          <!-- 索引 -->
          <div class="songIndex" v-show="currentId !== song.id" v-minTenIndex>
            {{ songIndex+1 }}
          </div>
          <!-- lightKeyword -->
          <!-- 歌名 -->
          <div class="song-name linelittle" v-if="!inputValue">{{ song.name }}</div>
          <!-- 歌名高亮 -->
          <div class="song-name linelittle" v-else v-html="lightKeyword(song.name,inputValue)"></div>
          <!-- 歌手 -->
          <div class="songer linelittle">
            <span
              class="songer-item"
              v-for="songer in song.ar || song.artists"
              :key="songer.id"
            >
              <span v-if="!inputValue">{{ songer.name }}</span>
              <!-- 歌手高亮 -->
              <span v-else v-html="lightKeyword(songer.name,inputValue)"></span>
              <span class="slash">/</span>
            </span>
          </div>
          <!-- 专辑 -->
          <div class="album linelittle" v-if="!inputValue">{{ song.al?.name || song.album?.name }}</div>
          <!-- 专辑高亮 -->
          <div class="album linelittle" v-else v-html="lightKeyword(song.album?.name,inputValue)"></div>
          <!-- 时长 -->
          <div class="duration">
            {{ $filters.formatTime(song.dt || song.duration, "mm:ss") }}
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, reactive, ref, toRefs } from "vue";
import { brightenKeyword }from '@/hooks/lightKeyword'
import Loading from '@/baseui/loading/loading.vue'
import { useState } from '@/hooks/mapGet/index.js'
import { useStore } from "vuex";
export default defineComponent({
  name: "listDetail",
  props: {
    musicList: {
      type: Array,
      default: () => [],
    },
    inputValue:{
      type:String,
      default:''
    }
  },
  setup(props) {
    const state = useState('player',['currentId'])
    const store = useStore()
    const { musicList } = toRefs(props);
    /* 标题数据 */
    const listTitle = reactive([
      { class: "song-name", title: "音乐标题" },
      { class: "songer", title: "歌手" },
      { class: "album", title: "专辑" },
      { class: "duration", title: "时长" },
    ]);
    const isActive = ref(0);
    /* 歌曲点击事件,并点击播放 */
    const songItemClick = (id: number) => {
      isActive.value = id;
      //存储当前列表所有歌曲id为数组
      const songIds = musicList.value.map((song:any) => song.id);
      //播放当前歌曲
      store.dispatch("player/setSongListByIds", {
        ids: songIds,
        currentId: id,
      });
    };
    /* 关键字高亮 */
    const lightKeyword = brightenKeyword
    return {
      ...state,
      isActive,
      listTitle,
      songItemClick,
      lightKeyword,
    };
  },
  components: {
    Loading
  },
});
</script>

<style scoped>
.list-title {
  display: flex;
  align-items: center;
  height: 36px;
}
.list {
  height: calc(100% - 403px);
}
.list-item {
  display: flex;
  align-items: center;
  height: 34px;
  font-size: 13px;
  cursor: pointer;
  color: #6b6b6b;
}
.list-item:nth-child(2n + 1) {
  background-color: #fafafa;
}
.list-item .song-name {
  margin-left: 0;
}
.list-item:hover {
  background: #f0f0f0;
}
.songer-item .slash {
  margin: 0px 2px;
}
.songer-item:last-child span:last-child {
  display: none;
}
.list-title .title {
  font-size: 13px;
  color: #888;
}
.songIndex {
  width: 84px;
  color: #bbb;
  padding-left: 16px;
  box-sizing: border-box;
}
.song-name {
  margin-left: 84px;
  flex: 1;
}
.songer {
  width: 180px;
}
.album {
  width: 250px;
}
.duration {
  width: 50px;
  color: #bbb;
}
.active {
  color: red;
}
</style>
