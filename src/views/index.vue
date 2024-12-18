<template>
  <div>
    <Banner></Banner>
    <!-- 热门推荐 -->
    <div class="hot">
      <div class="top">
        <h3 class="title">热门推荐</h3>
        <span
          v-for="(item, index) in hotTagList"
          :class="[index === activeHotIndex ? 'active item-title' : 'item-title']"
          @click="hotTagClick(item.name, index)"
          :key="item.id"
          >{{ item.name }}</span
        >
      </div>
      <div class="main">
        <hot-list :loading="hotLoading" :list="hotList" :count="hotData.limit"></hot-list>
      </div>
    </div>
    <!-- 新碟上架 -->
    <div class="hot">
      <div class="top">
        <h3 class="title">新碟上架</h3>
        <span
          v-for="(item, index) in newDiscTagList"
          :class="[index === activeNewDiscIndex ? 'active item-title' : 'item-title']"
          @click="newDiscTagClick(item.name, index)"
          :key="item.code"
          >{{ item.name }}</span
        >
      </div>
      <div class="main">
        <new-disc
          :count="newDiscData.limit"
          :list="newDiscList"
          :loading="newDiscLoading"
        ></new-disc>
      </div>
    </div>
    <!-- 排行榜 -->
    <div class="rank">
      <Rank :list="rank"></Rank>
    </div>
    <!-- 最新MV -->
    <div class="hot">
      <div class="top">
        <h3 class="title">最新MV</h3>
        <span
          v-for="(item, index) in mvTagList"
          :class="[index === activeMvIndex ? 'active item-title' : 'item-title']"
          @click="mvTagClick(item, index)"
          :key="item"
          >{{ item }}</span
        >
      </div>
      <div class="main">
        <mv-list :count="mvData.limit" :list="mvList" :loading="mvLoading"></mv-list>
      </div>
    </div>
    <!-- <div class="bottom">
      热门电台
      <div class="hot" style="width: calc(50% - 10px); margin-right: 20px">
        <div class="top">
          <h3 class="title">热门电台</h3>
        </div>
        <div class="main">
          <hot-radio-list
            :count="hotRadioData.limit"
            :list="hotRadioList"
            :loading="hotRadioLoading"
          ></hot-radio-list>
        </div>
      </div>
      热门歌手
      <div class="hot" style="width: calc(50% - 10px)">
        <div class="top">
          <h3 class="title">热门歌手</h3>
        </div>
        <div class="main">
          <hot-singer-list
            :count="hotSingerListData.limit"
            :list="hotSingerList"
            :loading="hotSingerListLoading"
          ></hot-singer-list>
        </div>
      </div>
    </div> -->
    <!-- 热门歌手 -->
    <div class="hot">
      <div class="top">
        <h3 class="title">热门歌手</h3>
      </div>
      <div class="main">
        <hot-singer-list
          :count="hotSingerListData.limit / 3"
          :list="hotSingerList"
          :loading="hotSingerListLoading"
        ></hot-singer-list>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import Banner from "@/components/banner/banner.vue";

import HotList from "@/components/hotList/hotList.vue";

import MvList from "@/components/mvList/mvList.vue";

import HotRadioList from "@/components/hotRadioList/hotRadioList.vue";

import HotSingerList from "@/components/hotSingerList/hotSingerList.vue";

import Rank from "@/components/rank/rank.vue";

import { useHomeStore } from "@/store/home";

let {
  hotTagList,
  actionHotTagList,
  hotList,
  hotLoading,
  actionHotList,
  hotData,
  newDiscData,
  actionNewDiscList,
  newDiscList,
  newDiscLoading,
  actionRank,
  rank,
  actionMvList,
  mvData,
  mvList,
  mvLoading,
  actionHotRadioList,
  hotRadioData,
  hotRadioList,
  hotRadioLoading,
  hotSingerListLoading,
  hotSingerList,
  actionHotSingerList,
  hotSingerListData,
} = toRefs(useHomeStore());

//hotTag栏选中下标
let activeHotIndex = ref<number | string>(0);

//newDiscTag栏选中下标
let activeNewDiscIndex = ref<number | string>(0);

//Mv Tag栏选中下标
let activeMvIndex = ref<number | string>(0);

//hotTag点击事件
const hotTagClick = (name: string, index: number) => {
  activeHotIndex.value = index;
  hotData.value.cat = name;

  //重新调用获取hotList
  actionHotList.value();
};

//newDiscTag点击事件
const newDiscTagClick = (name: string, index: number) => {
  activeNewDiscIndex.value = index;
  newDiscData.value.area = name;

  //重新调用获取newDiscList
  actionNewDiscList.value();
};

//MV Tag点击事件
const mvTagClick = (name: string, index: number) => {
  activeMvIndex.value = index;
  mvData.value.area = name;

  //重新调用获取mvList
  actionMvList.value();
};

//新碟上架tag数据
const newDiscTagList = [
  { name: "全部", code: "all" },
  { name: "华语", code: "zh" },
  { name: "欧美", code: "ea" },
  { name: "韩国", code: "kr" },
  { name: "日本", code: "jp" },
];

//MV tag 数据
const mvTagList = ["全部", "内地", "港台", "欧美", "日本", "韩国"];

//请求热门推荐tag数据
actionHotTagList.value();
//请求热门推荐列表数据
actionHotList.value();
//请求新碟上架列表数据
actionNewDiscList.value();
//请求排行榜
actionRank.value();
//请求MV
actionMvList.value();
//请求热门电台数据
actionHotRadioList.value();
//请求热门歌手数据
actionHotSingerList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/index.scss";
</style>
