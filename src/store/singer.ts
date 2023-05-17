import { defineStore } from "pinia";

import { SingerListData } from "@/types/singer";

import { getSingerList } from "@/apis/api";

interface S {
  singerListData: SingerListData;
  singerList: any[];
  singerLoading: boolean;
}

export const useSingerStore = defineStore({
  id: "singerStore",
  state: (): S => {
    return {
      singerListData: {
        type: -1,
        area: -1,
        initial: -1,
        limit: 28,
        offset: 0,
      },
      singerList: [],
      singerLoading: false,
    };
  },
  actions: {
    async actionSingerList(tag: boolean = false) {
      this.singerLoading = true;

      if (!tag) this.singerList = [];

      let res = await getSingerList(this.singerListData);

      this.singerLoading = false;

      this.singerList.push(...res.artists);
    },
  },
});
