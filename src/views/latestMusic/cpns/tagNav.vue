<template>
  <div id="tagNav">
    <!-- 标签导航 -->
    <div class="nav-box">
      <!-- 左边导航文本 -->
      <div
        v-for="item in tagNav"
        :key="item.id"
        :class="['nav-title-box', isTitle == item.id && 'active']"
        @click="tagChangeClick(item.id, item.id)"
      >
        <span class="nav-title">{{ item.title }}</span>
      </div>
    </div>
    <!-- 右边推荐和全部 -->
    <div class="hot-or-all" v-show="!isShow">
      <div
        class="right-item"
        v-for="item in rightTag"
        :key="item.id"
        @click="rightTagClick(item.id)"
      >
        <span
          :class="['right-title', isRightTag == item.id && 'right-active ']"
          >{{ item.title }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "tagNav",
  props: {
    tagNav: {
      type: Array,
      default: () => [],
    },
    /* 是否显示热门和全部 */
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    /* 右边标签 */
    const rightTag = reactive([
      { id: "new", title: "全部" },
      { id: "hot", title: "热门" },
    ]);
    let isTitle = ref<string | number>(0);
    const isTag = ref<number | string>("0"); //存储左边标签
    const isRightTag = ref("new"); //存储右边标签
    /* 切换标签事件 */
    const tagChangeClick = (id: number, title: string) => {
      if (isTag.value != id) emit("tagChangeClick", id, isRightTag.value);
      isTitle.value = title;
      isTag.value = id;
    };
    /* 右边标签切换事件,id就是string */
    const rightTagClick = (id: string) => {
      if (isRightTag.value != id)
        emit("rightTagClick", String(isTag.value), id);
      isRightTag.value = id;
    };
    return {
      isTag,
      isRightTag,
      isTitle,
      rightTag,
      tagChangeClick,
      rightTagClick,
    };
  },
  components: {},
});
</script>

<style scoped>
#tagNav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.nav-box {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.nav-title-box {
  display: flex;
}
.nav-title {
  cursor: pointer;
  margin-right: 20px;
}
.hot-or-all {
  display: flex;
}
.right-item:first-child {
  border-right: 1px solid gray;
}
.right-item {
  padding: 0 15px;
}
.right-title {
  cursor: pointer;
  padding: 3px 10px;
}
.right-active {
  border-radius: 12px;
  background-color: #cd0101;
  color: white;
}
.active {
  font-weight: 700;
}
</style>
