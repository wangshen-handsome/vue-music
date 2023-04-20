<template>
  <div class="new-disc">
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
        <div class="item" v-for="item in list">
          <el-image :src="item.blurPicUrl" class="img">
            <template #placeholder>
              <div class="image-slot">
                <el-icon class="icon"><Picture /></el-icon>
              </div>
            </template>
          </el-image>
          <div class="text">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artist.name }}</div>
          </div>
          <span class="tag">{{ item.type }}</span>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

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
.new-disc {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
  justify-content: space-between;
  .item {
    width: calc(100% / 6 - 20px);
    margin: 20px 20px 20px 0;
    // display: flex;
    box-sizing: border-box;
    transition: all 0.5s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    .img {
      width: 100%;
      transition: all 0.5s;
    }

    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #E6E8EB;
      color: var(--el-text-color-secondary);
      font-size: 30px;
    }

    .ske-img {
      height: 17vh;
    }
    .text {
      margin-top: 15px;
      .name {
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-bottom: 10px;
      }
      .singer {
        font-size: 12px;
        color: #909090;
      }
    }
    &:hover {
      transform: translateY(-5px);
      .img{
        transform: scale(1.1);
      }
    }
    .tag {
      position: absolute;
      top: 5px;
      right: -30px;
      width: 100px;
      line-height: 24px;
      font-size: 12px;
      transform: rotate(45deg);
      text-align: center;
      color: #fff;
      background-color: orange;
    }
  }
}
</style>
