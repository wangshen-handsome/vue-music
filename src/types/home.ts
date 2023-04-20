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
  offset: number | string;
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
export type newDiscList = {
  code: number;
  monthData: any[];
  hasMore: boolean;
};

/**
 * @description:
 * @return {*}
 */
export type rankList = {
  artistToplist: any[];
  list: any[];
  code: number;
};
