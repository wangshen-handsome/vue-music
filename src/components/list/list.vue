<template>
  <div class="list">
    <div class="item" v-for="(item, index) in playList">
      <div class="left">{{ index + 1 }}</div>
      <div class="center">
        <span class="song-name">{{ item.name }}</span>
        <span class="singer">({{ item.singer }})</span>
      </div>
      <div class="right">
        <pause-one
          class="icon"
          @click="clickPlayMusic(item)"
          v-if="playUrl !== item.src"
          theme="filled"
          size="30"
        />
        <play class="icon" @click="changeIsPlay" v-else theme="filled" size="30" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { Play, PauseOne } from "@icon-park/vue-next";

import { usePlayBarStore } from "@/store/playBar";

const { changeIsPlay, playList, playUrl, clickPlayMusic } = toRefs(usePlayBarStore());

console.log(playList.value);
</script>
<style scoped lang="scss">
.list {
  .item {
    margin: 10px;
    display: flex;
    padding: 5px 10px;
    justify-content: space-between;
    align-items: center;
    color: #909090;
    border-radius: 8px;
    border: 1px solid #409eff;
    box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    .center {
      .singer {
        font-size: 14px;
      }
    }
    .right {
      transform: translateY(3px);
    }
    &:hover {
      color: black;
      box-shadow: 0 20px 27px rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
