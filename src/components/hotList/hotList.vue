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
          <el-image :src="item.coverImgUrl" class="img">
            <template #placeholder>
              <div class="image-slot">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
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
import { ref, reactive, PropType } from "vue";

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
    transition: all 0.5s;
    overflow: hidden;
    cursor: pointer;
    .img {
      width: 100%;
      transition: all 0.5s;
    }

    .ske-img {
      height: 17vh;
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
      transform: translateY(-5px);
      .img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
