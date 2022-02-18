<template>
  <div id='userSheet'>
    <!-- 创建和收藏的歌单 -->
      <div class="sheet-type">
        <!-- 标题 -->
        <div class="sheet-item-title" @click="titleClick">
          <i class="iconfont icon-youjiantou" v-if="!isList"></i>
          <i class="iconfont icon-xiajiantou" v-else></i>
          <span>{{sheetType}}</span>
        </div>
        <!-- 列表 -->
        <div class="sheet-list" v-show="isList">
          <div class="sheet-item" v-for="item in sheetList" :key="item" @click="userSheetClick(item.id)">
            <i class="iconfont icon-musiclist"></i>
            <span class="linelittle">{{item.name}}</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'userSheet',
  props:{
    sheetType:{
      type:String,
      default: ''
    },
    sheetList:{
      type:Array,
      default:()=>[]
    },
  },
  setup() {
    const router = useRouter()
    const userSheetClick = (id:number)=>{
      router.push(`/main/playlistdetail/${id}`)
    }
    const isList = ref(false)
    /* 显示和隐藏列表内容 */
    const titleClick = ()=>{
      isList.value = !isList.value
    }
    return {
      isList,
      userSheetClick,
      titleClick
    }
  },
  components: {

  },
})
</script>

<style scoped>
.sheet-type {
  margin: 10px 0px;
}
.sheet-item-title {
  cursor: pointer;
  padding: 0px 10px;
  font-size: 12px;
  color: #a28888;
}
.sheet-item-title > .iconfont {
  margin-right: 5px;
  font-size: 12px;
}
.sheet-list {
  padding: 10px 0px;
}
.sheet-item {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 3px 15px;
}
.sheet-item .iconfont {
  font-size: 25px;
}
.sheet-item > span {
  font-size: 13px;
}
.sheet-item:hover {
  background-color: #e5e5e5;
}
</style>
