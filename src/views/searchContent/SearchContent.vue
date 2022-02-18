<template>
  <div id="SearchContent">
    <div class="content-box">
      <!-- 标题 -->
      <div class="topTitle">
        <span class="keyword">{{ route.params.id }}</span>
        <span class="key-count"
          >找到 {{ searchTypeInfo.total || 0 }} {{ text }}</span
        >
      </div>

      <!-- 导航 -->
      <ListDetailNav
        :navList="navList.map((item) => item.title)"
        navMarginR="30px"
        @titleClick="titleClick"
      />
      <div v-if="Object.keys(searchTypeInfo).length">
        <!--动态组件 5个页面 -->
        <component
          class="item"
          :is="componentId"
          :musicList="searchTypeInfo.songs"
          :artistList="searchTypeInfo.artists"
          :albumList="searchTypeInfo.albums"
          :videoList="searchTypeInfo.videos"
          :sheetList="searchTypeInfo.playlists"
          :inputValue="route.params.id"
        ></component>
        <!-- 分页器 -->
        <Pagination
          v-if="searchResInfo.limit < searchTypeInfo.total"
          :total="searchTypeInfo.total"
          :pageInfo="searchResInfo"
          :curtPage="curtPage"
          @changeCurrent="changeCurrent"
        />
      </div>
      <Loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import Loading from "@/baseui/loading/loading.vue";
import ListDetailNav from "@/components/list-detail/listDetailNav.vue";
import ListDetail from "@/components/list-detail/listDetail.vue";
import Pagination from "@/baseui/pagination/pagination.vue";
import SArtist from "./cpns/SArtist.vue";
import SAlbum from "./cpns/SAlbum.vue";
import SVideo from "./cpns/SVideo.vue";
import SSheet from "./cpns/SSheet.vue";
export default defineComponent({
  name: "SearchContent",
  setup() {
    const route = useRoute();
    const store = useStore();
    const state: any = useState("Search", ["searchTypeInfo"]);
    const textType = reactive(["首", "位", "张", "个", "个"]);
    const text = ref("首单曲");
    const curtPage = ref(1);
    const componentId = ref("ListDetail"); //设置动态组件
    //存储动态组件
    const arr = reactive([
      "ListDetail",
      "SArtist",
      "SAlbum",
      "SVideo",
      "SSheet",
    ]);
    /* 导航列表 */
    const navList: any = reactive([
      { type: 1, title: "单曲" },
      { type: 100, title: "歌手" },
      { type: 10, title: "专辑" },
      { type: 1014, title: "视频" },
      { type: 1000, title: "歌单" },
    ]);
    /* 请求数据 */
    const searchResInfo = reactive({
      keywords: route.params.id,
      limit: 32,
      offset: 0,
      type: 1,
    });
    // //默认请求单曲
    // store.dispatch("Search/getSearchType", searchResInfo);
    /* 导航点击事件 */
    const titleClick = (index: number) => {
      //重置分页器数据,                                       搜索封装的SVideo的videoList分页器有bug！！！！
      searchResInfo.limit = 32;
      searchResInfo.offset = 0;
      curtPage.value = 1;
      //设置标题值
      text.value = textType[index] + navList[index].title;
      //动态组件
      componentId.value = arr[index];
      //设置请求类型
      searchResInfo.type = navList[index].type;
      //请求不同类型数据
      store.dispatch("Search/getSearchType", searchResInfo);
    };
    /* 页数改变事件 */
    const changeCurrent = (page: number) => {
      //页数
      curtPage.value = page;
      //条数
      searchResInfo.offset = (page - 1) * searchResInfo.limit;
      //请求
      store.dispatch("Search/getSearchType", searchResInfo);
    };
    /* 当路由id变化则重新请求数据 */
    watch(
      () => route.params.id,
      () => {
        if (route.path.indexOf("/main/searchContent") !== -1) {
          searchResInfo.keywords = route.params.id;
          store.dispatch("Search/getSearchType", searchResInfo);
        }
      },{
        immediate:true,
      }
    );
    return {
      ...state,
      route,
      text,
      navList,
      searchResInfo,
      componentId,
      curtPage,
      titleClick,
      changeCurrent,
    };
  },
  components: {
    ListDetailNav,
    ListDetail,
    SArtist,
    SAlbum,
    SVideo,
    SSheet,
    Pagination,
    Loading,
  },
});
</script>

<style scoped>
.keyword {
  font-size: 25px;
  font-weight: 700;
  margin-right: 5px;
}
.key-count {
  color: #666;
  font-size: 14px;
}
</style>
