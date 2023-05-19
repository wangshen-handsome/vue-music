import { defineStore } from "pinia";

interface S {
  isPlay: boolean;
  volume: number;
  pattern: number;
  isShowVolume: boolean;
  nowSongTime: number;
  audio: any;
  duration: number;
  isEnd: boolean;
  playList: any[];
  playUrl: string;
  playIndex: number;
  loading: boolean;
  songLyrics: any[];
}

let volume = localStorage.getItem("volume");

let playList = localStorage.getItem("playList");

let playUrl = localStorage.getItem("playUrl");

let playIndex = localStorage.getItem("playIndex");

import { Message } from "@/utils/Message";

export const usePlayBarStore = defineStore({
  id: "playBarStore",
  state: (): S => {
    return {
      //是否播放
      isPlay: false,
      //音量(默认50)
      volume: volume ? Number(volume) : 50,
      //播放音乐的方式(1：顺序播放，2：随机播放，3：单曲循环)
      pattern: 1,
      //音量条是否展示
      isShowVolume: false,
      //当前播放时间
      nowSongTime: 0,
      //播放器实例
      audio: new Audio(),
      //歌曲总时长
      duration: 0,
      //歌曲是否播放结束
      isEnd: false,
      //音乐播放列表
      playList: playList ? JSON.parse(playList) : [],
      //当前播放的音乐的url
      playUrl: playUrl ? playUrl : "",
      //音乐的下标
      playIndex: playIndex ? Number(playIndex) : -1,
      //请求时的加载状态
      loading: false,
      //歌曲歌词
      songLyrics: [],
    };
  },
  actions: {
    //点击切换播放音乐的方式
    changePattern(num: number) {
      this.pattern = num;
    },
    //切换音乐的暂停播放
    changeIsPlay() {
      if (!this.playUrl) return;
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    },
    //点击播放音乐
    clickPlayMusic(item: any) {
      if (item.src === this.playUrl) {
        this.changeIsPlay();
        return;
      }
      let index = this.playList.findIndex((prop) => prop.src === item.src);
      if (index === -1) {
        this.queryById(item);
      } else {
        this.playUrl = item.src;
        this.playIndex = index;
        this.initPath();
      }
    },
    //切换音量
    changeVolume(val: number) {
      this.volume = val;
      this.audio.volume = val / 100;
      localStorage.setItem("volume", val.toString());
    },
    //切换进度条
    changeAudioCurrentTime(val: number) {
      this.nowSongTime = this.audio.currentTime = val;
    },
    //切换播放时间和是否播放结束
    changeNowSongTime(e: any) {
      this.nowSongTime = e.target.currentTime;
      this.duration = e.target.duration;
      this.isEnd = e.target.ended;
    },
    //监听歌曲是否结束事件
    listenIsEnd(isEnd: boolean) {
      if (isEnd) {
        this.playEndSound();
      }
    },
    //播放结束之后播放音乐的方式
    playEndSound(tag: boolean = true) {
      switch (this.pattern) {
        case 1:
          this.switchMusic(tag);
          break;
        case 2:
          this.randomPlay();
          break;
        case 3:
          this.onePlay();
          break;
      }
    },
    //随机播放
    randomPlay() {
      this.playIndex = Math.floor(Math.random() * this.playList.length);
      this.playUrl = this.playList[this.playIndex].src;
      this.initPath();
    },
    //单曲循环
    onePlay() {
      this.initPath();
    },
    //下一曲
    next() {
      this.playEndSound();
    },
    //上一曲
    last() {
      this.playEndSound(false);
    },
    //切换音乐(tag：用来区别上一曲还是下一曲)
    switchMusic(tag: boolean = true) {
      if (tag) {
        this.playIndex += 1;
        if (this.playIndex >= this.playList.length) {
          this.playIndex = 0;
        }
      } else {
        this.playIndex -= 1;
        if (this.playIndex < 0) {
          this.playIndex = this.playList.length - 1;
        }
      }
      this.playUrl = this.playList[this.playIndex].src;
      this.initPath();
    },
    //初始化音乐路径
    initPath() {
      if (this.playUrl === "") return;
      this.isPlay = !this.isPlay;
      this.audio.src = this.playUrl;
      this.audio.volume = this.volume / 100;
      localStorage.setItem("playList", JSON.stringify(this.playList));
      localStorage.setItem("playUrl", JSON.stringify(this.playUrl));
      localStorage.setItem("playIndex", JSON.stringify(this.playIndex));
      this.audio.play();
    },
    //向playList中增添单个数据
    playListAdd(item: any) {
      this.playList.push(item);
      this.playUrl = item.src;
      this.playIndex = this.playList.length - 1;
      this.initPath();
    },
    //向playList中增添多个数据
    playListAddMore(itemArr: any[]) {
      this.playList.push(...itemArr);
      if (this.playUrl === "") {
        this.playUrl = itemArr[0].src;
        this.playIndex = this.playList.findIndex(
          (item) => item.src === this.playUrl
        );
        this.initPath();
      }
    },
    //删除playList中的单条数据
    playListRemove(index: number) {
      if (this.playList.length === 1) {
        return this.playListRemoveAll();
      }
      if (this.playUrl === this.playList[index].src) {
        this.next();
      }
      this.playList.splice(index, 1);
    },
    //删除playList中的全部数据
    playListRemoveAll() {
      this.playList = [];
      this.playUrl = "";
      this.playIndex = -1;
      this.initPath();
    },
    //通过歌曲id查询歌曲的播放链接和歌词
    queryById(item: any) {
      this.loading = true;

      //判断是否是vip歌曲
      if (item.vip || item.license) {
        this.loading = false;
        let message = item.license
          ? "此歌暂无版权，无法播放，即将为您播放下一曲"
          : "此歌为vip歌曲，暂时无法播放，即将为您播放下一曲";
        Message({ message, type: "error" });
        setTimeout(() => {
          this.next();
        }, 1500);
        return;
      }
      //调接口
      //赋值
      this.loading = false;
    },
  },
});
