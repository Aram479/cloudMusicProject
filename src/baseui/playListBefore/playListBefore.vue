<template>
  <!-- 播放量 -->
  <div id="playCount" v-if="playCount">
    <i class="iconfont icon-play4"></i>
    <span v-thousand>{{ playCount }}</span>
  </div>
  <!-- 作者 -->
  <div class="author" v-if="author">
    <i class="iconfont icon-user1"></i>
    <span>{{ author }}</span>
  </div>
  <!-- 更新时间 -->
  <div class="update" v-if="update">
    <div v-if="typeof update === 'string'">{{ update }}</div>
  </div>
  <!-- 曲目数量 -->
  <div class="musicCount" v-if="musicCount">
    <div>曲目数：{{ musicCount }}</div>
  </div>
  <!-- 视频播放时间 -->
  <div class="playTime" v-if="playTime" :style="{bottom: ~route.path.indexOf('/artistdetail')? '35px':'60px' }">
    <div>{{$filters.formatTime(playTime,'mm:ss')}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "playIcon",
  props: {
    playCount: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      default: "",
    },
    update: {
      type: [String, Number],
      default: 0,
    },
    musicCount: {
      type: Number,
      default: 0,
    },
    playTime: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const route = useRoute()
    return {route};
  },
  components: {},
});
</script>

<style scoped>
#playCount {
  display: flex;
  position: absolute;
  align-items: center;
  top: 0;
  right: 0;
  font-weight: bold;
  font-size: 12px;
  color: white;
  margin: 5px 5px 0px 0px;
  background-color: rgba(29, 29, 29, 0.7);
  border-radius: 10px;
  padding: 0px 5px;
}
#playCount .icon-play4 {
  margin-right: 1px;
  font-size: 12px;
  color: #fff;
}
.author {
  position: absolute;
  display: flex;
  align-content: center;
  left: 10px;
  bottom: 55px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  font-style: italic;
}
.author .icon-user1 {
  margin-right: 2px;
}
.update,.playTime {
  position: absolute;
  right: 6px;
  bottom: 50px;
  padding: 1px 7px;
  font-size: 12px;
  color: white;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
}
.playTime {
  bottom:60px
}
.musicCount {
  position: absolute;
  top: 5px;
  left: 5px;
  color: white;
  font-size: 13px;
  font-family: "KaiTi";
  font-weight: 700;
  font-style: italic;
}

</style>
