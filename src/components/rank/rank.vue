<template>
  <div class="rank">
    <el-skeleton class="rank" :count="rank.length" :loading="loading" animated>
      <template #template>
        <div class="item">
          <div class="top">
            <el-skeleton-item variant="h1" class="ske-name" style="width: 100%" />
            <el-skeleton-item variant="h3" class="ske-name" style="width: 100%" />
          </div>
          <div class="content" v-for="item in rank.length">
            <div class="img">
              <el-skeleton-item class="img" variant="image" />
            </div>
            <div class="right">
              <el-skeleton-item variant="text" class="ske-name" />
              <el-skeleton-item variant="text" class="ske-name" />
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <div class="item" v-for="(item, index) in rank" :key="item.id">
          <div class="top">
            <div class="title">{{ item.name }}</div>
            <div class="desc">
              更新于 : {{ formatTime(item.updateTime) }} ({{ item.updateFrequency }})
            </div>
          </div>
          <div
            class="content"
            v-for="prop in rankList[index]"
            :key="prop.id"
            v-if="!loading"
          >
            <div class="img">
              <el-image :src="prop.al.picUrl + '?param=120y120'">
                <template #placeholder>
                  <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </div>

            <div class="right">
              <div class="song">{{ prop.name }}</div>
              <div class="singer">{{ prop.ar[0].name }}</div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, PropType, toRefs } from "vue";

import { getRankList } from "@/apis/api";

import { formatTime } from "@/utils/format";

import { Picture } from "@element-plus/icons-vue";

import { useHomeStore } from "@/store/home";

const { rankList } = toRefs(useHomeStore());

const props = defineProps({
  rank: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

let loading = ref<boolean>(true);

const timer = setInterval(() => {
  if (rankList.value.length === 6) {
    clearInterval(timer);
    loading.value = false;
    return;
  }
  if (props.rank.length) {
    props.rank.forEach((item) => {
      getRankList({ id: item.id }).then((res) => {
        let arr = res.playlist.tracks.splice(0, 6);

        rankList.value.push(arr);
        if (rankList.value.length === 6) {
          loading.value = false;
        }
      });
    });
    clearInterval(timer);
  }
}, 1000);
</script>
<style scoped lang="scss">
.rank {
  display: flex;
  justify-content: space-between;
  .item {
    border-radius: 8px;
    width: calc(100% / 6 - 20px);
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    .top {
      padding: 10px;
      .title {
        font-size: 24px;
        font-weight: 600;
        padding-bottom: 5px;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .desc {
        font-size: 12px;
        color: #909090;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .content {
      display: flex;
      // justify-content: space-around;
      padding: 10px;
      .img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 5px;
        transition: all 0.5s;
        .el-image {
          .el-image__inner {
            border-radius: 8px;
          }
        }
      }
      &:hover {
        .img {
          transform: scale(1.1);
        }
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
      .right {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        .song {
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .singer {
          color: #909090;
          overflow: hidden;
          display: -webkit-box;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
