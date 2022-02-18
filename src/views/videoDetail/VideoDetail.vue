<template>
  <div id="MvDetail">
    <el-container>
      <el-header><NavHeaderVue /></el-header>
      <el-col :span="24">
        <el-scrollbar height="600px">
          <el-main>
            <router-view>
              <transition name="wzp">
                <VideoMain />
              </transition>
            </router-view>
          </el-main>
        </el-scrollbar>
      </el-col>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavHeaderVue from "@/components/nav-header/NavHeader.vue";
import VideoMain from "./cpns/videoMain.vue";
export default defineComponent({
  name: "MvDetail",
  setup() {
    return {};
  },
  components: {
    NavHeaderVue,
    VideoMain,
  },
});
</script>

<style scoped>
#MvDetail {
  position: absolute;
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
.el-main {
  padding: 0px 70px;
  padding-top: 25px;
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
