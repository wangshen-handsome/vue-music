<template>
  <div class="rank-list" v-if="!playListLoading">
    <div class="top">
      <div class="top-left">
        <hero :data="playList"></hero>
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
    <songList :playList="playList" style="width: calc(70% - 20px)"></songList>
  </div>
  <loading v-else></loading>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, computed } from "vue";

import songList from "@/components/songList/songList.vue";

import hero from "@/components/hero/hero.vue";

import loading from "@/components/loading/index.vue";

import { PlayOne } from "@icon-park/vue-next";

import { useRankStore } from "@/store/rankList";

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
