<template>
  <div class="hot-radio-list">
    <el-skeleton class="hot-radio-list" :count="count" :loading="loading" animated>
      <template #template>
        <div class="item">
          <el-skeleton-item class="img" variant="image" />
          <div class="text">
            <div class="title">
              <el-skeleton-item variant="h3" class="ske-name" />
            </div>
            <el-skeleton-item variant="text" />
            <div class="bottom">
              <el-skeleton-item variant="text" class="ske-name" style="width: 50%" />
              <el-skeleton-item variant="text" class="ske-name" style="width: 50%" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="item" v-for="item in list" :key="item.id">
          <el-image :src="item.picUrl" class="img"></el-image>
          <div class="text">
            <div class="title">
              <fm theme="outline" size="24" fill="#333" style="margin-right: 2px" />
              {{ item.name }}
            </div>
            <div class="content">{{ item.rcmdtext }}</div>
            <div class="bottom">
              <span class="periods">共{{ item.programCount }}期</span>
              <span class="sub">订阅{{ formatNum(item.subCount) }}次</span>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

import { Fm } from "@icon-park/vue-next";

import { formatNum } from "@/utils/format";
defineProps({
  count: Number,
  loading: Boolean,
  list: {
    type: Array as PropType<any[]>,
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/components/hotRadioList.scss";
</style>
