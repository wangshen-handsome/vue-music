import { defineStore } from "pinia";

import { MvData } from "@/types/mv";

import { getMvList, getMvDetail, getMvUrl } from "@/apis/api";

interface S {
  mvData: MvData;
  mvList: any[];
  mvLoading: boolean;
  artistName: string;
  cover: string;
  name: string;
  url: string;
  mvDetailLoading: boolean;
}

export const useMvStore = defineStore({
  id: "mvStore",
  state: (): S => {
    return {
      //mv请求参数
      mvData: {
        area: "全部",
        type: "全部",
        order: "上升最快",
        limit: 30,
        offset: 0,
      },
      //mv列表
      mvList: [],
      //mv加载状态
      mvLoading: false,
      artistName: "",
      cover: "",
      name: "",
      url: "",
      //mv详情加载状态
      mvDetailLoading: false,
    };
  },
  actions: {
    async actionMvList(tag: boolean = false) {
      this.mvLoading = true;

      if (!tag) {
        this.mvList = [];
        this.mvData.offset = 0;
      }

      let res = await getMvList(this.mvData);
      if (res.code === 400) {
        this.mvList = [];
        this.mvLoading = false;
        return;
      }

      this.mvLoading = false;

      this.mvList.push(...res.data);
    },
    //请求mv详情
    async actionMvDetail(id: number) {
      this.mvDetailLoading = true;
      const res = await getMvDetail(id);
      if (res.code === 200) {
        this.artistName = res.data.artistName;
        this.cover = res.data.cover;
        this.name = res.data.name;
        let r = await getMvUrl(id);
        if (res.code === 200) {
          this.url = r.data.url;
        }
      }
      this.mvDetailLoading = false;
    },
  },
});
