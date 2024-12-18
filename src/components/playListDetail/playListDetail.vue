<template>
  <div class="play-list-detail" v-if="!playListLoading">
    <hero :data="playList" type="songList"></hero>
    <song-list :playList="playList"></song-list>
  </div>
  <loading v-else></loading>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";

import { useRoute } from "vue-router";

import hero from "@/components/hero/hero.vue";

import songList from "@/components/songList/songList.vue";

import loading from "@/components/loading/index.vue";

import { useSongStore } from "@/store/songList";

const query = ref<any>(useRoute().query);

const { playList, playListLoading, actionPlayList } = toRefs(useSongStore());

console.log(query);

watch(query.value.id, () => {
  console.log(query.value.id);

  actionPlayList.value(query.value.id);
});

actionPlayList.value(query.value.id);
</script>
<style scoped lang="scss">
@import "@/styles/components/playListDetail.scss";
</style>
