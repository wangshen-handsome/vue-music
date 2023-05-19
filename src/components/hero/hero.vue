<template>
  <div class="hero">
    <div class="left">
      <el-image class="img" :src="data.coverImgUrl">
        <div slot="placeholder" class="img">
          <i class="iconfont icon-placeholder"></i>
        </div>
      </el-image>
    </div>
    <div class="right">
      <div class="title">
        <h3>{{ data.name }}</h3>
        <span class="date">({{ formatTime(data.updateTime) }} 更新)</span>
      </div>
      <div class="create-date">
        <el-image class="img" :src="data.avatarUrl"> </el-image>
        <span>{{ data.nickname }}</span>
        <span class="date">{{ formatTime(data.createTime) }}</span>
      </div>
      <div class="play-count">
        <div class="play">
          <headset theme="outline" size="24" fill="#333" />
          <span class="date">{{ formatNum(data.playCount) }}次</span>
        </div>
        <div class="collect">
          <star theme="outline" size="24" fill="#333" />
          <span class="date">{{ formatNum(data.subscribedCount) }}次</span>
        </div>
        <div class="message">
          <message-one theme="outline" size="24" fill="#333" />
          <span class="date">{{ formatNum(data.commentCount) }}</span>
        </div>
      </div>
      <div class="desc">
        <h4>歌单简介</h4>
        <div class="date content">
          {{ data.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

import { formatTime, formatNum } from "@/utils/format";

import { Headset, Star, MessageOne } from "@icon-park/vue-next";

defineProps({
  data: Array as PropType<any>,
});
</script>
<style scoped lang="scss">
.hero {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    .img {
      width: 250px;
      height: 250px;
      border-radius: 8px;
      margin-right: 20px;
    }
  }
  .right {
    width: calc(100% - 330px);
    box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 0 20px;
    .title {
      display: flex;
      align-items: center;
      h3 {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .create-date {
      display: flex;
      align-items: center;
      padding-bottom: 10px;
      .img {
        width: 32px;
        height: 32px;
        border-radius: 16px;
        margin-right: 10px;
      }
    }

    .play-count {
      display: flex;
      align-items: center;
      .play,
      .collect,
      .message {
        display: flex;
        align-items: center;
        padding-right: 10px;
      }
    }

    .desc {
      h4 {
        font-weight: bold;
        margin: 18px 0;
      }
      .content {
        padding-left: 0;
      }
    }

    .date {
      font-size: 14px;
      padding-left: 10px;
      color: #909090;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
