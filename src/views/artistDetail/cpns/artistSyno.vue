<template>
  <!-- 歌手描述 -->
  <div id="artistSyno" v-if="artistDesc.length">
    <div class="desc-box">
      <div class="desc-item" v-for="item in artistDesc" :key="item">
        <div class="title">{{ item.ti }}</div>
        <div class="text" v-for="text in item.txt.split('\n')" :key="text">
          <span>{{ text }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="no-data" v-else>暂无详情数据~</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "artistSyno",
  props: {
    artistDesc: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const data = reactive({});
    return {};
  },
  components: {},
});
</script>

<style scoped>
.desc-item {
  margin-bottom: 30px;
}
.desc-item:last-child {
  margin-bottom: 0px;
}
.title {
  color: #797979;
  font-weight: 700;
  margin-bottom: 20px;
}
.text {
  margin-bottom: 25px;
  color: #929292;
  font-size: 13px;
  line-height: 25px;
}
</style>
