<template>
  <div id="swiper">
    <el-carousel class="swiper" :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index" @click="swiperPlayerClick(item.targetId,item.targetType)">
        <div class="text">{{item.typeTitle}}</div>
        <el-image class="swiper-img" :src="item.imageUrl"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "swiper",
  props: {
    swiperList: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = useStore()
    /* 点击最新音乐添加背景色 */
    const swiperPlayerClick = (id:number,type:number) => {
      //播放音乐
      if(type == 1){
       store.dispatch("player/setCurrentSong", id);
      }
    };
    return {
      swiperPlayerClick
    };
  },
  components: {},
});
</script>

<style scoped>
.el-carousel-item {
  position: relative;
  overflow: hidden;
}
.el-image{
  border-radius: 5px;
}
.text {
  position:absolute ;
  bottom: 8px;
  right: 0;
  width: 80px;
  font-weight: bold;
  text-align: center;
  padding: 2px;
  font-size: 14px;
  color: white;
  background-color: #df0000d3;
  border-radius: 5px 0px;
  z-index: 20;
}
</style>
