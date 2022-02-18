<template>
  <div id="videoMain">
    <div class="all-main" v-if="Object.keys(videoDetail).length">
      <div class="main">
        <div class="left">
          <div class="main-detail">视频详情</div>
          <!-- 视频 -->
          <div class="main-banner">
            <video
              :src="videoDetail.detail?.player?.url"
              style="width: 100%; height: 100%"
              autoplay="autoplay"
              controls="controls"
              @click="vedioClick"
              ref="vedio"
            ></video>
          </div>
          <!-- 头像 -->
          <div class="main-head">
            <el-image
              :src="
                videoDetail.detail?.info?.avatarUrl ||
                videoDetail.detail?.info?.cover
              "
            ></el-image>
            <p class="author">
              {{
                videoDetail.detail?.info?.artistName ||
                videoDetail.detail?.info?.creator.nickname
              }}
            </p>
          </div>
          <div class="main-desc">
            <div class="desc-detaile">
              <span
                v-if="typeof videoDetail.detail?.info?.publishTime == 'number'"
                >发布：{{
                  $filters.formatTime(
                    videoDetail.detail?.info?.publishTime,
                    "YYYY-DD-MM"
                  )
                }}</span
              >
              <span v-else
                >发布：{{ videoDetail.detail?.info?.publishTime }}</span
              >
              <span
                >播放：<span v-thousand>{{
                  videoDetail.detail?.info?.playTime ||
                  videoDetail.detail?.info?.playCount
                }}</span
                >次</span
              >
            </div>
          </div>
        </div>
        <div class="right">
          <h2>相关推荐</h2>
          <Related :relatedList="videoDetail?.detail?.related" />
        </div>
      </div>
      <Comment
        :commentInfo="videoDetail?.comment || {}"
        :pageInfo="commentResInfo"
        @changeCurrent="changeCurrent"
      ></Comment>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
import Comment from "@/components/list-detail/Comment/Comment.vue";
import Loading from "@/baseui/loading/loading.vue";
import Related from "./relatedVideo.vue";
export default defineComponent({
  name: "videoMain",
  setup() {
    const state: any = useState("Video", ["videoDetail"]);
    const route = useRoute();
    const store = useStore();
    const commentResInfo = reactive({
      id: route.params.id,
      limit: 20,
      offset: 0,
    });
    /* 评论页数改变 */
    const changeCurrent = (page: number) => {
      state.videoDetail.value.comment = 0;
      commentResInfo.offset = (page - 1) * commentResInfo.limit;
      /* 如果id是mv则请求mv评论，否则请求视频评论 */
      if (+route.params.id) {
        store.dispatch("Video/getMvComment", commentResInfo);
      } else {
        store.dispatch("Video/getVideoComment", commentResInfo);
      }
    };
    watch(
      () => route.params.id,
      (newV, oldV) => {
        if (~route.path.indexOf("/videodetail")) {
          if (+newV) {
            store.dispatch("Video/getVideoDetail", {
              id: route.params.id,
              type: "mv",
            });
            store.dispatch("Video/getMvComment", commentResInfo);
          } else {
            store.dispatch("Video/getVideoDetail", {
              id: route.params.id,
              type: "video",
            });
            store.dispatch("Video/getVideoComment", commentResInfo);
          }
        }
      },
      {
        immediate: true,
      }
    );
    return {
      ...state,
      commentResInfo,
      changeCurrent,
    };
  },
  components: {
    Comment,
    Loading,
    Related,
  },
});
</script>

<style scoped>
#videoMain {
  padding: 20px 50px;
}
.all-main {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
  max-width: 1000px;
  margin: auto;
}
.main {
  display: flex;
}
.right {
  flex: 30%;
}
.right > h2 {
  font-weight: bold;
  margin-bottom: 10px;
}
.left {
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex: 70%;
  width: 100%;
}
.left > * {
  margin-bottom: 15px;
}
.main-detail {
  font-weight: 700;
  color: rgb(48, 48, 48);
}
.main-banner {
  position: relative;
  width: 650px;
  height: 360px;
}
.main-banner .player {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 70px;
  height: 70px;
  border-radius: 35px;
  opacity: 0.5;
}
.player i {
  position: relative;
  left: -7%;
  width: 0;
  height: 0;
  border-color: transparent red transparent transparent;
  border-style: solid;
  border-width: 25px 25px 0 0;
  transform: rotate(-45deg);
}
.player:hover {
  cursor: pointer;
  opacity: 0.8;
}
.main-banner img {
  border-radius: 10px;
  height: 100%;
}
.main-banner > video {
  border-radius: 10px;
}
.main-head {
  display: flex;
  align-items: center;
}
.main-head .el-image {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin-right: 8px;
}
.main-desc > * {
  margin-bottom: 15px;
}
.author {
  font-size: 18px;
}
.desc-detaile {
  font-size: 13px;
  color: #ccc;
}
.desc-detaile > span:first-child {
  margin-right: 10px;
}
</style>
