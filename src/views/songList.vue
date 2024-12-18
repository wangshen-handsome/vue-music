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
        :count="topPlayList.length"
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
import { ref, toRefs, defineAsyncComponent } from "vue";

import { TopPlayData } from "@/types/songList";

import { useRoute, useRouter } from "vue-router";

import loading from "@/components/loading/index.vue";

import { useSongStore } from "@/store/songList";

//使用代码分包，优化性能
const category = defineAsyncComponent(() => import("@/components/category/category.vue"));

const hotList = defineAsyncComponent(() => import("@/components/hotList/hotList.vue"));

const query: TopPlayData = useRoute().query;

const router = useRouter();

const {
  actionCatList,
  catList,
  actionTopPlayList,
  name,
  topPlayData,
  topPlayList,
  topPlayLoading,
} = toRefs(useSongStore());

//修改topplaydata数据
if (query) {
  if (query?.order) {
    topPlayData.value.order = query?.order;
  }
  if (query?.cat) {
    topPlayData.value.cat = query?.cat;
  }
}

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
let typeName = ref<string | undefined>(topPlayData.value.cat);

//分类点击事件
const changeCat = (prop: any) => {
  topPlayData.value.cat = typeName.value = prop.name;
  actionTopPlayList.value();
  router.push(`/songList?order=${topPlayData.value.order}&cat=${topPlayData.value.cat}`);
};

//请求分类数据
actionCatList.value();

//请求列表数据
actionTopPlayList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/songList.scss";
</style>
