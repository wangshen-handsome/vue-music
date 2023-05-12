<template>
  <div class="rank-list">
    <div class="top">
      <div class="top-left">
        <div class="left">
          <el-image class="img" :src="playList.coverImgUrl">
            <div slot="placeholder" class="img">
              <i class="iconfont icon-placeholder"></i>
            </div>
          </el-image>
        </div>
        <div class="right">
          <div class="title">
            <h3>{{ playList.name }}</h3>
            <span class="date">({{ formatTime(playList.updateTime) }} 更新)</span>
          </div>
          <div class="create-date">
            <el-image class="img" :src="playList.avatarUrl"> </el-image>
            <span>{{ playList.nickname }}</span>
            <span class="date">{{ formatTime(playList.createTime) }}</span>
          </div>
          <div class="play-count">
            <div class="play">
              <headset theme="outline" size="24" fill="#333" />
              <span class="date">{{ formatNum(playList.playCount) }}次</span>
            </div>
            <div class="collect">
              <star theme="outline" size="24" fill="#333" />
              <span class="date">{{ formatNum(playList.subscribedCount) }}次</span>
            </div>
            <div class="message">
              <message-one theme="outline" size="24" fill="#333" />
              <span class="date">{{ formatNum(playList.commentCount) }}</span>
            </div>
          </div>
          <div class="desc">
            <h4>歌单简介</h4>
            <div class="date content">
              {{ playList.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="top-right">
        <div class="nav">
          <div
            v-for="(item, index) in menuList"
            :key="item"
            :class="[index === menuIndex ? 'menu menu-active' : 'menu']"
            @click="menuClick(index)"
          >
            {{ item }}
          </div>
        </div>
        <div class="list" v-if="menuIndex === 0">
          <div
            :class="[index === itemIndex ? 'item item-active' : 'item']"
            v-for="(item, index) in listTop"
            @click="itemClick(index, item.id)"
          >
            <div class="left">
              <div class="title">{{ item.name }}</div>
              <div class="update">{{ item.updateFrequency }}</div>
            </div>
            <div class="right">
              <el-image class="img" :src="item.coverImgUrl"></el-image>
            </div>
          </div>
        </div>
        <div class="list" v-if="menuIndex === 1">
          <div
            :class="[index === itemIndex ? 'item item-active' : 'item']"
            v-for="(item, index) in listFeature"
            @click="itemClick(index, item.id)"
          >
            <div class="left">
              <div class="title">{{ item.name }}</div>
              <div class="update">{{ item.updateFrequency }}</div>
            </div>
            <div class="right">
              <el-image class="img" :src="item.coverImgUrl"></el-image>
            </div>
          </div>
        </div>
        <div class="list" v-if="menuIndex === 2">
          <div
            :class="[index === itemIndex ? 'item item-active' : 'item']"
            v-for="(item, index) in listOther"
            @click="itemClick(index, item.id)"
          >
            <div class="left">
              <div class="title">{{ item.name }}</div>
              <div class="update">{{ item.updateFrequency }}</div>
            </div>
            <div class="right">
              <el-image class="img" :src="item.coverImgUrl"></el-image>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="header">
        <div class="left">
          <div class="title">歌曲列表</div>
          <div class="num">{{ playList.num }}首歌</div>
        </div>
        <div class="right">
          <play-one class="icon" theme="filled" size="24" fill="#fff" />
          <div class="text">全部播放</div>
        </div>
      </div>
      <songList :list="playList" v-if="!playListLoading"></songList>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, computed } from "vue";

import songList from "@/components/songList/songList.vue";

import { PlayOne } from "@icon-park/vue-next";

import { useRankStore } from "@/store/rankList";

import { formatTime, formatNum } from "@/utils/format";

import { Headset, Star, MessageOne } from "@icon-park/vue-next";

const {
  actionPlayList,
  listTop,
  listFeature,
  listOther,
  playList,
  playData,
  playListLoading,
} = toRefs(useRankStore());

//菜单列表
const menuList: string[] = ["TOP榜", "特色榜", "场景榜"];

//菜单下标
let menuIndex = ref<number>(0);

//item下标
let itemIndex = ref<number>(0);

//菜单点击事件
const menuClick = (index: number) => {
  itemIndex.value = 0;
  menuIndex.value = index;
  playData.value.id =
    index === 0
      ? listTop.value[0].id
      : index === 1
      ? listFeature.value[0].id
      : listOther.value[0].id;
  actionPlayList.value(index);
};

//点击事件
const itemClick = (index: number, id: string) => {
  itemIndex.value = index;
  playData.value.id = id;
  actionPlayList.value();
};

// 请求歌曲列表
actionPlayList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/rankList.scss";
</style>
