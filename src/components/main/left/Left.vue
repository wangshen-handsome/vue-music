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
.menu {
  width: 90%;
  margin: 30px 0 30px 20px;
  .box {
    width: 90%;
    list-style: none;
    margin: 0;
    padding: 0;
    .item {
      padding: 10px 15px;
      display: flex;
      font-size: 18px;
      color: rgb(176, 222, 241);
      font-family: Tahoma;
      cursor: pointer;
      .icon {
        margin-right: 10px;
      }
    }
    .active {
      background-color: #fff;
      box-shadow: 0 20px 27px rgba(0, 0, 0, 0.2);
      border-radius: 8px 8px 8px 8px;
      color: #409eff;
    }
  }
}
</style>
