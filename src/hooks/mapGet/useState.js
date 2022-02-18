import { mapState, createNamespacedHelpers } from 'vuex'
import { useMapper } from './useMapper'

export function useState(moduleName, mapper) {
  let mapperFn = mapState  //默认mapperFn为根模块的mapState
  /* 如果moduleName有值，表示传入了子模块字符串 */
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    //将mapperFn更新为子模块的mapState
    mapperFn = createNamespacedHelpers(moduleName).mapState
  } else {
    /* 如果moduleName没有值，则只写了一个数据，且这个数据传入了moduleName
       所以mapper = moduleName
    */
    mapper = moduleName
  }
  //将数据和mapperFn传入useMapper
  return useMapper(mapper, mapperFn)
}
