/**
 * @description:
 * @return {*}
 */
export interface Banner {
  banners: any[];
  code: number;
}

/**
 * @description:
 * @return {*}
 */
export interface Tags {
  tags: any[];
  code: number;
}

/**
 * @description:
 * @return {*}
 */
export interface RequestHotData {
  limit: number;
  order: string;
  offset: number;
  cat: string;
}

/**
 * @description:
 * @return {*}
 */
export interface HotList {
  cat: string;
  code: number;
  playlists: any[];
  total: number;
}

/**
 * @description:
 * @return {*}
 */
export interface RequestNewDiscData {
  limit: number;
  offset: number;
  area: string;
  type: string;
  year: string;
  month: string;
}

/**
 * @description:
 * @return {*}
 */
export interface NewDiscList {
  code: number;
  monthData: any[];
  hasMore: boolean;
}

/**
 * @description:
 * @return {*}
 */
export interface Rank {
  artistToplist: any[];
  list: any[];
  code: number;
}

/**
 * @description:
 * @return {*}
 */
export interface RequestRankList {
  id: string;
  s?: number;
}

/**
 * @description:
 * @return {*}
 */
export interface RankList {
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
}

/**
 * @description:
 * @return {*}
 */
export interface RequestMvList {
  area: string;
  type: string;
  order: string;
  limit: number;
  offset: number;
}

/**
 * @description:
 * @return {*}
 */
export interface MvList {
  code: number;
  data: any[];
  hasMore: boolean;
  count: number;
}

/**
 * @description:
 * @return {*}
 */
export interface SearchHotList {
  code: number;
  result: {
    hots: any[];
  };
}

/**
 * @description:
 * @return {*}
 */
export interface RequestSearchSuggestionList {
  keywords: string;
}

/**
 * @description:
 * @return {*}
 */
export interface SearchSuggestionList {
  code: number;
  result: R;
}

export interface R {
  albums: any[];
  artists: any[];
  order: any[];
  playlists: any[];
  songs: any[];
}

/**
 * @description:
 * @return {*}
 */
export interface RequestHotRadioList {
  limit: number;
  offset: number;
}

/**
 * @description:
 * @return {*}
 */
export interface HotRadioList {
  code: number;
  djRadios: any[];
  hasMore: boolean;
}

/**
 * @description:
 * @return {*}
 */
export interface HotSingerList {
  code: number;
  artists: any[];
  more: boolean;
}
