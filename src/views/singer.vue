<template>
  <div class="top">
    <category :list="singerMenuList" :typeObj="typeObj" @changeCat="changeCat"></category>
  </div>
  <div
    class="content"
    v-if="!(singerLoading && singerListData.offset === 0)"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="singerLoading || !singerList.length"
  >
    <SingerList :list="singerList"></SingerList>
  </div>
  <loading v-else-if="singerLoading && singerListData.offset === 0"></loading>
  <div class="bottom" v-if="singerLoading && singerListData.offset !== 0">
    <loading :tag="true"></loading>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, toRef } from "vue";

import category from "@/components/category/category.vue";

import SingerList from "@/components/singerList/singerList.vue";

import { singerMenuList } from "@/assets/data/singerMenuList";

import { useSingerStore } from "@/store/singer";

import loading from "@/components/loading/index.vue";

const { singerListData, actionSingerList, singerLoading, singerList } = toRefs(
  useSingerStore()
);

const typeObj = ref({
  initial: 0,
  area: 0,
  type: 0,
});

const changeCat = (prop: any, index: number) => {
  switch (prop.type) {
    case "initial":
      typeObj.value.initial = index;
      singerListData.value.initial = prop.val;
      break;
    case "area":
      typeObj.value.area = index;
      singerListData.value.area = prop.val;
      break;
    case "type":
      typeObj.value.type = index;
      singerListData.value.type = prop.val;
      break;
  }
  //请求歌手数据
  actionSingerList.value();
};

//加载更多
const loadMore = () => {
  singerListData.value.offset = singerList.value.length;

  actionSingerList.value(true);
};

//请求歌手数据
actionSingerList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/songList.scss";
</style>
