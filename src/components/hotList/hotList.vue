<template>
  <el-skeleton
    class="hot-list"
    :count="count"
    :loading="loading"
    animated
    :throttle="500"
  >
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
      <div class="hot-list" v-if="list && list.length">
        <div class="item" v-for="item in list" @click="goDetail(item.id)">
          <div class="img">
            <el-image :src="item.coverImgUrl">
              <template #placeholder>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <span class="text">{{ item.name }}</span>
          <span class="tag">
            {{ disposeTags(item.tags) }}
          </span>
        </div>
      </div>
      <el-empty class="error" description="暂无数据" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { Picture } from "@element-plus/icons-vue";

import { ElEmpty } from "element-plus";

const router = useRouter();

//处理tags
const disposeTags = (tags: string[]) => tags.reduce((a, b) => (a += "#" + b), "");

defineProps<{
  list: any[];
  count: number;
  loading: boolean;
}>();

//前往详情页
const goDetail = (id: number) => {
  router.push("/playListDetail?id=" + id);
};
</script>
<style scoped lang="scss">
@import "@/styles/components/hotList.scss";
</style>
