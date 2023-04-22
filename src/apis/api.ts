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
} from "@/types/home";

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
