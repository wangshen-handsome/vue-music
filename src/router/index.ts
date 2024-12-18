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
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/rank",
        component: () => import("@/views/rankList.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/songList",
        component: () => import("@/views/songList.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/mv",
        component: () => import("@/views/mv.vue"),
        meta: {
          keepAlive: true,
        },
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
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/singerDetail",
        component: () => import("@/components/singerDetail/singerDetail.vue"),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/my",
        component: () => import("@/views/myMusic.vue"),
        meta: {
          keepAlive: true,
        },
      },
      // {
      //   path: "/searchDetail",
      //   component: () => import("../views/searchDetail/searchDetail.vue"),
      //   meta: {
      //     keepAlive: true,
      //   },
      // },
      {
        path: "/",
        redirect: "/index",
      },
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
