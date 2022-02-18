<template>
  <div id="navHeader">
    <el-row>
      <!-- 左边 -->
      <el-col :span="4">
        <div class="header-left">
          <!-- 图片提示 -->
          <el-tooltip
            class="box-item"
            effect="light"
            content="回到首页"
            placement="right"
          >
            <div class="home-img" @click="homeClick">
              <img src="@/assets/img/cat1.png" alt="首页" />
            </div>
          </el-tooltip>

          <div>
            <!-- 后退 -->
            <el-tooltip
              class="box-item"
              effect="light"
              content="后退"
              placement="left"
            >
              <i class="iconfont icon-common_icon_left" @click="backClick"></i>
            </el-tooltip>

            <!-- 前进 -->
            <el-tooltip
              class="box-item"
              effect="light"
              content="前进"
              placement="right"
            >
              <i
                class="iconfont icon-navbar_icon_right"
                @click="forwardClick"
              ></i>
            </el-tooltip>
          </div>
        </div>
      </el-col>
      <!-- 右边 -->
      <el-col :span="20">
        <!-- 导航 -->
        <div class="header-right">
          <!-- 每个导航item -->
          <div
            :class="['nav-right-box', isRouter === item.router ? 'active' : '']"
            v-for="item in headerRouter"
            :key="item.router"
            @click="headerClick(item.router)"
            v-show="isHeaderRight"
          >
            <span>{{ item.title }}</span>
          </div>
          <!-- 搜索功能 -->
          <SearchVue ref="refSearchVue" @handleChangeValue="handleChangeValue">
            <!-- 热搜榜 -->
            <template #box1>
              <div class="hot" v-if="searchHot.length">
                <div class="hot-title">热搜榜</div>
                <div class="hot-list">
                  <!-- 每个item项 -->
                  <div
                    class="hot-item"
                    v-for="(item, index) in searchHot"
                    :key="index"
                    @click="hotClick(item.searchWord)"
                  >
                    <!-- 索引 -->
                    <div class="hot-item-index">{{ index + 1 }}</div>
                    <!-- 名字和热图片 -->
                    <div class="hot-item-name">
                      <!-- 名字 -->
                      <span class="hot-name">{{ item.searchWord }}</span>
                      <!-- 图片 -->
                      <el-image
                        class="icon-hot"
                        :src="item.iconUrl"
                        v-show="item.iconType"
                      ></el-image>
                    </div>
                    <!-- 热搜值 -->
                    <div class="search-count">{{ item.score }}</div>
                  </div>
                </div>
              </div>
              <Loading v-else />
            </template>
            <!-- 搜索列表 -->
            <template #box2>
              <div class="search-list" v-if="Object.keys(searchInfo).length">
                <!-- 搜索结果标题 -->
                <div class="search-all" @click="resultClick">
                  <span>
                    搜索<span class="search-result">“{{ iptValue }}”</span
                    >相关的结果
                  </span>
                  <i class="iconfont icon-navbar_icon_right"></i>
                </div>
                <!-- 搜索类型 -->
                <div class="search-type">
                  <!-- 单曲 -->
                  <div class="search-music" v-if="searchInfo?.songs">
                    <div class="type-title">
                      <i class="iconfont icon-music"></i>
                      <span>单曲</span>
                    </div>
                    <!-- 单曲item -->
                    <div
                      class="item music-item linelittle"
                      v-for="song in searchInfo?.songs"
                      :key="song.id"
                    >
                      <!-- 单曲名 -->
                      <span
                        class="music-name"
                        v-html="lightKeyword(song.name, iptValue)"
                      ></span>
                      <span class="line">-</span>
                      <!-- 歌手 -->
                      <span
                        class="music-songers"
                        v-for="songer in song.artists"
                        :key="songer.id"
                      >
                        <span>{{ songer.name }}</span>
                        <span class="slash">/</span>
                      </span>
                    </div>
                  </div>
                  <!-- 歌手 -->
                  <div class="search-songer" v-if="searchInfo?.artists">
                    <!-- 标题 -->
                    <div class="type-title">
                      <i class="iconfont icon-user2"></i>
                      <span>歌手</span>
                    </div>
                    <!-- 歌手item -->
                    <div
                      class="item artists-item linelittle"
                      v-for="artist in searchInfo?.artists"
                      :key="artist.id"
                      @click="songerClick(artist.id)"
                    >
                      <!-- 歌手名 -->
                      <span
                        class="artists-name"
                        v-html="lightKeyword(artist.name, iptValue)"
                      ></span>
                    </div>
                  </div>
                  <!-- 专辑 -->
                  <div class="search-album" v-if="searchInfo?.albums">
                    <!-- 标题 -->
                    <div class="type-title">
                      <i class="iconfont icon-album-line"></i>
                      <span>专辑</span>
                    </div>
                    <!-- 专辑item -->
                    <div
                      class="item music-item linelittle"
                      v-for="album in searchInfo?.albums"
                      :key="album.id"
                      @click="albumClick(album.id)"
                    >
                      <!-- 专辑名 -->
                      <span
                        class="album-name"
                        v-html="lightKeyword(album.name, iptValue)"
                      ></span>
                      <span class="line">-</span>
                      <!-- 歌手 -->
                      <span>{{ album.artist.name }}</span>
                    </div>
                  </div>
                  <!-- 歌单 -->
                  <div class="search-sheet" v-if="searchInfo?.playlists">
                    <!-- 标题 -->
                    <div class="type-title">
                      <i class="iconfont icon-music-list"></i>
                      <span>歌单</span>
                    </div>
                    <!-- 歌单item -->
                    <div
                      class="item music-item linelittle"
                      v-for="sheet in searchInfo?.playlists"
                      :key="sheet.id"
                      @click="sheetClick(sheet.id)"
                    >
                      <!-- 歌单名 -->
                      <span
                        class="sheet-name"
                        v-html="lightKeyword(sheet.name, iptValue)"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <Loading v-else loadTitle="载入中或暂无数据..." />
            </template>
          </SearchVue>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { useState } from "@/hooks/mapGet/index.js";
import { brightenKeyword } from "@/hooks/lightKeyword";
import SearchVue from "@/baseui/search/Search.vue";
import Loading from "@/baseui/loading/loading.vue";
export default defineComponent({
  name: "navHeader",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const refSearchVue = ref<InstanceType<typeof SearchVue>>();
    const state: any = useState("Search", ["searchInfo", "searchHot"]);
    const iptValue = ref("");

    store.dispatch("Search/getHotSearch");
    let isRouter = ref(route.path);
    let isHeaderRight = ref(true);
    /* 头部导航菜单 */
    const headerRouter = reactive([
      {
        title: "个性推荐",
        router: "/main/home",
      },
      {
        title: "歌单",
        router: "/main/playlist",
      },
      {
        title: "排行榜",
        router: "/main/rankList",
      },
      {
        title: "歌手",
        router: "/main/artistList",
      },
      {
        title: "最新音乐",
        router: "/main/latestMusic",
      },
      {
        title: "独家放送",
        router: "/main/alone",
      },
    ]);
    /* 监听路由的变化 */
    watch(
      () => route.path,
      (newValue) => {
        //找不到返回-1 !== -1 表示 找到了
        if (~newValue.indexOf("/video")) {
          isHeaderRight.value = false;
        } else {
          isHeaderRight.value = true;
        }
        isRouter.value = newValue;
      },
      {
        immediate: true,
      }
    );
    /* 导航跳转路由 */
    const headerClick = (itemRouter: string) => {
      isRouter.value = itemRouter;
      router.push(itemRouter);
    };
    /* 关键字高亮 */
    const lightKeyword = brightenKeyword;
    /* 热搜item点击事件 */
    const hotClick = (keyword: string) => {
      refSearchVue.value!.inputValue = keyword;
      refSearchVue.value!.handleChangeValue();
      router.push(`/main/searchContent/${keyword}`);
    };
    /* 相关结果点击事件 */
    const resultClick = () => {
      router.push(`/main/searchContent/${iptValue.value}`);
    };
    /* 输入框值变事件 */
    const handleChangeValue = (value: string) => {
      iptValue.value = value;
      store.dispatch("Search/getSearchInfo", value);
    };
    /* 歌手点击事件 */
    const songerClick = (id: number) => {
      router.push(`/main/artistdetail/${id}`);
    };
    /* 专辑点击事件 */
    const albumClick = (id: number) => {
      router.push(`/main/albumdetail/${id}`);
    };
    /* 歌单点击事件 */
    const sheetClick = (id: number) => {
      router.push(`/main/playlistdetail/${id}`);
    };
    /* 导航回退按钮 */
    const backClick = () => {
      router.go(-1);
    };
    /* 导航前进按钮 */
    const forwardClick = () => {
      router.go(1);
    };
    /* 点击图片回到首页按钮 */
    const homeClick = () => {
      if (route.path.indexOf("/main/home") == -1) {
        router.push(`/main/home`);
      }
    };
    return {
      ...state,
      refSearchVue,
      isRouter,
      isHeaderRight,
      headerRouter,
      iptValue,
      headerClick,
      handleChangeValue,
      lightKeyword,
      hotClick,
      resultClick,
      songerClick,
      albumClick,
      sheetClick,
      backClick,
      forwardClick,
      homeClick,
    };
  },
  components: {
    SearchVue,
    Loading,
  },
});
</script>

<style scoped>
.el-row {
  height: 50px;
}

.header-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f6f6;
  height: 100%;
}
.header-left .iconfont {
  cursor: pointer;
  margin: 0px 10px;
  font-size: 20px;
}
.header-right {
  position: relative;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  font-size: 14px;
  height: 100%;
  background-color: #f9f9f9;
}
.home-img {
  cursor: pointer;
  margin-left: 20px;
}
.home-img img {
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.nav-right-box {
  color: #666;
  cursor: pointer;
  margin: 0px 10px;
}
.nav-right-box:hover {
  color: red;
  font-weight: 700;
}

/* 搜索区域 */
.hot-title {
  font-size: 15px;
  padding: 15px;
  color: #666;
}
.hot-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 15px;
}
.hot-item > * {
  margin-right: 15px;
}
.hot-item:hover {
  background: #f3f4f6;
}
.hot-item:nth-child(-n + 3) .hot-item-index {
  font-size: 16px;
  color: red;
}
.hot-name {
  font-size: 14px;
}
.icon-hot {
  height: 12px;
  margin-left: 3px;
}
.search-count {
  font-size: 12px;
  color: #9ca3af;
  font-style: oblique;
}
.type-title {
  color: #9ca3af;
  padding: 12px 8px;
}
.type-title .iconfont {
  margin-right: 5px;
}
.item {
  cursor: pointer;
  padding: 10px 20px;
}
.item:hover {
  background-color: #f3f4f6;
}
.item .line {
  margin: 0px 5px;
}
.slash {
  margin: 0px 2px;
}
.music-songers:last-child > span:last-child {
  display: none;
}
.search-all {
  cursor: pointer;
  margin-top: 10px;
  padding: 10px;
}
.search-result {
  color: #3b82f6;
}
.active {
  color: red;
  font-weight: 700;
}
</style>
