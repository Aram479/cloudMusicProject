<template>
  <div id="NavAside">
    <!-- 用户 -->
    <UserLogin @loginClick="loginClick" />
    <!-- 登录对话框 -->
    <LoginDialog ref="logDialog" />
    <!-- 音乐歌单等菜单 -->
    <div class="Aside">
      <!-- 菜单类型 -->
      <div class="musicCate">
        <div
          :class="['cate-box', isRouter === item.router ? 'active' : '']"
          v-for="item in musicCate"
          :key="item"
          @click="activeClick(item.router)"
        >
          <i :class="'iconfont ' + item.icon"></i>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
    <!-- 用户歌单项 -->
    <div class="userSheet" v-if="Object.keys(userData).length">
      <!-- 创建和收藏的歌单 -->
      <div class="sheet-type" v-for="type in userSheetType" :key="type">
        <!-- 歌单项 -->
        <UserSheet :sheetType="type.type" :sheetList="userSheet[type.data]" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import UserLogin from "./cpns/userLogin.vue";
import LoginDialog from "./cpns/loginDialog.vue";
import UserSheet from "@/baseui/userSheet/userSheet.vue";
export default defineComponent({
  name: "NavAside",
  setup() {
    const router = useRouter();
    const store = useStore();
    const route = useRoute();
    const state = useState("Login", ["userData"]); //根模块，数组形式
    const userSheet = useState("PlayList", ["userSheet"]); //根模块，数组形式
    /* 用户歌单请求 */
    const userSheetRes = reactive({
      uid: store.state.Login.userData.userId,
      limit: 30,
      offset: 0,
    });
    if (store.state.Login.userData.userId) {
      store.dispatch("PlayList/getUserSheet", userSheetRes);
    }
    const logDialog = ref<typeof LoginDialog>(LoginDialog);
    let isRouter = ref(route.path);
    /* 菜单类型格式 */
    const musicCate = reactive([
      {
        icon: "icon-netease-cloud-music-line",
        title: "发现音乐",
        router: "/main/home",
      },
      {
        icon: "icon-video1",
        title: "视频",
        router: "/main/video",
      },
    ]);
    /* 歌单列表类型 */
    const userSheetType = reactive([
      { type: "创建的歌单", data: "create" },
      { type: "收藏的歌单", data: "collect" },
    ]);

    /* 监听路由的变化 */
    watch(
      route,
      (newValue) => {
        isRouter.value = newValue.path;
      },
      {
        immediate: true,
      }
    );
    //选中菜单更改颜色
    const activeClick = (itemRouter: string) => {
      isRouter.value = itemRouter;
      /* 根据点击的路由路径，跳转/main下的子路由 */
      router.push(itemRouter);
    };
    //点击用户登录
    const loginClick = () => {
      //显示对话框
      logDialog.value.isDialog = true;
    };
    return {
      userSheetType,
      ...userSheet,
      ...state,
      logDialog,
      musicCate,
      isRouter,
      activeClick,
      loginClick,
    };
  },
  components: {
    UserLogin,
    LoginDialog,
    UserSheet,
  },
});
</script>

<style scoped>
#NavAside {
  color: #333;
  font-size: 14px;
}
.cate-box {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 3px 20px;
}
.iconfont {
  font-size: 25px;
  margin-right: 8px;
}
.play-list-box {
  display: flex;
  cursor: pointer;
  align-items: center;
  font-size: 12px;
  color: #888888;
  padding: 10px 0px;
}
.list-box-title {
  margin-left: 2px;
}
.active {
  color: #f00;
  background-color: #e0e0e0;
}
</style>
<style>
/* 登录对话框 */
.dialog {
  width: 350px;
  height: 410px;
  padding: 10px;
  border-radius: 5px;
}
</style>
