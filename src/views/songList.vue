<template>
  <div class="top">
    <category :list="catList" :typeName="typeName" @changeCat="changeCat"></category>
  </div>
  <div class="content">
    <div class="nav">
      <div class="title">{{ name }}</div>
      <div
        :class="[topPlayData.order === 'hot' ? 'hot active' : 'hot']"
        @click="changeOrder('hot')"
      >
        热门
      </div>
      <div
        :class="[topPlayData.order === 'new' ? 'new active' : 'new']"
        @click="changeOrder('new')"
      >
        最新
      </div>
    </div>
    <div
      class="list"
      v-if="!(topPlayLoading && topPlayData.offset === 0)"
      v-infinite-scroll="loadMore"
      :infinite-scroll-disabled="topPlayLoading || !topPlayList.length"
    >
      <hot-list
        :list="topPlayList"
        :count="topPlayData.limit"
        :loading="topPlayLoading && topPlayData.offset === 0"
      ></hot-list>
    </div>
    <loading v-else-if="topPlayLoading && topPlayData.offset === 0"></loading>
    <div class="bottom" v-if="topPlayLoading && topPlayData.offset !== 0">
      <loading :tag="true"></loading>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import category from "@/components/category/category.vue";

import hotList from "@/components/hotList/hotList.vue";

import loading from "@/components/loading/index.vue";

import { useSongStore } from "@/store/songList";

const {
  actionCatList,
  catList,
  actionTopPlayList,
  name,
  topPlayData,
  topPlayList,
  topPlayLoading,
} = toRefs(useSongStore());

//切换类型
const changeOrder = (text: string) => {
  if (text === topPlayData.value.order) return;
  topPlayData.value.order = text;
  actionTopPlayList.value();
};

//加载更多
const loadMore = () => {
  topPlayData.value.offset = topPlayList.value.length;

  actionTopPlayList.value(true);
};

//分类名称
let typeName = ref<number>();

//分类点击事件
const changeCat = (prop: any) => {
  topPlayData.value.cat = typeName.value = prop.name;
  actionTopPlayList.value();
};

//请求分类数据
actionCatList.value();

//请求列表数据
actionTopPlayList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/songList.scss";
</style>
