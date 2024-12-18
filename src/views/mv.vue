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
    <mv
      :list="mvList"
      :count="mvList.length"
      :loading="mvLoading && mvData.offset === 0"
    ></mv>
  </div>
  <loading v-else-if="mvLoading && mvData.offset === 0"></loading>
  <div class="bottom" v-if="mvLoading && mvData.offset !== 0">
    <loading :tag="true"></loading>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, defineAsyncComponent } from "vue";

import { useRoute, useRouter } from "vue-router";

import { mvMenuList } from "@/assets/data/mvMenuList";

import { useMvStore } from "@/store/mv";

import loading from "@/components/loading/index.vue";

const { mvData, actionMvList, mvLoading, mvList } = toRefs(useMvStore());

//使用代码分包，优化性能
const Mv = defineAsyncComponent(() => import("@/components/mvList/mvList.vue"));

const category = defineAsyncComponent(() => import("@/components/category/category.vue"));

const router = useRouter();

const query: { area?: number; type?: number; order?: number } = useRoute().query;

//修改mvData的值
if (query) {
  if (query?.area) {
    mvData.value.area = mvMenuList[1].list[query?.area].name;
  }
  if (query?.type) {
    mvData.value.type = mvMenuList[2].list[query?.type].name;
  }
  if (query?.order) {
    mvData.value.order = mvMenuList[0].list[query?.order].name;
  }
}

let typeObj = ref({
  area: query?.area ? query?.area : 0,
  type: query?.type ? query?.type : 0,
  order: query?.order ? query?.order : 0,
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

  actionMvList.value();

  router.push(
    `/mv?area=${typeObj.value.area}&type=${typeObj.value.type}&order=${typeObj.value.order}`
  );
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
