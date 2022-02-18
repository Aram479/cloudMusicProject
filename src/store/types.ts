/* 根store */
export interface IRootState {
  player?: any;
}

/* home页面类型 */
export interface IHomeState {
  swiperList: any[];
  commendList: any[];
  aloneList: any[];
  newMusicList: any[];
  commendMvList: any[];
  djprogramList: any[];
}

/* 歌单列表页面类型 */
export interface IPlayListState {
  tagList: any[];
  playList: any[];
  userSheet: any[];
  total: number;
}

/* 榜单列表页面类型 */
export interface IRankListState {
  rankList: any[];
  officialList: any[];
  styleList: any[];
  globalList: any[];
}

/* 歌手页面类型 */
export interface IArtistListState {
  songerList: any[];
}

/* 最新音乐页面类型 */
export interface ILatestState {
  newMusicList: any[];
  newDiscList: any[];
}

/* 视频页面类型 */
export interface IVideoState {
  tagRList: any[];
  tagList: any[];
  videoList: any[];
  videoAllList: any[];
  videoDetail: any;
  errMsg: string;
}
/* 歌单详情页面类型 */
export interface IDetailState {
  listDetail: any;
  commentList: any;
  artistDetail: any;
  albumDetail: any;
}
/* 搜索类型 */
export interface IsearchState {
  searchInfo: any;
  searchTypeInfo: any;
  searchHot: any[];
}
/* 登录类型 */
export interface ILoginState {
  userData: any;
  token: string;
  loginResErr: string;
}
