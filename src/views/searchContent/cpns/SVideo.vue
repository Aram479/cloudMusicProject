<template>
  <div id="SVideo">
    <VideoList
      :videoList="videoList"
      :isShowLoading="false"
      :isScroll="false"
      :inputValue="inputValue"
      :isBlod="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import VideoList from "@/components/video-list/videoList.vue";
export default defineComponent({
  name: "SVideo",
  props: {
    videoList: {
      type: Array,
      default: () => [],
    },
    inputValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
  components: {
    VideoList,
  },
});
</script>

<style scoped>
#SVideo {
  margin-top: 10px;
}
</style>
