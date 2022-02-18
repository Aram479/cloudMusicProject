<template>
  <div id="loading">
    <div
      class="play-loading"
      :style="{height: setHeight + 'px' }"
    >
      <el-icon v-if="isIcon">
        <Loading class="is-loading" />
      </el-icon>
      <span>{{ loadTitle }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "loading",
  props: {
    setHeight: {
      type: Number,
      default: 350,
    },
    loadTitle: {
      type: String,
      default: "载入中...",
    },
    isIcon:{
      type:Boolean,
      default:true
    }
  },
  setup() {
    return {};
  },
  components: {},
});
</script>

<style scoped>
.play-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height: 350px;
  font-size: 16px;
  color: #a8a8a8;
  padding: 20px 0px;
}
.is-loading {
  animation: rotating 2s linear infinite;
}
.play-loading .el-icon {
  margin-right: 5px;
  font-size: 18px !important;
}
</style>
