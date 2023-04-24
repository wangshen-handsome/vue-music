<template>
  <div class="banner">
    <el-skeleton class="skeleton" :loading="bannerLoading" animated>
      <template #template>
        <el-skeleton-item class="img" variant="image" />
      </template>
      <template #default>
        <el-carousel trigger="click" class="img">
          <el-carousel-item v-for="item in bannerList" :key="item.imageUrl">
            <img :src="item.imageUrl" class="img" />
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";

import { useHomeStore } from "@/store/home";

const { bannerList, actionBannerList,bannerLoading } = toRefs(useHomeStore());

actionBannerList.value();
</script>
<style scoped lang="scss">
@import '@/styles/components/banner.scss'
</style>
