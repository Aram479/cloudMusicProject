<template>
  <div id="mvList">
    <div class="alonePlay-playlist">
      <!-- 每个item -->
      <div
        :class="['alone-play-item', isUnderLine && 'active']"
        v-for="(item, index) in mvList"
        :key="item.id"
        @click="mvClick(item.id)"
      >
        <el-image fit="fill" :src="item.sPicUrl || item.picUrl"></el-image>
        <p
          :class="[
            'paylist-item-title',
            isBlod ? 'linelittle' : 'morelittle',
            isBlod && 'blod',
          ]"
        >
          {{ item.name }}
        </p>
        <span v-if="isSonger" class="songe">{{ isSonger[index] }}</span>
        <div class="animatIcon">
          <i class="iconfont icon-play"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "mvList",
  props: {
    mvList: {
      type: Array,
      default: () => [],
    },
    isBlod: {
      type: Boolean,
      default: false,
    },
    isUnderLine: {
      type: Boolean,
      default: false,
    },
    isSonger: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const router = useRouter();
    const isA = ref(false);
    const isB = ref(0);
    /* mv点击事件 */
    const mvClick = (id: number | string) => {
      router.push(`/videodetail/${id}`);
    };
    return {
      isA,
      isB,
      mvClick,
    };
  },
  components: {},
});
</script>

<style scoped lang="scss">
.alonePlay-playlist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.alone-play-item {
  position: relative;
  margin-top: 30px;
  cursor: pointer;
  width: 23%;
  height: 100%;
  overflow: hidden;
}
.alone-play-item:nth-child(-n + 4) {
  margin-top: 0;
}
.alone-play-item > .el-image {
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
</style>
