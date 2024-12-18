<template>
  <div class="detail" v-if="!mvDetailLoading">
    <div class="top">
      <div class="name">{{ name }}</div>
      <div class="singer">{{ artistName }}</div>
    </div>
    <videoPlay width="100%" height="100%" :src="url" :poster="cover"></videoPlay>
  </div>
  <loading v-else></loading>
</template>
<script setup lang="ts">
console.log(1);

import { ref, reactive, toRefs } from "vue";

import { useRoute } from "vue-router";

import "vue3-video-play/dist/style.css";

import { videoPlay } from "vue3-video-play";

import loading from "@/components/loading/index.vue";

import { useMvStore } from "@/store/mv";

const { query }: any = useRoute();

const { artistName, cover, name, url, actionMvDetail, mvDetailLoading } = toRefs(
  useMvStore()
);

//请求mv详情
actionMvDetail.value(query.id);
</script>
<style scoped lang="scss">
.detail {
  .top {
    display: flex;
    align-items: center;
    padding-bottom: 20px;

    &::before {
      content: "MV";
      background-color: #409eff;
      color: white;
      font-size: 16px;
      font-weight: 600;
      padding: 0 5px;
      border-radius: 8px;
    }
    .name {
      font-size: 24px;
      font-weight: 600;
      padding: 0 20px;
    }
    .singer {
      font-size: 14px;
      color: #909090;
    }
  }
}
</style>
