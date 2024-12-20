import { defineStore } from "pinia";

import { getTopList, getPlayList } from "@/apis/api";

import { formSongList } from "@/utils/format";

import { PlayData } from "@/types/rankList";

interface S {
  listTop: any[];
  listFeature: any[];
  listOther: any[];
  playList: any;
  playData: PlayData;
  playListLoading: boolean;
}

export const useRankStore = defineStore({
  id: "rankStore",
  state: (): S => {
    return {
      //Top榜
      listTop: [],
      //特色榜
      listFeature: [],
      //场景榜
      listOther: [],
      //歌曲列表
      playList: {},
      //请求歌曲列表需要的数据
      playData: {
        s: -1,
        id: "",
      },
      playListLoading: true,
    };
  },
  actions: {
    async actionTopList() {
      let res = await getTopList();
      this.listTop = res.list.filter((item: any) => {
        return item.ToplistType;
      });
      this.listFeature = res.list.filter((item: any) => {
        return !item.ToplistType && item.name.indexOf("云音乐") >= 0;
      });
      this.listOther = res.list.filter((item: any) => {
        return !item.ToplistType && item.name.indexOf("云音乐") < 0;
      });
    },
    async actionPlayList(num: number = 0) {
      this.playListLoading = true;
      if (
        !this.listTop.length &&
        !this.listFeature.length &&
        !this.listOther.length
      ) {
        await this.actionTopList();
      }

      if (!this.playData.id) {
        this.playData.id =
          num === 0
            ? this.listTop[0].id
            : num === 1
            ? this.listFeature[0].id
            : this.listOther[0].id;
      }
      let res = await getPlayList(this.playData);

      this.playListLoading = false;
      res.playlist.tracks = formSongList(res.playlist.tracks, res.privileges);
      this.playList = {
        ...res.playlist,
        avatarUrl: res.playlist.creator.avatarUrl,
        nickname: res.playlist.creator.nickname,
        num: res.playlist.tracks.length,
      };
    },
  },
});
