<template>
  <div id="ArtistList" v-if="songerList.length">
    <!-- 类别选择区域 -->
    <ListHead
      :leftTitle="leftTitle"
      :rightTitle="rightTitle"
      @tagClick="tagClick"
    />
    <!-- 歌手列表区域 -->
    <SongerList class="scroll" :songerList="songerList" />
    <!-- 数字输入框替代分页器，因为接口没有total，不知道总数据有多少 -->
    <div class="page-number" v-if="songerList.length">
      <div>
        <span class="prompt">~这是分页器,不许笑！~</span>
      </div>
      <el-input-number v-model="page" :min="1" :max="23" @change="pageChange" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { isNumber } from "lodash";
import ListHead from "./cpns/list-head.vue";
import SongerList from "./cpns/songer-list.vue";
export default defineComponent({
  name: "ArtistList",
  setup() {
    const state = useState("Artist", ["songerList"]);
    const store = useStore();
    //标签请求数据
    const tagInfo = reactive({
      type: -1,
      area: -1,
      initial: -1,
      limit: 42,
      offset: 0,
    });
    store.dispatch("Artist/getArtistTag", tagInfo);
    const page = ref(1);
    const CHARCODE_A_UC = 65; //大写A
    /* 语种分类 */
    const languages = reactive([
      { id: -1, title: "全部" },
      { id: 7, title: "华语" },
      { id: 96, title: "欧美" },
      { id: 8, title: "日本" },
      { id: 16, title: "韩国" },
      { id: 0, title: "其他" },
    ]);
    /* 歌手分类 */
    const songerSort = reactive([
      { id: -1, title: "全部" },
      { id: 1, title: "男歌手" },
      { id: 2, title: "女歌手" },
      { id: 3, title: "乐队组合" },
    ]);
    /* 筛选分类,26个英文字母，懒得一个个敲了 */
    const screen: any = computed(() =>
      new Array(26)
        .fill(null)
        .map((v, i) => String.fromCharCode(CHARCODE_A_UC + i))
    );
    screen.value.unshift({ id: -1, title: "热门" }); //在筛选数组最前添加
    screen.value.push({ id: 0, title: "#" }); //在数组最后添加
    const leftTitle = reactive(["语种", "分类", "筛选"]);
    const rightTitle = reactive([languages, songerSort, screen.value]);

    /* 点击标签发送数据 */
    const tagClick = (tagArr: any[]) => {
      page.value = 1;
      tagInfo.offset = 0;
      tagInfo.type = tagArr[1];
      tagInfo.area = tagArr[0];
      tagInfo.initial = isNumber(tagArr[2])
        ? tagArr[2]
        : tagArr[2].toLowerCase();
      /* 调用标签接口 */
      store.dispatch("Artist/getArtistTag", tagInfo);
    };
    /* 数字输入框改变事件 */
    const pageChange = (page: number) => {
      tagInfo.offset = (page - 1) * tagInfo.limit;
      store.dispatch("Artist/getArtistTag", tagInfo);
    };
    return {
      ...state,
      page,
      leftTitle,
      rightTitle,
      tagClick,
      pageChange,
    };
  },
  components: {
    ListHead,
    SongerList,
  },
});
</script>

<style scoped>
.page-number {
  position: fixed;
  bottom: 120px;
  z-index: 999;
}
.prompt {
  display: none;
  padding: 3px 6px;
  background-color: rgba(58, 58, 58, 0.7);
  font-size: 12px;
  color: white;
  border-radius: 10px;
  margin-bottom: 3px;
}
.page-number:hover .prompt {
  display: inline-block;
}
</style>
