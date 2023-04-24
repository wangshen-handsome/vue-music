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

/**
 * @description:
 * @return {*}
 */
export type MvList = {
  code: number;
  data: any[];
  hasMore: boolean;
  count: number;
};

/**
 * @description:
 * @return {*}
 */
export type SearchHotList = {
  code: number;
  result: {
    hots: any[];
  };
};

/**
 * @description:
 * @return {*}
 */
export type RequestSearchSuggestionList = {
  keywords: string;
};

/**
 * @description:
 * @return {*}
 */
export type SearchSuggestionList = {
  code: number;
  result: R;
};

export type R = {
  albums: any[];
  artists: any[];
  order: any[];
  playlists: any[];
  songs: any[];
};

/**
 * @description:
 * @return {*}
 */
export type RequestHotRadioList = {
  limit: number;
  offset: number;
};

/**
 * @description:
 * @return {*}
 */
export type HotRadioList = {
  code: number;
  djRadios: any[];
  hasMore: boolean;
};

/**
 * @description:
 * @return {*}
 */
export type HotSingerList = {
  code: number;
  artists: any[];
  more: boolean;
};
