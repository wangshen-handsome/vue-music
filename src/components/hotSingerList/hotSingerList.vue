<template>
  <el-skeleton class="hot-singer-list" :count="count" :loading="loading" animated>
    <template #template>
      <div class="item">
        <el-skeleton-item class="img" variant="image" />
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
          :autoplay="false"
        >
          <el-carousel-item class="item" v-for="item in list" :key="item.id">
            <div class="img" v-for="prop in item">
              <img :src="prop.picUrl" :alt="prop.name" :title="prop.name" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-empty class="error" description="数据请求失败,请刷新重试" v-else></el-empty>
    </template>
  </el-skeleton>
</template>
<script setup lang="ts">
import { ref, reactive, PropType } from "vue";

defineProps({
  count: Number,
  loading: Boolean,
  list: {
    type: Array as PropType<any[]>,
  },
});
</script>
<style scoped lang="scss">
@import "@/styles/components/hotSingerList.scss";
</style>
