<template>
  <div id="LatestMusic">
    <!-- 顶部切换导航 -->
    <HeadNav @navChange="navChange" />
    <!-- 标签导航 -->
    <TagNav
      ref="refTagNav"
      :tagNav="isShow ? tagNav : tagNav2"
      :isShow="isShow"
      @tagChangeClick="tagChangeClick"
      @rightTagClick="rightTagClick"
    />
    <!-- 新歌速递页面 -->
    <Iscroll v-if="isShow" @scrollLoad="scrollLoad">
      <template #Iscroll>
        <NewMusic :newMusicList="newMusicList.slice(0, loadNum)" />
      </template>
    </Iscroll>

    <!-- 新碟上架页面 -->
    <Iscroll v-else @scrollLoad="scrollLoad">
      <template #Iscroll>
        <NewDisc :newDiscList="newDiscList.slice(0, loadNum)" />
      </template>
    </Iscroll>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { changeTag } from "@/hooks/tagCate";
import HeadNav from "./cpns/headNav.vue";
import TagNav from "./cpns/tagNav.vue";
import NewMusic from "./cpns/newMusic.vue";
import NewDisc from "./cpns/newDisc.vue";
import Iscroll from "@/baseui/infiniteScroll/infiniteScroll.vue";
export default defineComponent({
  name: "LatestMusic",
  setup() {
    const store = useStore();
    const state: any = useState("Latest", ["newMusicList", "newDiscList"]);
    /* 切换页面 */
    const isShow = ref(true);
    /* 记录滚动添加数 */
    const loadNum = ref(20);
    store.dispatch("Latest/getNewMusicList"); //默认请求新歌速递
    const setType: any = reactive([0, "ALL"]);
    const refTagNav = ref<typeof TagNav>(TagNav);
    /* 新歌速递标签导航 */
    const tagNav = reactive([
      { id: 0, title: "全部" },
      { id: 7, title: "华语" },
      { id: 96, title: "欧美" },
      { id: 8, title: "日本" },
      { id: 16, title: "韩国" },
    ]);
    /* 新碟上架标签导航 */
    const tagNav2 = reactive([
      { id: "ALL", title: "全部" },
      { id: "ZH", title: "华语" },
      { id: "EA", title: "欧美" },
      { id: "JP", title: "日本" },
      { id: "KR", title: "韩国" },
    ]);
    /* 新碟上架请求数据 */
    const discResInfo = reactive({
      area: "ALL",
      type: "new",
      limit: 20,
      offset: 0,
    });
    /* 顶部导航切换事件 */
    const navChange = (navTitle: string) => {
      loadNum.value = 20;
      if (navTitle == "新碟上架") {
        store.dispatch("Latest/getNewDiscList", discResInfo);
      }
      isShow.value = navTitle == "新歌速递" ? true : false;
      refTagNav.value.isTitle = isShow.value ? setType[0] : setType[1];
    };
    /* 标签点击事件 */
    const tagChangeClick = (area: number | string, type?: string) => {
      loadNum.value = 20;
      /* 请求新碟上架数据 */
      if (typeof area == "string" && type) {
        let arr = [area, type];
        state.newDiscList.value.length = 0;
        discResInfo.area = area;
        discResInfo.type = type;
        changeTag(
          () => store.dispatch("Latest/getNewDiscList", discResInfo),
          arr,
          700
        );
        setType[1] = area;
      }
      /* 请求新歌速递数据 */
      if (typeof area == "number") {
        state.newMusicList.value.length = 0;
        //请求防抖
        changeTag(
          () => store.dispatch("Latest/getNewMusicList", area),
          area,
          700
        );
        setType[0] = area;
      }
    };
    /* 全部和热门点击事件 */
    const rightTagClick = (area: string, type: string) => {
      loadNum.value = 20;
      tagChangeClick(area, type);
    };
    /* 每次滚动，获取10条数据 */
    const scrollLoad = () => {
      loadNum.value += 10;
    };
    return {
      isShow,
      refTagNav,
      ...state,
      loadNum,
      tagNav,
      tagNav2,
      navChange,
      tagChangeClick,
      rightTagClick,
      scrollLoad,
    };
  },
  components: {
    HeadNav,
    TagNav,
    NewMusic,
    NewDisc,
    Iscroll,
  },
});
</script>

<style scoped></style>
