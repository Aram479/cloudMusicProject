<template>
  <div id="Playlist">
    <PlayListHead
      ref="listHead"
      :listTag="listTag"
      :allTagList="tagList"
      scrollTopTitle="全部歌单"
      @changeTagName="changeTagName"
    />
    <!-- 歌单列表区域 -->
    <PlayList
      v-if="isShow"
      :playList="playList"
      :total="total"
      @changeCurrent="changeCurrent"
    />
    <!-- 歌单加载组件 -->
    <Loading v-else />
    <!-- 分页数据 -->
    <Pagination
      :total="total"
      :pageInfo="pageInfo"
      :curtPage="curtPage"
      @changeCurrent="changeCurrent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { changeTag } from "@/hooks/tagCate";
import PlayListHead from "@/components/play-list-head/play-list-head.vue";
import PlayList from "@/components/play-list/playList.vue";
import Loading from "@/baseui/loading/loading.vue";
import Pagination from "@/baseui/pagination/pagination.vue";
export default defineComponent({
  name: "Playlist",
  setup() {
    const route = useRoute();
    const state: any = useState("PlayList", ["tagList", "playList", "total"]);
    const store = useStore();
    const listHead = ref<InstanceType<typeof PlayListHead>>();
    const isShow = ref(false); //显示隐藏加载中
    const listTag = ref([
      "华语",
      "流行",
      "摇滚",
      "民谣",
      "电子",
      "另类/独立",
      "轻音乐",
      "综艺",
      "影视原声",
      "ACG",
    ]);
    const pageInfo: any = reactive({
      cat: "",
      limit: 50,
      offset: 1,
    });
    const curtPage = ref(1);
    /* 如果传递过来路由标签数据 */
    if (route.query.tag) {
      /* 则加载传递的数据 */
      const mounted = onMounted(() => {
        listHead.value?.tagClick(route.query.tag);
      });
    } else {
      /* 否则默认加载全部视频 */
      store.dispatch("PlayList/getPlayList", pageInfo);
    }
    store.dispatch("PlayList/getPlayListTag");

    /* 标签改变切换标签数据*/
    const changeTagName: any = (tag: string, page?: number) => {
      if (!page) {
        curtPage.value = 1;
        pageInfo.offset = 1;
      }
      pageInfo.cat = tag;
      //请求防抖
      isShow.value = changeTag(
        () => store.dispatch("PlayList/getPlayList", pageInfo),
        page || tag,
        700
      );
    };
    /* 页数改变事件 */
    const changeCurrent = (page: number) => {
      curtPage.value = page;
      pageInfo.offset = (page - 1) * pageInfo.limit;
      changeTagName(pageInfo.cat, page);
    };
    /* 监听歌单数据改变 */
    watch(state.playList, () => {
      isShow.value = true;
    });

    return {
      ...state,
      listHead,
      listTag,
      isShow,
      curtPage,
      pageInfo,
      changeTagName,
      changeCurrent,
    };
  },
  components: {
    PlayListHead,
    PlayList,
    Loading,
    Pagination,
  },
});
</script>

<style scoped>
.skeleton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.el-skeleton {
  margin-bottom: 10px;
}
.page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
<style>
/* 分页器颜色，不可写入scope */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #cd0101;
  color: #fff;
}
</style>
