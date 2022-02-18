<template>
  <div id="Search" ref="showPanel">
    <!-- 搜索功能 -->
    <!-- 搜索框 -->
    <el-input
      clearable
      v-model="inputValue"
      size="small"
      placeholder="搜索"
      :prefix-icon="Search"
      @focus="getFocus"
      @input="handleChangeValue"
    />
    <!-- 热搜榜,插槽 -->
    <div class="hot-search" v-if="isSearch">
      <el-scrollbar height="562px">
        <slot name="box1"></slot>
      </el-scrollbar>
    </div>

    <!-- 搜索列表,插槽 -->
    <div class="search-list" v-if="isSuggest">
      <el-scrollbar height="562px">
        <slot name="box2"></slot>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
export default defineComponent({
  name: "Search",
  setup(props, { emit }) {
    const isSearch = ref(false);
    const isSuggest = ref(false);
    const showPanel = ref();
    //输入框绑定值
    const inputValue = ref("");
    //用户在文档任何地方点击时触发
    document.addEventListener("click", (e) => {
      if (showPanel.value) {
        //查找$refs.showPanel 是否包含 触发事件的标签，返回boolean e.target表示触发事件的标签
        let isSelf = showPanel.value.contains(e.target);
        if (!isSelf) {
          //若不存在
          isSearch.value = false; //则隐藏搜索div
          isSuggest.value = false; //则隐藏搜索建议
        }
      }
    });
    /* 输入框获取焦点 */
    const getFocus = () => {
      if (inputValue.value == "") {
        isSearch.value = true;
        isSuggest.value = false;
      } else {
        isSearch.value = false;
        isSuggest.value = true;
      }
    };
    //输入框值改变时事件
    const handleChangeValue = _.debounce(() => {
      emit("handleChangeValue", inputValue.value);
      getFocus();
    }, 200);
    return {
      isSearch,
      isSuggest,
      showPanel,
      inputValue,
      getFocus,
      handleChangeValue,
      Search,
    };
  },
  components: {},
});
</script>

<style scoped>
#Search {
  position: absolute;
  right: 40px;
}
.el-input {
  width: 150px;
}
.hot-search,
.search-list {
  position: absolute;
  top: 35px;
  right: -40px;
  width: 350px;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 0.14286rem 0.57143rem 0 rgb(0 0 0 / 20%);
}
</style>
