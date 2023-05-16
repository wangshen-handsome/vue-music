export interface CatList {
  code: number;
  all: any;
  categories: any;
  sub: any[];
}

export interface TopPlayList {
  code: number;
  cat: string;
  more: boolean;
  playlists: any[];
  total: number;
}

export interface TopPlayData {
  limit: number;
  order: string;
  cat: string;
  offset: number;
}
