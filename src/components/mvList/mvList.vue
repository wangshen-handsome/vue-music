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
            <el-image :src="item.cover" fit="cover">
              <template #placeholder>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
            <play class="play" theme="outline" size="24" fill="#333" />
          </div>
          <span class="text">{{ item.name }}</span>
          <span class="tag">
            {{ item.artistName }}
          </span>
          <span class="play-count">
            <monitor theme="filled" size="24" fill="#909090" style="margin-right: 5px" />
            {{ formatNum(item.playCount) }}
          </span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";

import { Picture } from "@element-plus/icons-vue";

import { formatNum } from "@/utils/format";

import { Monitor, Play } from "@icon-park/vue-next";

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
  flex-wrap: wrap;
  .item {
    width: calc(100% / 5 - 20px);
    margin: 20px 20px 20px 0;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    .img {
      width: 100%;
      overflow: hidden;
      border-radius: 8px;
      transition: all 0.3s;
      position: relative;
      .el-image {
        border-radius: 8px;
        .el-image__inner {
          border-radius: 8px;
        }
      }
      &:hover {
        transform: scale(1.1);
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
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    .tag,
    .play-count {
      color: #909090;
      font-size: 12px;
      margin-top: 10px;
    }
    .play-count {
      display: block;
      display: flex;
      align-items: center;
    }
  }
}
</style>
