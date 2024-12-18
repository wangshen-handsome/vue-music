<template>
  <el-skeleton :loading="loading" animated :throttle="500">
    <template #template>
      <div class="hot-singer-list">
        <div class="content">
          <div class="item" v-for="item in count" :key="item">
            <el-skeleton-item class="img" variant="image" />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="hot-singer-list" v-if="list && list.length">
        <el-carousel
          class="content"
          indicator-position="outside"
          arrow="never"
          trigger="hover"
          height="390px"
          autoplay
        >
          <el-carousel-item class="item" v-for="item in list" :key="item.id">
            <div class="img" v-for="prop in item">
              <img :src="prop.picUrl" :alt="prop.name" :title="prop.name" />
              <div class="name">{{ prop.name }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-empty class="error" description="数据请求失败,请刷新重试" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
defineProps<{
  count: number;
  loading: boolean;
  list: any[];
}>();
</script>
<style scoped lang="scss">
@import "@/styles/components/hotSingerList.scss";
</style>
