<template>
  <div id="albumDesc">
    <div class="desc-box">
      <div class="title">专辑介绍</div>
      <div class="text">{{ description }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "albumDesc",
  props: {
    description: {
      type: String,
      default: "",
    },
  },
  setup() {
    const data = reactive({});
    return {};
  },
  components: {},
});
</script>

<style scoped>
.desc-box {
  margin-top: 20px;
}
.title {
  color: #333333;
  font-weight: 700;
  margin-bottom: 15px;
}
.text {
  color: #666666;
  font-size: 13px;
  line-height: 25px;
}
</style>
