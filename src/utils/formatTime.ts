import { App } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
/* 添加全局过滤器 */
const DATE_TIME_FORMAT = "YYYY-MM-DD hh:mm:ss";
export function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(utcString: string, format: string = DATE_TIME_FORMAT) {
      return dayjs.utc(utcString).format(format);
    },
  };
}
