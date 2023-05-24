import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pages/index.vue"),
    children: [
      {
        path: "/index",
        component: () => import("@/views/index.vue"),
      },
      {
        path: "/rank",
        component: () => import("@/views/rankList.vue"),
      },
      {
        path: "/songList",
        component: () => import("@/views/songList.vue"),
      },
      {
        path: "/mv",
        component: () => import("@/views/mv.vue"),
      },
      {
        path: "/mvDetail",
        component: () => import("@/components/mvDetail/mvDetail.vue"),
      },
      {
        path: "/playListDetail",
        component: () =>
          import("@/components/playListDetail/playListDetail.vue"),
      },
      {
        path: "/singer",
        component: () => import("@/views/singer.vue"),
      },
      {
        path: "/my",
        component: () => import("@/views/myMusic.vue"),
      },
      {
        path: "/",
        redirect: "/index",
      },
      // {
      //   path: "/searchDetail",
      //   component: () => import("../views/searchDetail/searchDetail.vue"),
      // },
      // {
      //   path: "/videoPlay",
      //   component: () => import("../views/videoPlay/videoPlay.vue"),
      // },
    ],
  },
  {
    path: "/login",
    component: () => import("@/pages/login.vue"),
  },
  // {
  //   path:'/test',
  //   component: () => import("../components/test.vue")
  // },
  // {
  //   path:'/jsx',
  //   component: () => import("../components/jsx")
  // }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
