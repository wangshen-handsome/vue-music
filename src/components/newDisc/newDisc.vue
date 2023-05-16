<template>
  <el-skeleton class="new-disc" :count="count" :loading="loading" animated>
    <template #template>
      <div class="item">
        <el-skeleton-item class="img ske-img" variant="image" />
        <div class="ske-info">
          <el-skeleton-item variant="h3" class="ske-name" />
          <el-skeleton-item variant="h3" class="ske-name" style="width: 50%" />
          <div class="ske-tags">
            <el-skeleton-item variant="text" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div v-if="list && list.length" class="new-disc">
        <div class="item" v-for="item in list">
          <div class="img">
            <el-image :src="item.blurPicUrl">
              <template #placeholder>
                <div class="image-slot">
                  <el-icon class="icon"><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artist.name }}</div>
          </div>
          <span class="tag">{{ item.type }}</span>
        </div>
      </div>
      <el-empty class="error" description="数据请求失败,请刷新重试" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

import { ElEmpty } from "element-plus";

import { Picture } from "@element-plus/icons-vue";

defineProps({
  list: {
    type: Array as PropType<any[]>,
  },
  count: Number,
  loading: Boolean,
});
</script>
<style scoped lang="scss">
@import "@/styles/components/newDisc.scss";
</style>
