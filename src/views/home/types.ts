/* 推荐歌单数据类型 */
export interface IcmdPlay {
  id: number;
  name: string;
  picUrl: string;
  playCount: number;
}
/* 独家放送数据类型 */
export interface IAlonePlay {
  id: number;
  sPicUrl: string;
  copywriter: string;
}
/* 最新音乐数据类型 */
type CatName = "artists";
interface CatInfo {
  name: string;
}
export interface INewMusic {
  id: number;
  name: string;
  picUrl: string;
  song?: Record<CatName, Array<CatInfo>>;
}

/* 推荐mv类型 */
export interface CommendMv {
  id: number;
  picUrl: string;
  artists: Array<CatInfo>;
}
/* 主播电台类型 */
export interface DjPrgms extends INewMusic {
  rcmdText: string;
}
