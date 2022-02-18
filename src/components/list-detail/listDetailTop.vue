<template>
  <div id="listDetailTop" v-if="Object.keys(detailTopInfo).length">
    <!-- 歌手详情数据 -->
    <div class="artist" v-if="detailType == '歌手'">
      <!-- 左边图片 -->
      <div class="top-left">
        <el-image
          :src="detailTopInfo.cover"
          :preview-src-list="[detailTopInfo.cover]"
          alt="点击查看图片"
        ></el-image>
      </div>
      <!-- 右边描述 -->
      <div class="top-right" style="justify-content: start">
        <!-- 歌手名 -->
        <div class="right-top">{{ detailTopInfo.name }}</div>
        <!-- 歌手描述信息 -->
        <div class="right-description">
          <!-- 歌曲、专辑、mv -->
          <div class="num-and-playc">
            <!-- 歌曲数 -->
            <div class="num">
              <span>单曲数：</span>
              <span>{{ detailTopInfo.musicSize }}</span>
            </div>
            <!-- 专辑量 -->
            <div class="album">
              <span>专辑数：</span>
              <span>{{ detailTopInfo.albumSize }}</span>
            </div>
            <!-- MV数 -->
            <div class="mv">
              <span>MV数：</span>
              <span>{{ detailTopInfo.mvSize }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 歌单详情数据 -->
    <div class="sheep-detail" v-else-if="detailType == '歌单'">
      <!-- 左边图片 -->
      <div class="top-left">
        <el-image
          :src="detailTopInfo.coverImgUrl"
          :preview-src-list="[detailTopInfo.coverImgUrl]"
          alt="点击查看图片"
        ></el-image>
      </div>
      <!-- 右边描述 -->
      <div class="top-right">
        <div class="right-top">{{ detailTopInfo.name }}</div>
        <!-- 创建者名称和头像 -->
        <div class="right-name">
          <img :src="detailTopInfo.creator.avatarUrl" />
          <span class="name"> {{ detailTopInfo.creator.nickname }} </span>
          <span
            >{{
              $filters.formatTime(detailTopInfo.createTime, "YYYY-MM-DD")
            }}
            创建</span
          >
        </div>
        <!-- 播放全部 -->
        <div class="right-play" @click="handlePlaylist(detailTopInfo.id)">
          <i class="iconfont icon-play1"></i>
          <span class="title">播放全部</span>
        </div>
        <!-- 歌单描述信息 -->
        <div class="right-description">
          <!-- 标签 -->
          <div class="right-tags">
            <span>标签：</span>
            <span
              class="tag-box"
              v-for="(tags, index) in detailTopInfo.tags"
              :key="tags"
              @click="tagClick(tags, detailType)"
            >
              <span>{{ tags }}</span>
              <span
                class="slash"
                v-show="index !== detailTopInfo.tags.length - 1"
                >/</span
              >
            </span>
            <span v-show="!detailTopInfo.tags.length">暂无标签</span>
          </div>
          <!-- 歌曲数和播放量 -->
          <div class="num-and-playc">
            <!-- 歌曲数 -->
            <div class="num">
              <span>歌曲数：</span>
              <span>{{ detailTopInfo.trackCount }}</span>
            </div>
            <!-- 播放量 -->
            <div class="playc">
              <span>播放量：</span>
              <span>{{ detailTopInfo.playCount }}</span>
            </div>
          </div>
          <!-- 简介 -->
          <span class="description">
            <span>简介：</span>
            <span class="aaa" v-if="detailTopInfo.description">{{
              detailTopInfo.description
            }}</span>
            <span v-else>暂无简介</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 专辑详情数据 -->
    <div class="album-detail" v-else>
      <!-- 左边图片 -->
      <div class="top-left">
        <el-image
          :src="detailTopInfo.picUrl"
          :preview-src-list="[detailTopInfo.picUrl]"
          alt="点击查看图片"
        ></el-image>
      </div>
      <!-- 右边描述 -->
      <div class="top-right">
        <div class="right-top">{{ detailTopInfo.name }}</div>
        <!-- 播放全部 -->
        <div class="right-play">
          <i class="iconfont icon-play1"></i>
          <span class="title">播放全部</span>
        </div>
        <!-- 歌单描述信息 -->
        <div class="right-description">
          <!-- 标签 -->
          <div class="right-tags">
            <span>歌手：</span>
            <span
              class="tag-box"
              v-for="songer in detailTopInfo.artists"
              :key="songer.id"
              @click="tagClick(songer.id, detailType)"
            >
              <span>{{ songer.name }}</span>
              <span class="slash">/</span>
            </span>
          </div>
          <!-- 歌曲数和播放量 -->
          <div class="num-and-playc">
            <!-- 歌曲数 -->
            <div class="num">
              <span>创建时间：</span>
              <span>{{
                $filters.formatTime(detailTopInfo.publishTime, "YYYY-MM-DD")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "listDetailTop",
  props: {
    detailTopInfo: {
      type: Object,
      default: () => ({}),
    },
    detailType: {
      type: String,
      default: "歌单",
    },
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    /* 标签点击事件，跳转到歌单 */
    const tagClick = (tag: string | number, type: string) => {
      if (type == "歌单") {
        router.push({ path: "/main/playlist", query: { tag } });
      } else if (type == "专辑") {
        router.push(`/main/artistdetail/${tag}`);
      }
    };
    /* 点击播放全部 */
    const handlePlaylist = (id: number) => {
      store.dispatch("player/setSongList", { id });
    };
    return {
      tagClick,
      handlePlaylist,
    };
  },
  components: {},
});
</script>

<style scoped>
.sheep-detail,
.artist,
.album-detail {
  display: flex;
  width: 100%;
}
.top-left {
  display: flex;
  justify-content: center;
  flex: 20%;
}
.top-left > .el-image {
  border-radius: 10px;
  width: 200px;
  height: 200px;
  margin-right: 20px;
}
.top-right {
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  flex: 80%;
}
.top-right > * {
  margin-bottom: 13px;
}
.top-right .right-top {
  font-size: 18px;
  font-weight: 700;
}
.right-name {
  display: flex;
  align-items: center;
  height: 25px;
  font-size: 13px;
  color: #666666;
}
.right-name > * {
  margin: 0px 4px;
}
.right-name .name {
  font-size: 13px;
}
.right-name > img {
  height: 100%;
  border-radius: 15px;
}
.right-play {
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 30px;
  font-size: 14px;
  background: linear-gradient(to left, #d83c32, #ff521d);
  border-radius: 30px;
}
.right-play > * {
  margin: 0px 3px;
}
.right-play .iconfont {
  position: relative;
  font-size: 18px;
  color: white;
}
.right-play .title {
  color: white;
}
.right-description {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-content: space-between;
  font-size: 12px;
}
.right-description > * {
  line-height: 20px;
  padding: 5px 0px;
}
.num-and-playc {
  display: flex;
}
.num-and-playc > * {
  margin-right: 10px;
}
.slash {
  margin: 0px 2px;
}
.tag-box {
  cursor: pointer;
  color: #0089b3de;
}
.tag-box:last-child > .slash {
  display: none;
}
.description {
  display: flex;
}
/* 超出三行... */
.aaa {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
