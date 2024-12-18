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

import { useRoute, useRouter } from "vue-router";

import category from "@/components/category/category.vue";

import SingerList from "@/components/singerList/singerList.vue";

import { singerMenuList } from "@/assets/data/singerMenuList";

import { useSingerStore } from "@/store/singer";

import loading from "@/components/loading/index.vue";

const { singerListData, actionSingerList, singerLoading, singerList } = toRefs(
  useSingerStore()
);

const query: { initial?: number; area?: number; type?: number } = useRoute().query;

const router = useRouter();

const typeObj = ref({
  initial: query.initial ? query.initial : 0,
  area: query.area ? query.area : 0,
  type: query.type ? query.type : 0,
});

//修改singerListData
if (query) {
  if (query?.initial) {
    singerListData.value.initial = singerMenuList[0].list[query?.initial].val;
  }
  if (query?.area) {
    singerListData.value.area = singerMenuList[1].list[query?.area].val;
  }
  if (query?.type) {
    singerListData.value.type = singerMenuList[2].list[query?.type].val;
  }
}

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
  router.push(
    `/singer?initial=${typeObj.value.initial}&area=${typeObj.value.area}&type=${typeObj.value.type}`
  );
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
