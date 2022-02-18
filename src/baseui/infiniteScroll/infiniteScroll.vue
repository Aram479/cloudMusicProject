<template>
  <div id="infiniteScroll">
    <div
      class="scroll"
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
      :infinite-scroll-distance="100"
      :infinite-scroll-delay="700"
    >
      <slot name="Iscroll">无限滚动插槽</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "infiniteScroll",
  setup(props, { emit }) {
    const load = () => {
      emit("scrollLoad");
    };
    return {
      load,
    };
  },
  components: {},
});
</script>

<style scoped>
.scroll {
  overflow: auto;
  height: 400px;
  overflow-x: hidden !important;
}
</style>
