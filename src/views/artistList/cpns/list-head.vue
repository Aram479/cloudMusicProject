<template>
  <div id="list-head">
    <div class="songer-head">
      <!-- 头部分类盒子 -->
      <div
        class="songer-title"
        v-for="(item1, index1) in leftTitle"
        :key="item1"
      >
        <!-- 左边分类 -->
        <div class="left-title">{{ item1 }}：</div>
        <!-- 右边分类 -->
        <div class="title-box">
          <div
            v-for="item2 in rightTitle[index1]"
            :key="item2.id"
            :class="{
              'title-text': true,
              active: (item2.id ?? item2) == tag[index1],
            }"
            @click="titleClick(index1, item2)"
          >
            <span>{{ item2.title || item2 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "list-head",
  props: {
    /* 左边分类 */
    leftTitle: {
      type: Array,
      default: () => [],
    },
    /* 右边分类 */
    rightTitle: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    //存储标签id
    let tag = ref<Array<any>>([-1, -1, -1]);
    /* 标签点击事件 */
    const titleClick = (index1: number, itemB: any) => {
      tag.value[index1] = itemB.id ?? itemB;
      tag.value = Array.from(tag.value);
      emit("tagClick", tag.value);
    };
    return {
      tag,
      titleClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.songer-title {
  display: flex;
  margin-bottom: 15px;
  font-size: 13px;
  align-items: flex-start;
}
.left-title {
  margin-right: 10px;
  white-space: nowrap;
}
.title-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  color: #a5a5a5;
}
.title-text {
  cursor: pointer;
  width: 70px;
  text-align: center;
  margin-bottom: 15px;
  border-right: 3px solid #a7a7a7;
}
.title-text:last-child {
  border-right: 0;
}
.title-text > span {
  padding: 3px 6px;
}
.active > span {
  background-color: #cd0101;
  border-radius: 10px;
  color: white;
}
</style>
