<template>
  <div id="skeleton">
    <!-- 官方榜 -->
    <!-- 标题 -->
    <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
    <div class="abc" v-for="item in 4" :key="item">
      <el-skeleton style="width: 240px; margin-right: 10px" animated>
        <template #template>
          <el-skeleton-item
            variant="image"
            style="width: 170px; height: 170px"
          />
        </template>
      </el-skeleton>
      <el-skeleton animated :rows="4" style="width: 100%" />
    </div>
    <!-- 其他榜 -->
    <div class="sheet">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <!-- 列表 -->
      <div class="sheet-list">
        <el-skeleton
          style="width: 20%; margin-bottom: 25px"
          v-for="item in 10"
          :key="item"
        >
          <template #template>
            <el-skeleton-item variant="image" class="el-skeleton__image" />
            <div class="text">
              <el-skeleton-item variant="text" style="width: 70%" />
              <el-skeleton-item variant="text" style="width: 50%" />
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "skeleton",
  setup() {
    return {};
  },
  components: {},
});
</script>

<style scoped lang="scss">
.abc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.sheet {
  margin-top: 50px;
  .el-skeleton__image {
    width: 90%;
    height: 170px;
  }
  .sheet-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .text {
    margin-top: 10px;
  }
}
</style>
