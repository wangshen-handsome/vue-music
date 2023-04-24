<template>
  <div class="hot-singer-list">
    <el-carousel
      class="content"
      indicator-position="outside"
      arrow="never"
      height="390px"
    >
      <el-carousel-item class="item" v-for="item in list" :key="item">
        <!-- <el-image
          class="img"
          v-for="prop in item"
          :scr="prop.picUrl"
          :alt="prop.name"
          :title="prop.name"
        >
        </el-image> -->
        <img
          class="img"
          v-for="prop in item"
          :scr="prop.img1v1Url"
          :alt="prop.name"
          :title="prop.name"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
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
