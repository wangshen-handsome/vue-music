export interface SingerListData {
  type: number | string;
  area: number | string;
  initial: number | string;
  limit: number | string;
  offset: number | string;
}

export interface SingerList {
  artists: any[];
  code: number;
  more: boolean;
}
