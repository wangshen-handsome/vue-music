<template>
  <div class="menu">
    <ul class="box">
      <li
        :class="[index === activeIndex ? 'active item' : 'item']"
        v-for="(item, index) in menuList"
        :key="item.id"
        @click="menuClick(item.name)"
      >
        <span class="icon" v-html="item.icon"></span>
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { useRouter, useRoute } from "vue-router";

import { menuList } from "@/assets/data/menuList";

const router = useRouter();

const route = useRoute();

//菜单下标
const activeIndex = computed(() =>
  route.path ? menuList.findIndex((item) => item.name === route.path) : 0
);

//菜单栏点击事件
const menuClick = (title: string) => {
  router.push(title);
};
</script>
<style scoped lang="scss">
@import "@/styles/components/Left.scss";
</style>
