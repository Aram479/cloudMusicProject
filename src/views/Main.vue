<template>
  <div id="Main">
    <!-- 导航 -->
    <el-container>
      <!-- 头部 -->
      <el-header><NavHeaderVue /></el-header>
      <el-container class="nav-center">
        <el-row>
          <el-col :span="4">
            <!-- 菜单 -->
            <el-aside>
              <el-scrollbar height="560px">
                <NavAsideVue />
              </el-scrollbar>
            </el-aside>
          </el-col>
          <el-col :span="20">
            <el-scrollbar height="560px" class="el-loading">
              <el-main>
                <router-view v-slot="{ Component }">
                  <transition name="wzp">
                    <component :is="Component" />
                  </transition>
                </router-view>
              </el-main>
            </el-scrollbar>
          </el-col>
        </el-row>
      </el-container>
    </el-container>
    <!-- 脚部 -->
    <PlayerDetail />
    <div class="footer">
      <Player />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavHeaderVue from "@/components/nav-header/NavHeader.vue";
import NavAsideVue from "@/components/nav-aside/NavAside.vue";
import Player from "@/components/player/player.vue";
import PlayerDetail from "@/components/player/playerDetail.vue";
export default defineComponent({
  name: "Main",
  setup() {
    return {};
  },
  components: {
    NavHeaderVue,
    NavAsideVue,
    Player,
    PlayerDetail,
  },
});
</script>

<style scoped>
#Main {
  position: relative;
  top: 30px;
  left: 60px;
  overflow: hidden;
  min-width: 1200px;
  width: calc(100vw - 120px);
  min-height: 600px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  border: 1px solid rgba(201, 201, 201, 0.6);
  border-radius: 8px;
  box-shadow: 20px 0 20px 2px #e6e6e6, -20px 0 20px 2px #e6e6e6,
    0 20px 20px 2px #e6e6e6;
}
.el-header {
  padding: 0;
  margin: 0;
  height: 50px;
}
.nav-center {
  display: block;
}
.el-aside {
  background-color: #ededed;
  width: 100%;
  height: 550px;
}
.el-main {
  padding: 0px 70px;
  padding-bottom: 70px;
  padding-top: 25px;
}

.footer {
  width: 100%;
  height: 50px;
}

.wzp-enter-active {
  animation: wzp-in 0.5s ease-out;
}

@keyframes wzp-in {
  0% {
    transform: translateX(-50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>
