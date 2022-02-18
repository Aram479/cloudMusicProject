import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const Main = () => import("@/views/Main.vue");
const VideoDetail = ()=> import('@/views/videoDetail/VideoDetail.vue')
const Home = () => import("@/views/home/Home.vue");
const Video = () => import("@/views/video/Video.vue");
const Alone = () => import("@/views/alone/Alone.vue");
const Music = () => import("@/views/music/Music.vue");

const Playlist = () => import("@/views/playlist/Playlist.vue");
const PlayListDetail = () =>import("@/views/playListDetail/PlayListDetail.vue");
const RankList = () => import("@/views/rankList/RankList.vue");
const ArtistList = () => import("@/views/artistList/ArtistList.vue");
const ArtistDetail= () => import("@/views/artistDetail/ArtistDetail.vue");
const LatestMusic = () => import("@/views/latestMusic/LatestMusic.vue");
const AlbumDetail = ()=>import("@/views/albumDetail/AlbumDetail.vue")
const SearchContent = ()=>import('@/views/searchContent/SearchContent.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path:  '/' || "/main",
    redirect: "/main/home",
  },
  {
    path: "/main",
    name: "main",
    component: Main,
    children: [
      {
        path: "/main/home",
        name: "home",
        component: Home,
      },
      {
        path: "/main/video",
        name: "video",
        component: Video,
      },
      {
        path: "/main/playlist",
        name: "playlist",
        component: Playlist,
      },
      {
        path: "/main/playlistdetail/:id",
        name: "playlistdetail",
        component: PlayListDetail,
      },
      {
        path: "/main/rankList",
        name: "rankList",
        component: RankList,
      },
      {
        path: "/main/artistList",
        name: "artistList",
        component: ArtistList,
      },
      {
        path: "/main/artistdetail/:id",
        name: "artistdetail",
        component: ArtistDetail,
      },
      {
        path: "/main/latestMusic",
        name: "latestMusic",
        component: LatestMusic,
      },
      {
        path: "/main/alone",
        name: "alone",
        component: Alone,
      },
      {
        path: "/main/albumdetail/:id",
        name: "albumDetail",
        component: AlbumDetail
      },
      {
        path: "/main/searchContent/:id",
        name: "searchContent",
        component: SearchContent
      },

    ],
  },
  {
    path: "/videodetail/:id",
    name: "videoDetail",
    component: VideoDetail,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
