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
      <Rank></Rank>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import Banner from "@/components/banner/banner.vue";

import { useHomeStore } from "@/store/home";

import HotList from "@/components/hotList/hotList.vue";

import NewDisc from "@/components/newDisc/newDisc.vue";

import Rank from "@/components/rank/rank.vue";

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
  actionRankList,
} = toRefs(useHomeStore());

//hotTag栏选中下标
let activeHotIndex = ref<number | string>(0);

//newDiscTag栏选中下标
let activeNewDiscIndex = ref<number | string>(0);

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

//新碟上架tag数据
const newDiscTagList = [
  { name: "全部", code: "all" },
  { name: "华语", code: "zh" },
  { name: "欧美", code: "ea" },
  { name: "韩国", code: "kr" },
  { name: "日本", code: "jp" },
];

//请求热门推荐tag数据
actionHotTagList.value();
//请求热门推荐列表数据
actionHotList.value();
//请求新碟上架列表数据
actionNewDiscList.value();
//请求排行榜数据
actionRankList.value();
</script>
<style scoped lang="scss">
.hot {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
  margin: 50px 0;
  .top {
    display: flex;
    align-items: center;
    .title {
      font-size: 28px;
      font-weight: 700;
    }
    .title,
    .item-title {
      margin-right: 50px;
    }
    .item-title {
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        transform: translateY(-2px);
        color: #409eff;
      }
    }
    .active {
      border-bottom: 3px solid #409eff;
      font-weight: 700;
      color: #409eff;
    }
  }
}
</style>
