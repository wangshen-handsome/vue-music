<template>
  <div class="list">
    <div class="content" v-for="item in list">
      <div class="left">
        <div class="img">
          <el-image :src="item.picUrl"></el-image>
        </div>
      </div>
      <div class="right">
        <div class="singer">{{ item.name }}</div>
        <div class="bottom">
          <div class="album">
            <span class="name">专辑</span>
            <span class="num">{{ item.albumSize }}</span>
          </div>
          <div class="single">
            <span class="name">单曲</span>
            <span class="num">{{ item.musicSize }}</span>
          </div>
          <div class="fans">
            <span class="name">粉丝</span>
            <span class="num">{{ formatNum(item.fansCount) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

import { formatNum } from "@/utils/format";

defineProps({
  list: Array as PropType<any[]>,
});
</script>
<style scoped lang="scss">
@import "@/styles/components/singerList.scss";
</style>
