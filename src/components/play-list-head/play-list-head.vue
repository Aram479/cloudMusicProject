<template>
  <!-- 弹出框 -->
  <div id="play-list-head">
    <!-- 标签区域 -->
    <div class="list-head-box" v-if="listTag.length && allTagList.length">
      <!-- 弹出框 -->
      <el-popover placement="bottom-start" :width="650" trigger="click">
        <template #reference>
          <!-- 左边 -->
          <div class="list-left">
            <span>{{ tagName }}</span>
            <el-icon :size="18">
              <ArrowRight />
            </el-icon>
          </div>
        </template>
        <el-scrollbar max-height="400px">
          <!-- 弹出框内容 -->
          <div class="popover-head">
            <span
              :class="[tagName === scrollTopTitle && 'isTag']"
              @click="tagClick(scrollTopTitle)"
              >{{ scrollTopTitle }}</span
            >
          </div>
          <!-- 类别区域 -->
          <div class="popover-body">
            <!-- 歌单类别区域 -->
            <template v-if="route.path === '/main/playlist'">
              <div
                class="body-item"
                v-for="(item1, index1) in cate"
                :key="index1"
              >
                <!-- 左边类别 -->
                <div class="cate-box">
                  <i :class="['iconfont', item1.icon]"></i>
                  <span>{{ item1.title }}</span>
                </div>
                <!-- 右边标签 -->
                <div class="tag-box">
                  <div
                    class="tag-list"
                    v-for="(item2, index2) in tageCateList[index1]"
                    :key="index2"
                    @click="tagClick(item2.name)"
                  >
                    <div
                      :class="[
                        'right-tag-item',
                        tageCateName == item2.name && 'isTag',
                      ]"
                    >
                      {{ item2.name }}
                      <span class="right-tag-badge" v-show="item2.hot"
                        >HOT</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <!-- 视频类别区域 -->
            <div v-else-if="route.path === '/main/video'" class="mv-cate-list">
              <div
                class="mv-cate-item"
                v-for="(item, index) in allTagList"
                :key="index"
                @click="tagClick(item.name, item.id)"
              >
                <span :class="[tageCateName == item.name && 'isTag']">{{
                  item.name
                }}</span>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </el-popover>
      <!-- 右边 -->
      <div class="list-right">
        <div
          class="list-right-tag"
          v-for="(item, index) in listTag"
          :key="index"
          @click="tagClick(item.name || item, item.id)"
        >
          <span
            :class="['tag-item', isItem === (item.name || item) && 'active']"
            >{{ item.name || item }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import { defineComponent, reactive, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "play-list-head",
  props: {
    listTag: {
      type: Array,
      default: () => [],
    },
    allTagList: {
      type: Array,
      default: () => [],
    },
    scrollTopTitle: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const route = useRoute();
    const isItem = ref("");
    const tagName = ref(props.scrollTopTitle);
    const tageCateName = ref("");
    const tageCateList: any[] = reactive([]);
    let allTagList: any[] = reactive([]);
    /* 左边分类 */
    const cate = reactive([
      {
        title: "语种",
        icon: "icon-global",
      },
      {
        title: "风格",
        icon: "icon-yinlemoshi",
      },
      {
        title: "场景",
        icon: "icon-Cafe",
      },
      {
        title: "情感",
        icon: "icon-emoji",
      },
      {
        title: "主题",
        icon: "icon-zhuti",
      },
    ]);
    /* 头部标签点击事件 */
    const tagClick:any = (tag: any, id?: number) => {
      /* 发出事件,点击同样不发出 */
      if (tagName.value !== tag) emit("changeTagName", tag, id);

      isItem.value = tag;
      tagName.value = tag;
      tageCateName.value = tag;
    };

    /* 各种标签分类(语种、HOT、风格..) */
    watchEffect(() => {
      //如果poops的allTagList有值
      if (props.allTagList.length !== 0) {
        allTagList = props.allTagList;
        /* 如果有category属性 */
        if (allTagList[0].category) {
          /* 各种标签分类(语种、HOT、风格..) */
          for (let i = 0; i < 5; i++) {
            tageCateList.push(
              allTagList
                .filter((item: any) => item.category == i)
                .map((item: any) => ({ name: item.name, hot: item.hot }))
            );
          }
        } else {
          /* 如果没有则只遍历名字 */
          for (let i = 0; i < allTagList.length; i++) {
            tageCateList.push(allTagList.map((item: any) => item.name));
          }
        }
      }
    });
    return {
      route,
      isItem,
      tagName,
      tageCateName,
      cate,
      tageCateList,
      tagClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.list-head-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.list-left {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  background-color: #cd0101;
  height: 30px;
  padding: 0px 12px;
  border-radius: 20px;
  color: white;
}
.list-right {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: rgb(158, 158, 158);
}
.list-right-tag {
  cursor: pointer;
  padding: 0px 5px;
  border-right: 2px solid #dedddd;
}
.list-right-tag:last-child {
  border-right: 0;
}
.tag-item {
  padding: 3px 10px;
}
.active {
  background-color: #cd0101;
  color: white;
  border-radius: 10px;
}

.popover-head {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid gray;
  line-height: 50px;
  padding-left: 20px;
}
.popover-head > span {
  cursor: pointer;
  padding: 3px 10px;
  box-sizing: border-box;
}

.body-item {
  display: flex;
  margin: 30px 0px;
}
.cate-box {
  display: flex;
  margin-right: 60px;
  align-items: center;
  height: 100%;
  font-size: 16px;
}
.cate-box > .iconfont {
  margin-right: 5px;
  font-size: 25px;
}
.cate-box > span {
  width: 50px;
}
.tag-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.tag-box > .tag-list {
  display: flex;
  align-items: center;
  width: 75px;
  height: 35px;
  font-size: 13px;
  margin: 0px 10px;
  margin-bottom: 5px;
}
.right-tag-item {
  cursor: pointer;
  position: relative;
  padding: 3px 10px;
  box-sizing: border-box;
}
.right-tag-badge {
  position: absolute;
  transform: scale(0.5);
  color: red;
  top: -3px;
  right: -15px;
  width: 30px;
  font-weight: 700;
}
.isTag {
  background-color: #cd0101;
  border-radius: 12px;
  color: white;
}

.mv-cate-list {
  display: flex;
  flex-wrap: wrap;
  padding: 15px 0px;
}
.mv-cate-item {
  white-space: nowrap;
  width: 80px;
  cursor: pointer;
  font-size: 13px;
  margin: 10px 20px;
  border-radius: 20px;
}
.mv-cate-item > span {
  display: inline-block;
  padding: 3px 10px;
}
</style>
