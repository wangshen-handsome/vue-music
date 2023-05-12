export interface TopList {
  code: number;
  artistToplist: any;
  list: any[];
  rewardToplist: any[];
}

export interface PlayData {
  s: number;
  id: string;
}

export interface PlayList {
  code: number;
  fromUserCount: number;
  fromUsers: any;
  playlist: any;
  privileges: any[];
  relatedVideos: any;
  resEntrance: any;
  sharedPrivilege: any;
  songFromUsers: any;
  urls: any;
}
