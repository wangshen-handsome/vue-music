import { defineStore } from "pinia";
import {
  getBanner,
  getTags,
  getHotList,
  getNewDiscList,
  getRankList,
} from "@/apis/api";
import { RequestHotData, RequestNewDiscData } from "@/types/home";

type S = {
  hotTagList: any[];
  bannerList: any[];
  bannerLoading: boolean;
  hotList: any[];
  hotLoading: boolean;
  hotData: RequestHotData;
  newDiscData: RequestNewDiscData;
  newDiscList: any[];
  newDiscLoading: boolean;
  rankList: any[];
};

export const useHomeStore = defineStore({
  id: "homeStore",
  state: (): S => {
    return {
      //热门tag数据
      hotTagList: [{ name: "为您推荐" }],
      //banner数据
      bannerList: [],
      //banner加载状态
      bannerLoading: true,
      //热门推荐数据
      hotList: [],
      //页面加载状态
      hotLoading: true,
      //hotList请求所需要的数据
      hotData: {
        limit: 6,
        order: "hot",
        offset: 0,
        cat: "",
      },
      //newDiscList请求所需要的数据
      newDiscData: {
        limit: 18,
        offset: 0,
        area: "all",
        type: "new",
        year: "",
        month: "",
      },
      //newDiscList数据
      newDiscList: [],
      //页面加载状态
      newDiscLoading: true,
      //排行榜数据
      rankList: [],
    };
  },
  actions: {
    async actionBannerList() {
      if (!this.bannerList.length) {
        this.bannerLoading = true;
        let res = await getBanner();
        this.bannerList.push(...res.banners);
        this.bannerLoading = false;
      }
    },
    async actionHotTagList() {
      if (this.hotTagList.length === 1) {
        let res = await getTags();
        this.hotTagList.push(...res.tags.splice(0, 6));
      }
    },
    async actionHotList() {
      if (!this.hotList.length || this.hotData.cat !== "") {
        this.hotList = [];
        this.hotLoading = true;
        let res = await getHotList(this.hotData);
        this.hotLoading = false;
        this.hotList.push(...res.playlists);
      }
    },
    async actionNewDiscList() {
      if (!this.newDiscList.length || this.newDiscData.area !== "all") {
        this.newDiscList = [];
        this.newDiscLoading = true;
        let res = await getNewDiscList(this.newDiscData);
        this.newDiscLoading = false;
        this.newDiscList.push(...res.monthData.splice(0, 18));
        console.log(this.newDiscList);
      }
    },
    async actionRankList() {
      if (!this.rankList.length) {
        let res = await getRankList();
        this.rankList.push(...res.list.splice(0, 6));
      }
    },
  },
});
