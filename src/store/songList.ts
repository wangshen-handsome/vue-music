import { getLocal } from "./../utils/localStorage";
import { defineStore } from "pinia";

import { formSongList } from "@/utils/format";

import { TopPlayData } from "@/types/songList";

import { getCatList, getTopPlayList, getPlayList } from "@/apis/api";

interface S {
  topPlayData: TopPlayData;
  catList: any[];
  topPlayList: any[];
  name: string;
  topPlayLoading: boolean;
  playList: any[];
  playListLoading: boolean;
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
      //歌曲列表
      playList: [],
      //歌曲列表加载状态
      playListLoading: false,
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
    async actionPlayList(id: string | number) {
      this.playListLoading = true;
      const res = await getPlayList({ id });

      res.playlist.tracks = formSongList(res.playlist.tracks, res.privileges);
      this.playList = {
        ...res.playlist,
        avatarUrl: res.playlist.creator.avatarUrl,
        nickname: res.playlist.creator.nickname,
        num: res.playlist.tracks.length,
      };
      this.playListLoading = false;
    },
  },
});
