export interface SingerListData {
  type: number;
  area: number;
  initial: number;
  limit: number;
  offset: number;
}

export interface SingerList {
  artists: any[];
  code: number;
  more: boolean;
}
