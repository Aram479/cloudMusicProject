/**
 * "in-order": '顺序播放'
 * "list-loop": '列表循环'
 * "single-cycle": '单曲循环'
 * "shuffle": '乱序播放'
 */
 export type PlayBackType =
 | "icon-24gf-playlist3"
 | "icon-xunhuanbofang"
 | "icon-danquxunhuan"
 | "icon-random";

/** 播放器当前状态 */
export interface IPlayerState {
 showLyrics: boolean /** 是否展示歌词 */;
 expandSong: boolean /** 是否展开歌曲播放页面 */;
}

/** 歌曲当前状态 */
export interface ISongState {
 isAdjusting: boolean /** 是否正在调整播放进度 */;
}

/** 播放器播放列表状态定义 */
export interface IListState {
 listState: PlayBackType /** 播放类型 */;
 listStateDesc: string /** 播放类型文本描述 */;
 listStateIcon: PlayBackType /** 播放类型图标 */;
}

/**
* usePlayerState hook接口定义
*/
export interface IUsePlayerState {
 playerState: IPlayerState /** 歌曲列表当前状态 */;
 toggleExpandSong: (
   state?: boolean | undefined
 ) => void /** 展开｜关闭 播放列表 */;
}
