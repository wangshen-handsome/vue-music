<template>
  <div class="list" v-if="playList.length">
    <div class="top">
      <div class="left">最近收听</div>
      <div class="right">
        <clear @click="clearAll" theme="filled" size="30" />
      </div>
    </div>
    <div
      :class="[item.src === playList[playIndex].src ? 'item active' : 'item']"
      v-for="(item, index) in playList"
    >
      <div class="left">{{ index + 1 }}、</div>
      <div class="center">
        <span class="song-name">{{ item.name }}</span>
        <span class="singer">({{ item.singer }})</span>
      </div>
      <div class="right">
        <pause-one
          class="icon"
          @click="clickPlayMusic(item)"
          v-if="playList[playIndex].src === item.src && isPlay"
          theme="filled"
          size="30"
        />
        <play
          class="icon"
          @click="clickPlayMusic(item)"
          v-else
          theme="filled"
          size="30"
        />
        <delete @click="remove(index)" theme="filled" size="30" />
      </div>
    </div>
  </div>
  <el-empty class="error" description="暂无歌曲，请自行添加。" v-else></el-empty>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { ElEmpty, ElMessageBox } from "element-plus";

import { Play, PauseOne, Delete, Clear } from "@icon-park/vue-next";

import { usePlayBarStore } from "@/store/playBar";

const {
  playList,
  clickPlayMusic,
  isPlay,
  playListRemove,
  playListRemoveAll,
  playIndex,
} = toRefs(usePlayBarStore());

//删除单个音乐
const remove = (index: number) => {
  ElMessageBox({
    title: "提示",
    message: "是否删除?",
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "确认",
  }).then(() => {
    playListRemove.value(index);
  });
};

//删除全部音乐
const clearAll = () => {
  ElMessageBox({
    title: "提示",
    message: "是否全部删除?",
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "确认",
  }).then(() => {
    playListRemoveAll.value();
  });
};
</script>
<style scoped lang="scss">
.list {
  .top {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .left {
      font-size: 20px;
      font-weight: 600;
    }
    .right {
      cursor: pointer;
    }
  }
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
      width: 60%;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      .singer {
        font-size: 14px;
      }
    }
    .right {
      display: flex;
      transform: translateY(3px);
      cursor: pointer;
    }
    &:hover {
      color: black;
      box-shadow: 0 20px 27px rgba(0, 0, 0, 0.5);
    }
  }

  .active {
    border: 1px solid pink;
    background-color: #fff;
  }
}
</style>
