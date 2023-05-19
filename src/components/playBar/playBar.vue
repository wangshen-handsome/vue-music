<template>
  <div class="play-bar">
    <audio ref="player" style="display: none" @timeupdate="changeNowSongTime"></audio>
    <div class="left">
      <div class="img">
        <el-image
          src="https://p3-passport.byteimg.com/img/user-avatar/1c67f6c2986c675ba7e68c519de5900f~100x100.awebp"
        ></el-image>
      </div>
      <div class="text">
        <div class="song-name">青花瓷</div>
        <div class="singer">周杰伦</div>
      </div>
      <div class="time">
        {{ formatSongTime(nowSongTime) }} / {{ formatSongTime(duration) }}
      </div>
    </div>
    <div class="center">
      <!-- 上一曲 -->
      <div class="last">
        <go-start @click="last" theme="filled" size="30" />
      </div>
      <!-- 暂停、播放 -->
      <div class="pause">
        <pause-one @click="changeIsPlay" v-if="isPlay" theme="filled" size="30" />
        <play @click="changeIsPlay" v-else theme="filled" size="30" />
      </div>
      <!-- 下一曲 -->
      <div class="next">
        <go-end @click="next" theme="filled" size="30" />
      </div>
      <!-- 音量 -->
      <div class="volume">
        <div class="volume-slider" v-if="isShowVolume">
          <el-slider
            @input="changeVolume"
            :min="0"
            :max="100"
            v-model="volume"
            vertical
            height="200px"
          />
        </div>
        <volume-mute @click="showVolume" v-if="volume === 0" theme="filled" size="30" />
        <volume-small
          @click="showVolume"
          v-else-if="volume > 0 && volume <= 50"
          theme="filled"
          size="30"
        />
        <volume-notice @click="showVolume" v-else theme="filled" size="30" />
      </div>
    </div>
    <div class="right">
      <div class="pattern">
        <play-cycle
          @click="changePattern(2)"
          v-if="pattern === 1"
          theme="filled"
          size="30"
        />
        <shuffle-one
          @click="changePattern(3)"
          v-else-if="pattern === 2"
          theme="filled"
          size="30"
        />
        <play-once @click="changePattern(1)" v-else theme="filled" size="30" />
      </div>
      <div class="more">
        <hamburger-button
          @click="showPlaylist = !showPlaylist"
          theme="filled"
          size="30"
        />
        <div v-if="showPlaylist" class="playlist">
          <list></list>
        </div>
      </div>
    </div>
    <div class="progress-bar">
      <el-slider
        :min="0"
        :max="duration"
        v-model="nowSongTime"
        :show-tooltip="false"
        @input="changeAudioCurrentTime"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, watch } from "vue";

import { ElSlider, ElImage } from "element-plus";

import { usePlayBarStore } from "@/store/playBar";

import { formatSongTime } from "@/utils/format";

import list from "@/components/list/list.vue";

const {
  isPlay,
  volume,
  pattern,
  changePattern,
  changeIsPlay,
  changeVolume,
  isShowVolume,
  nowSongTime,
  audio,
  changeAudioCurrentTime,
  duration,
  changeNowSongTime,
  isEnd,
  listenIsEnd,
  next,
  last,
  initPath,
} = toRefs(usePlayBarStore());

import {
  GoStart,
  Play,
  PauseOne,
  GoEnd,
  HamburgerButton,
  PlayCycle,
  PlayOnce,
  ShuffleOne,
  VolumeSmall,
  VolumeNotice,
  VolumeMute,
  DeleteFour,
} from "@icon-park/vue-next";

//展示音量条
const showVolume = () => {
  isShowVolume.value = !isShowVolume.value;
};

//audio实例
const player = ref<any>(null);

//是否展示右侧播放列表
let showPlaylist = ref<boolean>(false);

//监听歌曲是否播放结束
watch(isEnd, listenIsEnd.value);

onMounted(() => {
  //在组件挂载时将player实例赋值给audio
  audio.value = player;
  initPath.value();
});
</script>
<style scoped lang="scss">
@import "@/styles/components/playBar.scss";
</style>
