<template>
  <div class="play-list-detail" v-if="!playListLoading">
    <hero :data="playList"></hero>
    <song-list :playList="playList"></song-list>
  </div>
  <loading v-else></loading>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";

import { useRoute } from "vue-router";

import hero from "@/components/hero/hero.vue";

import songList from "@/components/songList/songList.vue";

import loading from "@/components/loading/index.vue";

import { useSongStore } from "@/store/songList";

const { query }: any = useRoute();

const { playList, playListLoading, actionPlayList } = toRefs(useSongStore());

//请求数据
actionPlayList.value(query.id);
</script>
<style scoped lang="scss">
@import "@/styles/components/playListDetail.scss";
</style>
