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
            <el-image :src="item.cover" fit="cover">
              <template #placeholder>
                <div class="image-slot">
                  <el-icon>
                    <Picture />
                  </el-icon>
                </div>
              </template>
            </el-image>
            <play class="play" theme="outline" size="24" fill="#909090" />
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
      </div>
      <el-empty class="error" description="数据请求失败,请刷新重试" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
import { pauseMusic } from "@/utils/pauseMusic";

import { useRouter } from "vue-router";

import { Picture } from "@element-plus/icons-vue";

import { formatNum } from "@/utils/format";

import { Monitor, Play } from "@icon-park/vue-next";

import { ElEmpty } from "element-plus";

//处理tags
// const disposeTags = (tags: string[]) => tags.reduce((a, b) => (a += "#" + b), "");

const router = useRouter();

defineProps<{
  list: any[];
  count: number;
  loading: boolean;
}>();

//前往播放详情页
const goDetail = (id: number) => {
  pauseMusic();
  router.push("/mvDetail?id=" + id);
};
</script>
<style scoped lang="scss">
@import "@/styles/components/mvList.scss";
</style>
