import { defineStore } from "pinia";

import { MvData } from "@/types/mv";

import { getMvList } from "@/apis/api";

interface S {
  mvData: MvData;
  mvList: any[];
  mvLoading: boolean;
}

export const useMvStore = defineStore({
  id: "mvStore",
  state: (): S => {
    return {
      mvData: {
        area: "全部",
        type: "全部",
        order: "上升最快",
        limit: 30,
        offset: 0,
      },
      mvList: [],
      mvLoading: false,
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
  },
});
