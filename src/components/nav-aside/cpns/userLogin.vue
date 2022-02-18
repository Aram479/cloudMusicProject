<template>
  <div id="userLogin">
    <!-- 用户登录了 -->
    <el-popover
      :width="318"
      v-if="Object.keys(userData).length"
      trigger="click"
      placement="right-start"
    >
      <template #reference>
        <div class="user">
          <!-- 头像 -->
          <el-avatar :size="40" :src="userData.avatarUrl"></el-avatar>
          <!-- 用户名 -->
          <span class="user-name linelittle">{{ userData.nickname }}</span>
          <!-- 右箭头图标 -->
          <el-icon :size="15">
            <template #>
              <caretRight />
            </template>
          </el-icon>
        </div>
      </template>

      <div class="userInfo">
        <!-- 动态、关注、粉丝 -->
        <div class="user-status">
          <div
            class="status-item"
            v-for="(status, index) in baseInfo"
            :key="index"
          >
            <div class="status-count">{{ status.count }}</div>
            <div class="status-title">{{ status.title }}</div>
          </div>
        </div>
        <!-- 会员、等级、商城 -->
        <div class="user-opearte">
          <el-link
            :underline="false"
            target="_blank"
            :href="opea.link"
            class="opearte-item"
            v-for="(opea, index) in opearteInfo"
            :key="index"
          >
            <i :class="['iconfont', opea.icon]"></i>
            <span>{{ opea.title }}</span>
          </el-link>
        </div>
        <div class="user-logout" @click="logoutClick">
          <i class="iconfont icon-hkquit"></i>
          <span>退出登录</span>
        </div>
      </div>
    </el-popover>
    <!-- 用户没登录 -->
    <div class="user" @click="loginClick" v-else>
      <el-avatar
        :size="40"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      ></el-avatar>
      <!-- 用户名 -->
      <span class="user-name linelittle">点击登录</span>
      <!-- 右箭头图标 -->
      <el-icon :size="15">
        <template #>
          <caretRight />
        </template>
      </el-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { useState } from "@/hooks/mapGet/index.js";
import { useStore } from "vuex";
import { ElMessageBox, ElMessage } from "element-plus";
import localCache from "@/utils/cache";
export default defineComponent({
  name: "userLogin",
  setup(props, { emit }) {
    const state: any = useState("Login", ["userData"]);
    const store = useStore();
    store.dispatch("Login/getLoginStatus"); //每次获取用户登录状态
    const userInfo = computed(() => localCache.getCache("userInfo"));
    const baseInfo = reactive([
      {
        count: userInfo.value?.djStatus,
        title: "动态",
      },
      {
        count: userInfo.value?.followeds,
        title: "关注",
      },
      {
        count: userInfo.value?.follows,
        title: "粉丝",
      },
    ]);
    const opearteInfo = reactive([
      {
        link: "https://music.163.com/#/member",
        icon: "icon-crown1",
        title: "会员中心",
      },
      {
        link: "https://music.163.com/#/user/level",
        icon: "icon-MedalofHonor",
        title: "等级",
      },
      {
        link: "https://music.163.com/store/product",
        icon: "icon-cart1",
        title: "商城",
      },
    ]);
    /* 点击登录 */
    const loginClick = () => {
      emit("loginClick");
    };
    /* 退出登录 */
    const logoutClick = () => {
      ElMessageBox.confirm("确定退出吗?", "退出确认", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        customClass: "message-box",
      })
        .then(() => {
          store.dispatch("Login/getLogout");
          ElMessage({
            type: "success",
            message: "已退出登录",
          });
        })
        .catch(() => {
          ElMessage({
            type: "error",
            message: "已取消退出登录",
          });
        });
    };
    return {
      ...state,
      baseInfo,
      opearteInfo,
      loginClick,
      logoutClick,
    };
  },
  components: {},
});
</script>

<style scoped>
.user {
  cursor: pointer;
  display: flex;
  margin: 10px 0px;
  justify-content: space-around;
  align-items: center;
}
.user-name {
  width: 140px;
}
.user-status {
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 5px;
  border-bottom: 2px solid #dfdfdf;
}
.status-item {
  text-align: center;
}
.status-count {
  font-size: 23px;
  font-weight: bold;
}
.status-title {
  font-size: 13px;
}
.status-item:hover .status-title {
  color: red;
  text-decoration: underline;
}
.user-opearte {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 2px solid #dfdfdf;
  padding: 5px 0px;
}
.opearte-item,
.user-logout {
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: flex-start;
  align-items: center;
  padding-left: 25px;
  font-size: 15px;
}
.opearte-item:hover,
.user-logout:hover {
  color: red;
  background-color: #f2f2f2;
}
.opearte-item .iconfont,
.user-logout .iconfont {
  margin-right: 8px;
  font-size: 18px;
}
.user-logout {
  cursor: pointer;
}
.icon-MedalofHonor {
  font-weight: bold;
}
</style>
<style lang="scss">
.message-box {
  position: relative;
  top: -60px;
}
</style>
