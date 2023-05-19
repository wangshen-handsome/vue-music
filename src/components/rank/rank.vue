<template>
  <el-skeleton class="rank" :count="list.length" :loading="loading" animated>
    <template #template>
      <div class="item">
        <div class="top">
          <el-skeleton-item variant="h1" class="ske-name" style="width: 100%" />
          <el-skeleton-item variant="h3" class="ske-name" style="width: 100%" />
        </div>
        <div class="content" v-for="item in list.length">
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
      <div class="rank" v-if="list && list.length">
        <div class="item" v-for="(item, index) in list" :key="item.id">
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
      </div>
      <el-empty class="error" description="数据请求失败,请刷新重试" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
import { ref, PropType, toRefs } from "vue";

import { getRankList } from "@/apis/api";

import { formatTime } from "@/utils/format";

import { Picture } from "@element-plus/icons-vue";

import { useHomeStore } from "@/store/home";

const { rankList } = toRefs(useHomeStore());

const props = defineProps({
  list: {
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
  if (props.list.length) {
    props.list.forEach((item) => {
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
@import "@/styles/components/rank.scss";
</style>
