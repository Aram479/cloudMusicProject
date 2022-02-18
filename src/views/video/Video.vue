<template>
  <div id="Video" v-if="tagList.length && Object.keys(userData).length">
    <!-- 头部标签区域 -->
    <PlayListHead
      :listTag="tagRList"
      :allTagList="tagList"
      scrollTopTitle="全部视频"
      @changeTagName="changeTagName"
    />
    <div class="err-msg" v-if="errMsg.indexOf('暂无') !== -1">
      暂无推荐视频，看看其他内容吧~
    </div>
    <!-- 视频列表区域 -->
    <VideoList
      :videoList="videoList"
      :isBlod="true"
      @scrollLoad="scrollLoad"
      v-else
    />
  </div>
  <Loading
    :isIcon="!Object.keys(userData).length ? false: true"
    :loadTitle="!Object.keys(userData).length ? '请登录后查看！':'载入中...'"
    v-else
  />
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { changeTag } from "@/hooks/tagCate";
import PlayListHead from "@/components/play-list-head/play-list-head.vue";
import VideoList from "@/components/video-list/videoList.vue";
import Loading from "@/baseui/loading/loading.vue";
export default defineComponent({
  name: "Video",
  setup() {
    const state: any = useState("Video", [
      "tagList",
      "tagRList",
      "videoList",
      "errMsg",
    ]);
    const loginState: any = useState("Login", ["userData"]);
    const store = useStore();
    const offsetRes = reactive({
      id: 0,
      offset: 8,
    });
    const loginInfo = computed(() => loginState.userData.value);
    /* 如果没登录则不请求数据 */
    if (loginInfo.value) {
      // const setTtag = ref("全部视频");
      store.dispatch("Video/getVideoTag");
      /* store.dispatch("Video/getVideoList");*/
      store.dispatch("Video/getVideoAllList"); //默认请求全部视频数据
      store.dispatch("Video/getVideoAllList", 8); //再次获取全部视频为了再次增加8条数据
      store.dispatch("Video/getVideoTageR");
    }

    /* 点击标签，请求标签下视频数据 */
    const changeTagName = (tag: string, id: number) => {
      state.videoList.value.length = 0;
      offsetRes.offset = 0;
      offsetRes.id = id;
      if (tag === "全部视频") {
        store.dispatch("Video/getVideoAllList");
        return;
      }
      //请求防抖
      changeTag(
        () => store.dispatch("Video/getVideoList", offsetRes),
        tag,
        700
      );
      scrollLoad(); //调用无限滚动
    };
    /* 无限滚动，请求下一页数据 */
    const scrollLoad = () => {
      if (offsetRes.id) {
        store.dispatch("Video/getVideoList", offsetRes);
      } else {
        store.dispatch("Video/getVideoAllList", offsetRes.offset);
      }
      offsetRes.offset += 8;
    };
    return {
      ...state,
      ...loginState,
      changeTagName,
      scrollLoad,
    };
  },
  components: {
    PlayListHead,
    VideoList,
    Loading,
  },
});
</script>

<style scoped>
.err-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 280px;
  text-align: center;
  font-size: 14px;
}
</style>
