<template>
  <div class="menu">
    <ul class="box">
      <li
        :class="[index === activeIndex ? 'active item' : 'item']"
        v-for="(item, index) in menuList"
        :key="item.id"
        @click="menuClick(index, item.name)"
      >
        <span class="icon" v-html="item.icon"></span>
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";

import { useRouter } from "vue-router";

import { menuList } from "./menuList";

const router = useRouter();

//选中的下标
let activeIndex = ref<number | string>(0);

//菜单栏点击事件
const menuClick = (index: number, title: string) => {
  activeIndex.value = index;
  router.push(title);
};
</script>
<style scoped lang="scss">
@import '@/styles/components/Left.scss'
</style>
