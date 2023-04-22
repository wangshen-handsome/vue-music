/**
 * @description:
 * @return {*}
 */
export type Banner = {
  banners: any[];
  code: number;
};

/**
 * @description:
 * @return {*}
 */
export type Tags = {
  tags: any[];
  code: number;
};

/**
 * @description:
 * @return {*}
 */
export type RequestHotData = {
  limit: number;
  order: string;
  offset: number;
  cat: string;
};

/**
 * @description:
 * @return {*}
 */
export type HotList = {
  cat: string;
  code: number;
  playlists: any[];
  total: number;
};

/**
 * @description:
 * @return {*}
 */
export type RequestNewDiscData = {
  limit: number;
  offset: number;
  area: string;
  type: string;
  year: string;
  month: string;
};

/**
 * @description:
 * @return {*}
 */
export type NewDiscList = {
  code: number;
  monthData: any[];
  hasMore: boolean;
};

/**
 * @description:
 * @return {*}
 */
export type Rank = {
  artistToplist: any[];
  list: any[];
  code: number;
};

/**
 * @description:
 * @return {*}
 */
export type RequestRankList = {
  id: string;
  s?: number;
};

/**
 * @description:
 * @return {*}
 */
export type RankList = {
  code: number;
  fromUserCount: number;
  fromUsers: null;
  playlist: any[];
  privileges: any[];
  relatedVideos: null;
  resEntrance: null;
  sharedPrivilege: null;
  songFromUsers: null;
  urls: null;
};

/**
 * @description:
 * @return {*}
 */
export type RequestMvList = {
  area: string;
  type: string;
  order: string;
  limit: number;
  offset: number;
};

export type MvList = {
  code: number;
  data: any[];
  hasMore: boolean;
  count: number;
};
