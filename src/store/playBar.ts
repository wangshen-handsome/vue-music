import { defineStore } from "pinia";

import { getLrc } from "@/apis/api";

import { Message } from "@/utils/Message";

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
}

let volume = localStorage.getItem("volume");

let playList = localStorage.getItem("playList");

let playUrl = localStorage.getItem("playUrl");

let playIndex = localStorage.getItem("playIndex");

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
        if (this.nowSongTime <= 0) {
          this.queryById(this.playList[this.playIndex]);
          this.isPlay = true;
        } else {
          this.audio.play();
        }
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
        this.isPlay = true;
        this.playUrl = item.src;
        this.playIndex = index;
        this.initPath(false);
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
      this.local();
    },
    //随机播放
    randomPlay() {
      this.playIndex = Math.floor(Math.random() * this.playList.length);
      this.playUrl = this.playList[this.playIndex].src;
      this.initPath(false);
    },
    //单曲循环
    onePlay() {
      this.audio.src = this.playUrl;
      this.audio.play();
    },
    //下一曲
    next() {
      if (!this.playList.length) return;
      this.playEndSound();
    },
    //上一曲
    last() {
      if (!this.playList.length) return;
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
      this.initPath(false);
    },
    //初始化音乐路径
    initPath(tag: boolean = true) {
      if (this.playUrl === "" || !this.playList.length) return;
      this.audio = new Audio();
      if (tag) {
        this.isPlay = !this.isPlay;
      }
      this.nowSongTime = 0;
      this.audio.volume = this.volume / 100;
      this.local();
    },
    //本地存储
    local() {
      localStorage.setItem("playList", JSON.stringify(this.playList));
      localStorage.setItem("playUrl", JSON.stringify(this.playUrl));
      localStorage.setItem("playIndex", JSON.stringify(this.playIndex));
    },
    //向playList中增添多个数据
    playListAddMore(itemArr: any[]) {
      this.playList.push(...itemArr);
      if (this.playUrl === "") {
        this.playUrl = itemArr[0].src;
        this.playIndex = this.playList.findIndex(
          (item) => item.src === this.playUrl
        );
      } else {
        this.playIndex = this.playList.length - itemArr.length;
        this.playUrl = itemArr[0].src;
      }
      this.initPath();
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
      localStorage.setItem("playList", JSON.stringify(this.playList));
    },
    //删除playList中的全部数据
    playListRemoveAll() {
      this.playList = [];
      this.playUrl = "";
      this.playIndex = -1;
      this.initPath();
    },
    //通过歌曲id查询歌曲的歌词
    async queryById(item: any) {
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

      //赋值
      this.playUrl = item.src;

      if (this.playList.some((item) => item.src === this.playUrl)) {
        let index = this.playList.findIndex(
          (item) => item.src === this.playUrl
        );

        if (index === this.playIndex) {
          this.isPlay ? this.audio.play() : this.audio.pause();
        } else {
          this.isPlay = true;
          this.playIndex = index;
          this.initPath(false);
        }
        this.loading = false;

        return;
      }
      //调接口
      const res = await getLrc(item.id);
      if (res.code !== 200) {
        this.loading = false;
        return;
      }

      this.isPlay = true;

      this.playList.push({
        ...item,
        lrc: res.lrc.lyric,
        src: this.playUrl,
      });

      this.loading = false;

      this.playIndex = this.playList.findIndex(
        (item) => item.src === this.playUrl
      );

      this.local();

      this.initPath(false);
    },
  },
});
