import { computed } from "vue";
import { useStore } from "vuex";

export function useMapper(mapper, mapFn) {
  const store = useStore();
  /* 如果传入的是一个对象，则将key转为数组 */
  if (mapper.constructor == Object) {
    let arr = [];
    for (let key in mapper) {
      arr.push(key);
    }
    mapper = arr;
  }
  // 获取到对应的useState/useGetter传来的参数
  const storeStateFns = mapFn(mapper);

  // 对数据进行转换
  const storeState = {};
  /* 遍历数组数据,将每个key值以绑定computed方法并存储到storeState相应key中
     使用bind原因：因为setup不允许this，所以将mapState/mapGetter中每个方法返回值this.$store进行重定向
  */
  Object.keys(storeStateFns).forEach((fnKey) => {
    const fn = storeStateFns[fnKey].bind({ $store: store });
    storeState[fnKey] = computed(fn);
  });
  //返回存储好的数据
  return storeState;
}
