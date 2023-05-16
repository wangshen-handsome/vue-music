export interface MvData {
  area: string;
  type: string;
  order: string;
  limit: number;
  offset: number;
}

export interface MvList {
  code: number;
  data: any[];
  hasMore: boolean;
  count: number;
}
