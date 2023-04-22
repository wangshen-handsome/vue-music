<template>
  <div class="hot-list">
    <el-skeleton class="hot-list" :count="count" :loading="loading" animated>
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
        <div class="item" v-for="item in list">
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
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";

import { Picture } from "@element-plus/icons-vue";

//处理tags
const disposeTags = (tags: string[]) => tags.reduce((a, b) => (a += "#" + b), "");

defineProps({
  list: {
    type: Array as PropType<any[]>,
  },
  count: Number,
  loading: Boolean,
});
</script>
<style scoped lang="scss">
.hot-list {
  // background-color: #fafafa;
  display: flex;
  justify-content: space-around;
  .item {
    width: calc(100% / 6 - 20px);
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    .img {
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
      transition: all 0.5s;
      .el-image {
        border-radius: 8px;
        .el-image__inner {
          border-radius: 8px;
        }
      }
    }

    .ske-img {
      height: 17vh;
    }

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #e6e8eb;
      color: var(--el-text-color-secondary);
      font-size: 30px;
    }
    .text {
      margin-top: 15px;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .tag {
      color: orange;
      font-size: 12px;
    }

    &:hover {
      .img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
