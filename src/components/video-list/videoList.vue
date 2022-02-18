<template>
  <div
    id="videoList"
    v-infinite-scroll="scrollLoad"
    style="overflow: auto"
    :infinite-scroll-distance="200"
    :infinite-scroll-immediate="false"
    :style="{width:isScroll? '1080px':'100%',height:isScroll? '480px':'100%'}"
  >
    <div class="alonePlay-playlist" v-if="videoList.length">
      <!-- 每个视频item -->
      <div
        class="alone-play-item"
        v-for="item in videoList"
        :key="item"
        v-show="item.title || item.name"
        @click="mvClick(item.id || item.vid)"
      >
        <!-- 图片 -->
        <el-image fit="fill" :src="item.coverUrl || item.imgurl">
          <template #placeholder>
            <img src="@/assets/img/no-img-video.png" />
          </template>
        </el-image>
        <PlayListBefore
          :playCount="item.playTime || item.playCount"
          :playTime="item.durationms || item.duration"
        />
        <!-- 视频名称 -->
        <p
          :class="[
            'paylist-item-title',
            isBlod ? 'linelittle' : 'morelittle',
            isBlod && 'blod',
          ]"
          v-if="!inputValue"
        >
          {{ item.title || item.name }}
        </p>
        <!-- 视频名称高亮 -->
        <p
          :class="[
            'paylist-item-title',
            isBlod ? 'linelittle' : 'morelittle',
            isBlod && 'blod',
          ]"
          v-html="lightKeyword(item.title,inputValue)"
          v-else
        >
        </p>
        <!-- 视频作者 -->
        <span class="songe" v-if="item.creator && !inputValue">{{ item.creator.nickname || item.creator[0]?.userName }}</span>
        <!-- 视频作者高亮 -->
        <span class="songe" v-else-if="item.creator && inputValue" v-html="lightKeyword(item?.creator[0]?.userName,inputValue)"></span>
        <!-- 动画图标 -->
        <div class="animatIcon">
          <i class="iconfont icon-play"></i>
        </div>

      </div>
      <Loading :setHeight="50" v-show="isShowLoading" style="margin:0 auto" />
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { brightenKeyword }from '@/hooks/lightKeyword'
import _ from "lodash";
import Loading from "@/baseui/loading/loading.vue";
import PlayListBefore from "@/baseui/playListBefore/playListBefore.vue";
import store from "@/store";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "videoList",
  props: {
    videoList: {
      type: Array,
      default: () => [],
    },
    isBlod: {
      type: Boolean,
      default: false,
    },
    isShowLoading: {
      type: Boolean,
      default: true,
    },
    isScroll:{
      type:Boolean,
      default:true
    },
    /* 高亮关键字 */
    inputValue:{
      type:String,
      default:''
    },
  },
  setup(props, { emit }) {
    const router = useRouter()
    /* 防抖 */
    const scrollLoad = _.debounce(() => {
      emit("scrollLoad");
    }, 500);
    /* 关键字高亮 */
    const lightKeyword = brightenKeyword
    /* mv点击事件 */
    const mvClick = (id:number | string)=>{
      router.push(`/videodetail/${id}`)
    }
    return {
      scrollLoad,
      lightKeyword,
      mvClick
    };
  },

  components: {
    Loading,
    PlayListBefore,
  },
});
</script>

<style scoped lang="scss">
#videoList {
  padding: 0;
}
.alonePlay-playlist {
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.alone-play-item {
  position: relative;
  margin-bottom: 25px;
  cursor: pointer;
  width: 23%;
  margin-left: 15px;
  overflow: hidden;
}
.alone-play-item > .el-image,
.alone-play-item img {
  width: 100%;
  height: 135px;
  border-radius: 5px;
}
.paylist-item-title {
  font-size: 13px;
  margin: 3px 0px;
}
.active:hover > .paylist-item-title {
  text-decoration: underline;
  color: red;
}
.alonePlayCount {
  position: absolute;
  top: 5px;
  left: 5px;
}
.alonePlayCount .icon-play1 {
  font-size: 25px;
  color: red;
}
.blod {
  font-weight: bold;
}
.songe {
  font-size: 13px;
  color: #666;
}

.animatIcon {
  top: -35px;
  left: 13px;
  position: absolute;
  transition: all 0.5s ease;
  opacity: 0;
}
.alone-play-item:hover .animatIcon {
  transform: translateY(45px);
  opacity: 1;
}
.icon-play {
  font-size: 30px !important;
  color: #fff;
}
.loading-title {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
// #videoList::-webkit-scrollbar {
//   width: 10px;
// }
// #videoList::-webkit-scrollbar-track {
//   background-color: rgba(133, 133, 133, 0.2);
//   -webkit-border-radius: 2em;
//   -moz-border-radius: 2em;
//   border-radius: 2em;
// }
// #videoList::-webkit-scrollbar-thumb {
//   background-color: rgba(66, 66, 66, 0.2);
//   -webkit-border-radius: 2em;
//   -moz-border-radius: 2em;
//   border-radius: 2em;
// }
</style>
