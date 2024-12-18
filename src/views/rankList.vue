<template>
  <div class="rank-list" v-if="!playListLoading">
    <div class="top">
      <div class="top-left">
        <hero :data="playList" type="songList"></hero>
      </div>
      <div class="top-right">
        <div class="nav">
          <div
            v-for="(item, index) in menuList"
            :key="item"
            :class="[index == menuIndex ? 'menu menu-active' : 'menu']"
            @click="menuClick(index)"
          >
            {{ item }}
          </div>
        </div>
        <div class="list" v-if="menuIndex == 0">
          <div
            :class="[item.id == itemId ? 'item item-active' : 'item']"
            v-for="(item, index) in listTop"
            @click="itemClick(item.id)"
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
        <div class="list" v-if="menuIndex == 1">
          <div
            :class="[item.id == itemId ? 'item item-active' : 'item']"
            v-for="(item, index) in listFeature"
            @click="itemClick(item.id)"
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
        <div class="list" v-if="menuIndex == 2">
          <div
            :class="[item.id == itemId ? 'item item-active' : 'item']"
            v-for="(item, index) in listOther"
            @click="itemClick(item.id)"
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
import { ref, toRefs, defineAsyncComponent } from "vue";

import loading from "@/components/loading/index.vue";

import { useRankStore } from "@/store/rankList";

import { useRoute, useRouter } from "vue-router";

const query: { top?: number; id?: string } = useRoute().query;

const router = useRouter();

//使用代码分包，优化性能
const songList = defineAsyncComponent(() => import("@/components/songList/songList.vue"));

const hero = defineAsyncComponent(() => import("@/components/hero/hero.vue"));

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
let menuIndex = ref<number | undefined>(query?.top ? query?.top : 0);

//item下标
let itemId = ref<string | undefined>(query?.id ? query?.id : "");

//修改playData
if (query) {
  if (query?.id) {
    playData.value.id = query?.id;
  } else {
    if (query?.top) {
      playData.value.id =
        query?.top == 0
          ? listTop.value[0].id
          : query?.top == 1
          ? listFeature.value[0].id
          : listOther.value[0].id;
    }
  }
}

//菜单点击事件
const menuClick = (index: number) => {
  menuIndex.value = index;
  itemId.value = playData.value.id =
    index == 0
      ? listTop.value[0].id
      : index == 1
      ? listFeature.value[0].id
      : listOther.value[0].id;
  actionPlayList.value(index);
  router.push(`/rank?top=${menuIndex.value}&list=${itemId.value}`);
};

//点击事件
const itemClick = (id: string) => {
  itemId.value = id;
  playData.value.id = id;
  actionPlayList.value();
  router.push(`/rank?top=${menuIndex.value}&id=${itemId.value}`);
};

// 请求歌曲列表
actionPlayList.value(query?.top ? query?.top : 0);
</script>
<style scoped lang="scss">
@import "@/styles/views/rankList.scss";
</style>
