<template>
  <div id="pagination">
    <!-- 分页数据 -->
    <div class="page" v-show="total">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageInfo.limit"
        :current-page="curtPage"
        @current-change="changeCurrent"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "pagination",
  props: {
    pageInfo: {
      type: Object,
      default: () => ({}),
    },
    total: {
      type: Number,
      default: 0,
    },
    curtPage: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { emit }) {
    const changeCurrent = (page: number) => {
      emit("changeCurrent", page);
    };
    return {
      changeCurrent,
    };
  },
  components: {},
});
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
</style>
<style>
/* 分页器颜色，不可写入scope */
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #cd0101;
  color: #fff;
}
</style>
