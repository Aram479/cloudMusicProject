import { ref } from "vue";

/* 标签改变获取标签数据 */
const isShow = ref(true); //显示隐藏加载中
const setTage = ref(""); //记录标签名
const timer = ref<any>(null); //记录定时器
export function changeTag(callback: any, tag: any, wait: number = 1000) {
  /* 若请求正在加载中且定时器不为空，则清空上一个定时器 */
  if (!isShow.value && timer.value != null) {
    clearTimeout(timer.value);
  }
  /* 若标签不同，则添加定时器 */
  if (tag !== setTage.value) {
    timer.value = setTimeout(() => {
      callback && callback();
      setTage.value = tag;
    }, wait);
    isShow.value = false;
    return isShow.value;
  }
  return true;
}
