import { defineStore } from "pinia";

import { TopPlayData } from "@/types/songList";

import { getCatList, getTopPlayList } from "@/apis/api";

interface S {
  topPlayData: TopPlayData;
  catList: any[];
  topPlayList: any[];
  name: string;
  topPlayLoading: boolean;
}

export const useSongStore = defineStore({
  id: "songStore",
  state: (): S => {
    return {
      topPlayData: {
        limit: 48,
        order: "hot",
        cat: "",
        offset: 0,
      },
      //分类数据
      catList: [],
      //歌曲列表数据
      topPlayList: [],
      //名称
      name: "全部歌单",
      topPlayLoading: false,
    };
  },
  actions: {
    async actionCatList() {
      if (this.catList.length) return;

      let res = await getCatList();

      for (let attr in res.categories) {
        this.catList.push({
          name: res.categories[attr],
          list: res.sub.filter((item: any) => item.category === Number(attr)),
        });
      }
    },
    async actionTopPlayList(tag: boolean = false) {
      this.topPlayLoading = true;

      if (!tag) {
        this.topPlayList = [];
        this.topPlayData.offset = 0;
      }

      let res = await getTopPlayList(this.topPlayData);

      if (res.cat !== "全部") {
        this.name = res.cat;
      }

      this.topPlayLoading = false;

      this.topPlayList.push(...res.playlists);
    },
  },
});
