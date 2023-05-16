import http from "./http";

import {
  RequestHotData,
  Banner,
  Tags,
  HotList,
  RequestNewDiscData,
  NewDiscList,
  Rank,
  RequestRankList,
  RankList,
  RequestMvList,
  MvList,
  SearchHotList,
  RequestSearchSuggestionList,
  SearchSuggestionList,
  RequestHotRadioList,
  HotRadioList,
  HotSingerList,
} from "@/types/home";

import { TopList, PlayData, PlayList } from "@/types/rankList";

import { CatList, TopPlayList, TopPlayData } from "@/types/songList";

import { MvData } from "@/types/mv";

//获取首页banner图
export const getBanner = async () => {
  const res: Banner | any = await http.get("/banner");
  return res;
};

//获取首页tags
export const getTags = async () => {
  const res: Tags | any = await http.get("/playlist/hot");
  return res;
};

//获取热门推荐列表
export const getHotList = async (params: RequestHotData) => {
  const res: HotList | any = await http.get("/top/playlist", params);
  return res;
};

//获取新碟上架列表
export const getNewDiscList = async (params: RequestNewDiscData) => {
  const res: NewDiscList | any = await http.get("/top/album", params);
  return res;
};

//获取排行榜
export const getRank = async () => {
  const res: Rank | any = await http.get("/toplist");
  return res;
};

//获取排行榜列表
export const getRankList = async (params: RequestRankList) => {
  params.s = params.s ? params.s : 8;
  const res: RankList | any = await http.get("/playlist/detail", params);
  return res;
};

//获取MV列表
export const getMv = async (params: RequestMvList) => {
  const res: MvList | any = await http.get("/mv/all", params);
  return res;
};

//获取热门搜索建议
export const getHotSearchList = async () => {
  const res: SearchHotList | any = await http.get("/search/hot");
  return res;
};

//获取搜索建议
export const getSearchSuggestionList = async (
  params: RequestSearchSuggestionList
) => {
  const res: SearchSuggestionList | any = await http.get(
    "/search/suggest",
    params
  );
  return res;
};

//获取热门电台数据
export const getHotRadioList = async (params: RequestHotRadioList) => {
  const res: HotRadioList | any = await http.get("/dj/hot", params);
  return res;
};

//获取热门歌手数据
export const getHotSingerList = async (params: RequestHotRadioList) => {
  const res: HotSingerList | any = await http.get("/top/artists", params);
  return res;
};

//获取榜单
export const getTopList = async () => {
  const res: TopList | any = await http.get("/toplist/detail");
  return res;
};

//获取歌曲列表
export const getPlayList = async (params: PlayData) => {
  const res: PlayList | any = await http.get("/playlist/detail", params);
  return res;
};

//获取歌单分类
export const getCatList = async () => {
  const res: CatList | any = await http.get("/playlist/catlist");
  return res;
};

//获取歌单列表
export const getTopPlayList = async (params: TopPlayData) => {
  const res: TopPlayList | any = await http.get("/top/playlist", params);
  return res;
};

//获取mv列表
export const getMvList = async (params: MvData) => {
  const res: MvList | any = await http.get("/mv/all", params);
  return res;
};
