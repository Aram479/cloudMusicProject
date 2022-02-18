import { computed } from "vue";
/* 返回值是请求成功api数组集合总长度 */
export function isShowApi(state: any) {
  return computed(() => {
    const arr: Array<number> = [];
    for (const key in state) {
      if (state[key].value.length > 0) {
        arr.push(state[key].value.length);
      }
    }
    return arr.length === Object.keys(state).length && arr.length
  });
}
