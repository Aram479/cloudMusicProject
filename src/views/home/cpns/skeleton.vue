<template>
  <div id="skeleton">
    <!-- 轮播骨架屏 -->
    <el-carousel
      :interval="3000"
      type="card"
      height="200px"
      indicator-position="none"
      arrow="never"
      :autoplay="false"
    >
      <el-carousel-item v-for="item in 3" :key="item">
        <el-skeleton animated>
          <template #template>
            <el-skeleton-item variant="image" style="height: 200px" />
          </template>
        </el-skeleton>
      </el-carousel-item>
    </el-carousel>
    <!-- 歌单骨架 -->
    <div class="sheet">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <!-- 列表 -->
      <div class="sheet-list">
        <el-skeleton
          animated
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
    <!-- 独家放送骨架 -->
    <div class="alone">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <div class="alone-list">
        <el-skeleton animated v-for="item in 4" :key="item" style="width: 23%">
          <template #template>
            <el-skeleton-item variant="image" />
            <div class="text">
              <el-skeleton-item variant="p" style="width: 90%" />
              <el-skeleton-item variant="p" style="width: 50%" />
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
    <!-- 音乐列表骨架 -->
    <div class="music">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <!-- 列表 -->
      <div class="music-list">
        <!-- 每个列表项 -->
        <div class="list-item" v-for="item in 4" :key="item">
          <el-skeleton animated style="width: 40%">
            <template #template>
              <el-skeleton-item variant="image" />
            </template>
          </el-skeleton>
          <el-skeleton :rows="2" variant="text" style="width: 100%" animated />
        </div>
      </div>
    </div>

    <!-- 独家放送骨架 -->
    <div class="alone">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <div class="alone-list">
        <el-skeleton animated v-for="item in 4" :key="item" style="width: 23%">
          <template #template>
            <el-skeleton-item variant="image" />
            <div class="text">
              <el-skeleton-item variant="p" style="width: 90%" />
              <el-skeleton-item variant="p" style="width: 50%" />
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
    <!-- 音乐列表骨架 -->
    <div class="music">
      <!-- 标题 -->
      <el-skeleton :rows="0" animated style="width: 40%; margin: 10px 0px" />
      <!-- 列表 -->
      <div class="music-list">
        <!-- 每个列表项 -->
        <div class="list-item" v-for="item in 4" :key="item">
          <el-skeleton animated style="width: 40%">
            <template #template>
              <el-skeleton-item variant="image" />
            </template>
          </el-skeleton>
          <el-skeleton :rows="2" variant="text" style="width: 100%" animated />
        </div>
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

<style scope lang="scss">
.el-image {
  border-radius: 5px;
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
.alone {
  margin-top: 30px;
  .el-skeleton__image {
    width: 100%;
    height: 140px;
  }
  .alone-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .text {
    margin-top: 10px;
  }
}
.music {
  margin-top: 30px;
  .el-skeleton__image {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
  }
  .music-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .list-item {
    width: 45%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
