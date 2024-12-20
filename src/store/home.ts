import { defineStore } from "pinia";

import {
  getBanner,
  getTags,
  getNewDiscList,
  getRank,
  getMvList,
  getHotSearchList,
  getSearchSuggestionList,
  getHotRadioList,
  getTopPlayList,
  getHotSingerList,
} from "@/apis/api";

import {
  RequestHotData,
  RequestNewDiscData,
  RequestMvList,
  RequestSearchSuggestionList,
  R,
  RequestHotRadioList,
} from "@/types/home";

interface S {
  hotTagList: any[];
  bannerList: any[];
  bannerLoading: boolean;
  hotList: any[];
  hotLoading: boolean;
  hotData: RequestHotData;
  newDiscData: RequestNewDiscData;
  newDiscList: any[];
  newDiscLoading: boolean;
  rank: any[];
  rankList: any[];
  mvData: RequestMvList;
  mvList: any[];
  mvLoading: boolean;
  searchHotList: any[];
  searchHotListLoading: boolean;
  searchSuggestionList: R;
  searchSuggestionData: RequestSearchSuggestionList;
  hotRadioList: any[];
  hotRadioData: RequestHotRadioList;
  hotRadioLoading: boolean;
  hotSingerList: any[];
  hotSingerListData: RequestHotRadioList;
  hotSingerListLoading: boolean;
}

export const useHomeStore = defineStore({
  id: "homeStore",
  state: (): S => {
    return {
      //热门tag数据
      hotTagList: [{ name: "为您推荐" }],
      //banner数据
      bannerList: [],
      //banner加载状态
      bannerLoading: false,
      //热门推荐数据
      hotList: [],
      //页面加载状态
      hotLoading: false,
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
      newDiscLoading: false,
      //排行榜
      rank: [],
      //排行榜数据列表
      rankList: [],
      //MV请求所需要的数据
      mvData: {
        limit: 10,
        offset: 0,
        area: "",
        type: "",
        order: "",
      },
      //MV数据列表
      mvList: [],
      //MV加载状态
      mvLoading: false,
      //热门搜索建议数据
      searchHotList: [],
      //热门搜索建议状态
      searchHotListLoading: false,
      //搜索框发生变化时的数据
      searchSuggestionList: {
        albums: [],
        artists: [],
        order: [],
        playlists: [],
        songs: [],
      },
      //搜索框请求下拉数据
      searchSuggestionData: {
        keywords: "",
      },
      //热门电台数据
      hotRadioList: [],
      //热门电台请求数据
      hotRadioData: {
        offset: 0,
        limit: 9,
      },
      //热门电台加载状态
      hotRadioLoading: false,
      hotSingerList: [],
      hotSingerListData: {
        offset: 0,
        limit: 36,
      },
      hotSingerListLoading: false,
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
        let res = await getTopPlayList(this.hotData);
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
      }
    },
    async actionRank() {
      if (!this.rank.length) {
        let res = await getRank();
        this.rank.push(...res.list.splice(0, 6));
      }
    },
    async actionMvList() {
      if (!this.mvList.length || this.mvData.area) {
        this.mvLoading = true;
        this.mvList = [];
        let res = await getMvList(this.mvData);
        this.mvLoading = false;
        this.mvList.push(...res.data);
      }
    },
    async actionSearchHotList() {
      if (!this.searchHotList.length) {
        this.searchHotListLoading = true;
        let res = await getHotSearchList();
        this.searchHotListLoading = false;
        this.searchHotList.push(...res.result.hots);
      }
    },
    async actionSearchSuggestionList() {
      this.searchHotListLoading = true;
      let res = await getSearchSuggestionList(this.searchSuggestionData);
      this.searchHotListLoading = false;
      this.searchSuggestionList = res.result;
    },
    async actionHotRadioList() {
      if (!this.hotRadioList.length) {
        this.hotRadioLoading = true;
        let res = await getHotRadioList(this.hotRadioData);
        this.hotRadioLoading = false;
        this.hotRadioList.push(...res.djRadios);
      }
    },
    async actionHotSingerList() {
      if (!this.hotSingerList.length) {
        this.hotSingerListLoading = true;
        let res = await getHotSingerList(this.hotSingerListData);
        this.hotSingerListLoading = false;
        let arr: any[] = [];
        let data: any[] = [];
        for (let i = 0; i < res.artists.length; i++) {
          if (data.length === 12) {
            arr.push(data);
            data = [res.artists[i]];
          } else {
            data.push(res.artists[i]);
          }
        }
        arr.push(data);
        this.hotSingerList.push(...arr);
      }
    },
  },
});
