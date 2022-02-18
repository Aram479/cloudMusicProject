<template>
  <div id="newDisc">
    <div class="disc-box" v-if="newDiscList.length">
      <!-- 左边日期 -->
      <div class="date">
        <div class="month">{{ $filters.formatTime(date, "MM") }}</div>
        <div class="year">{{ $filters.formatTime(date, "YYYY") }}</div>
      </div>
      <!-- 右边新碟列表 -->
      <div class="disc">
        <div
          class="disc-item"
          v-for="item in newDiscList"
          :key="item.id"
          @click="albumClick(item.id)"
        >
          <el-image :src="item.picUrl">
            <template #placeholder>
              <img src="@/assets/img/no-img.bb9c4fe3.png" />
            </template>
          </el-image>
          <div class="name linelittle">{{ item.name }}</div>
          <div class="songer linelittle">
            <span
              class="songer-item"
              v-for="songer in item.artists"
              :key="songer.id"
            >
              <span class="songer-name">{{ songer.name }}</span>
              <span class="slash">/</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Loading from "@/baseui/loading/loading.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "newDisc",
  props: {
    newDiscList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    const date = Date.now();
    /* 点击专辑跳转详情 */
    const albumClick = (id: number) => {
      router.push(`/main/albumdetail/${id}`);
    };
    return {
      date,
      albumClick,
    };
  },
  components: {
    Loading,
  },
});
</script>

<style scoped>
.disc-box {
  display: flex;
}
.date {
  margin-right: 25px;
}
.month,
.year {
  font-weight: bold;
}
.month {
  font-size: 23px;
  margin-bottom: 3px;
}
.year {
  font-size: 13px;
}
.disc {
  display: flex;
  flex-wrap: wrap;
  width: calc(100% - 56px);
}
.disc-item {
  width: 140px;
  margin-right: calc(25% - 175px);
  box-sizing: border-box;
  margin-bottom: 36px;
}
.disc-item > .el-image,
.disc-item img {
  width: 140px;
  height: 140px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #ededed;
  border-radius: 4px;
}
.disc-item > .name {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
  margin-top: 10px;
  cursor: pointer;
}
.disc-item > .songer {
  align-items: center;
  color: #aaa;
  font-size: 13px;
  margin-top: 4px;
  cursor: pointer;
}
.disc-item:nth-child(5n) {
  margin-right: 0;
}
.songer-item > .slash {
  margin: 0px 4px;
}
.songer-item:last-child > span:last-child {
  display: none;
}
</style>
