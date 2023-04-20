import http from "./http";

import {
  RequestHotData,
  Banner,
  Tags,
  HotList,
  RequestNewDiscData,
  newDiscList,
  rankList,
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
  const res: newDiscList | any = await http.get("/top/album", params);
  return res;
};

//获取排行榜
export const getRankList = async () => {
  const res: rankList | any = await http.get("/toplist");
  return res;
};
