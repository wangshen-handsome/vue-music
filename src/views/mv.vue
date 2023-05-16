<template>
  <div class="top">
    <category :list="mvMenuList" :typeObj="typeObj" @changeCat="changeCat"></category>
  </div>
  <div
    class="list"
    v-if="!(mvLoading && mvData.offset === 0)"
    v-infinite-scroll="loadMore"
    :infinite-scroll-disabled="mvLoading || !mvList.length"
  >
    <mv-list
      :list="mvList"
      :count="mvList.length"
      :loading="mvLoading && mvData.offset === 0"
    ></mv-list>
  </div>
  <loading v-else-if="mvLoading && mvData.offset === 0"></loading>
  <div class="bottom" v-if="mvLoading && mvData.offset !== 0">
    <loading :tag="true"></loading>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { mvMenuList } from "@/assets/data/mvMenuList";

import { useMvStore } from "@/store/mv";

import category from "@/components/category/category.vue";

import MvList from "@/components/mvList/mvList.vue";

import loading from "@/components/loading/index.vue";

const { mvData, actionMvList, mvLoading, mvList } = toRefs(useMvStore());

let typeObj = ref({
  area: 0,
  type: 0,
  order: 0,
});

const changeCat = (prop: any, index: number) => {
  switch (prop.type) {
    case "order":
      typeObj.value.order = index;
      mvData.value.order = prop.name;
      break;
    case "area":
      typeObj.value.area = index;
      mvData.value.area = prop.name;
      break;
    case "type":
      typeObj.value.type = index;
      mvData.value.type = prop.name;
      break;
  }

  //请求mv数据
  actionMvList.value();
};

//加载更多
const loadMore = () => {
  mvData.value.offset = mvList.value.length;

  actionMvList.value(true);
};

//请求mv数据
actionMvList.value();
</script>
<style scoped lang="scss">
@import "@/styles/views/mv.scss";
</style>
